(function () {
    const STORAGE_KEY = "trofeu-filaes-results-v1";

    function getStorage() {
        try {
            return window.localStorage;
        } catch {
            return null;
        }
    }

    function readState() {
        const storage = getStorage();
        if (!storage) {
            return null;
        }

        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) {
            return null;
        }

        try {
            const data = JSON.parse(raw);
            return data && typeof data === "object" ? data : null;
        } catch {
            return null;
        }
    }

    function writeState(data) {
        const storage = getStorage();
        if (!storage) {
            return false;
        }

        if (!data || typeof data !== "object") {
            throw new Error("Les dades importades no tenen un format vàlid.");
        }

        storage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    }

    function clearState() {
        const storage = getStorage();
        if (!storage) {
            return false;
        }

        storage.removeItem(STORAGE_KEY);
        return true;
    }

    function normalizeImportedData(input) {
        const parsed = typeof input === "string" ? JSON.parse(input) : input;
        if (!parsed || typeof parsed !== "object") {
            throw new Error("No s'han pogut llegir les dades a importar.");
        }

        if (parsed.data && typeof parsed.data === "object") {
            if (parsed.storageKey && parsed.storageKey !== STORAGE_KEY) {
                throw new Error("L'arxiu no correspon al magatzem de Trofeu Filaes.");
            }
            return parsed.data;
        }

        return parsed;
    }

    function exportState() {
        return JSON.stringify({
            storageKey: STORAGE_KEY,
            exportedAt: new Date().toISOString(),
            data: readState() || {}
        }, null, 2);
    }

    async function copyExportToClipboard() {
        const text = exportState();
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            await navigator.clipboard.writeText(text);
        }
        return text;
    }

    function importState(serialized) {
        const normalized = normalizeImportedData(serialized);
        writeState(normalized);
        return normalized;
    }

    async function handleExportClick() {
        try {
            const exported = await copyExportToClipboard();
            if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                window.alert("Dades exportades i copiades al porta-retalls.");
                return;
            }

            window.prompt("Copia este contingut per importar-lo en una altra pàgina:", exported);
        } catch (error) {
            window.alert(error instanceof Error ? error.message : "No s'han pogut exportar les dades.");
        }
    }

    function handleImportClick(control) {
        const incoming = window.prompt("Pega ací el JSON exportat del localStorage:");
        if (!incoming) {
            return;
        }

        try {
            importState(incoming);
            window.dispatchEvent(new CustomEvent("trofeu-storage-imported"));

            if (control.dataset.storageReload === "true") {
                window.location.reload();
                return;
            }

            window.alert("Dades importades correctament.");
        } catch (error) {
            window.alert(error instanceof Error ? error.message : "No s'han pogut importar les dades.");
        }
    }

    function bindControls(root = document) {
        if (!root || typeof root.querySelectorAll !== "function") {
            return;
        }

        root.querySelectorAll("[data-storage-export]").forEach((control) => {
            if (control.dataset.storageBound === "true") {
                return;
            }

            control.dataset.storageBound = "true";
            control.addEventListener("click", handleExportClick);
        });

        root.querySelectorAll("[data-storage-import]").forEach((control) => {
            if (control.dataset.storageBound === "true") {
                return;
            }

            control.dataset.storageBound = "true";
            control.addEventListener("click", () => handleImportClick(control));
        });
    }

    window.TrofeuStorageBridge = {
        STORAGE_KEY,
        getStorage,
        readState,
        writeState,
        clearState,
        exportState,
        copyExportToClipboard,
        importState,
        bindControls
    };

    bindControls();
}());