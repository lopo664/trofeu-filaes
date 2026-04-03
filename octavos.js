const groups = [
    { id: 1, name: "Grup 1", teams: ["1A", "1B", "1C"] },
    { id: 2, name: "Grup 2", teams: ["2A", "2B", "2C"] },
    { id: 3, name: "Grup 3", teams: ["3A", "3B", "3C"] },
    { id: 4, name: "Grup 4", teams: ["4A", "4B", "4C"] },
    { id: 5, name: "Grup 5", teams: ["5A", "5B", "5C"] },
    { id: 6, name: "Grup 6", teams: ["6A", "6B", "6C", "6D"] },
    { id: 7, name: "Grup 7", teams: ["7A", "7B", "7C", "7D"] }
];

const teamNames = {
    "1A": "Vascos",
    "1B": "Realistes",
    "1C": "Cruzados",
    "2A": "Tomasines",
    "2B": "Verdes",
    "2C": "Guzmans",
    "3A": "Magenta",
    "3B": "Llana",
    "3C": "Cides",
    "4A": "Almogavares",
    "4B": "Mudejares",
    "4C": "Judios",
    "5A": "Asturianos",
    "5B": "Muntanyesos",
    "5C": "Benimerines",
    "6A": "Aragoneses",
    "6B": "Labradores",
    "6C": "Cordon",
    "6D": "Alcodianos",
    "7A": "Navarros",
    "7B": "Ligeros",
    "7C": "Abencerrajes",
    "7D": "Andaluces"
};

const matches = [
    { venue: "Mutualidad de Levante", time: "14:00", code: "2G5", detail: "5C vs Perdedor 1G5" },
    { venue: "Mutualidad de Levante", time: "15:00", code: "3G3", detail: "Guanyador 1G3 vs 3C" },
    { venue: "Mutualidad de Levante", time: "16:00", code: "3G6", detail: "6B vs 6C" },
    { venue: "Mutualidad de Levante", time: "19:00", code: "OF1", detail: "2n millor 3r vs 2n G1", final: true },
    { venue: "Mutualidad de Levante", time: "20:00", code: "OF3", detail: "1r G1 vs 2n G3", final: true },
    { venue: "Mutualidad de Levante", time: "21:00", code: "OF5", detail: "1r G3 vs 2n G5", final: true },
    { venue: "Mutualidad de Levante", time: "22:00", code: "OF7", detail: "1r G5 vs 2n G7", final: true },
    { venue: "Miguel Sarasa Lores", time: "08:00", code: "1G1", detail: "1A vs 1B" },
    { venue: "Miguel Sarasa Lores", time: "09:00", code: "1G3", detail: "3A vs 3B" },
    { venue: "Miguel Sarasa Lores", time: "10:00", code: "1G5", detail: "5A vs 5B" },
    { venue: "Miguel Sarasa Lores", time: "11:00", code: "1G6", detail: "6A vs 6B" },
    { venue: "Miguel Sarasa Lores", time: "12:00", code: "2G7", detail: "7C vs 7D" },
    { venue: "Miguel Sarasa Lores", time: "13:00", code: "2G2", detail: "2C vs Perdedor 1G2" },
    { venue: "Miguel Sarasa Lores", time: "14:00", code: "2G4", detail: "4C vs Perdedor 1G4" },
    { venue: "Miguel Sarasa Lores", time: "15:00", code: "3G7", detail: "7B vs 7C" },
    { venue: "Miguel Sarasa Lores", time: "16:00", code: "4G6", detail: "6D vs 6A" },
    { venue: "Miguel Sarasa Lores", time: "17:00", code: "3G5", detail: "Guanyador 1G5 vs 5C" },
    { venue: "Miguel Sarasa Lores", time: "19:00", code: "OF2", detail: "1r G2 vs 1r millor 3r", final: true },
    { venue: "Miguel Sarasa Lores", time: "20:00", code: "OF4", detail: "1r G4 vs 2n G2", final: true },
    { venue: "Miguel Sarasa Lores", time: "21:00", code: "OF6", detail: "1r G6 vs 2n G4", final: true },
    { venue: "Miguel Sarasa Lores", time: "22:00", code: "OF8", detail: "1r G7 vs 2n G6", final: true },
    { venue: "Pista exterior gespa", time: "08:00", code: "1G2", detail: "2A vs 2B" },
    { venue: "Pista exterior gespa", time: "09:00", code: "1G4", detail: "4A vs 4B" },
    { venue: "Pista exterior gespa", time: "10:00", code: "2G1", detail: "1C vs Perdedor 1G1" },
    { venue: "Pista exterior gespa", time: "11:00", code: "2G6", detail: "6C vs 6D" },
    { venue: "Pista exterior gespa", time: "12:00", code: "1G7", detail: "7A vs 7B" },
    { venue: "Pista exterior gespa", time: "13:00", code: "2G3", detail: "3C vs Perdedor 1G3" },
    { venue: "Pista exterior gespa", time: "14:00", code: "3G1", detail: "Guanyador 1G1 vs 1C" },
    { venue: "Pista exterior gespa", time: "15:00", code: "4G7", detail: "7D vs 7A" },
    { venue: "Pista exterior gespa", time: "16:00", code: "3G2", detail: "Guanyador 1G2 vs 2C" },
    { venue: "Pista exterior gespa", time: "17:00", code: "3G4", detail: "Guanyador 1G4 vs 4C" }
];

const virtualBracketMatches = [
    { code: "QF1", time: "09:00", detail: "Guanyador OF1 vs Guanyador OF5", final: true, virtual: true, day: "Dissabte 19 d'abril" },
    { code: "QF2", time: "10:00", detail: "Guanyador OF2 vs Guanyador OF6", final: true, virtual: true, day: "Dissabte 19 d'abril" },
    { code: "QF3", time: "11:00", detail: "Guanyador OF3 vs Guanyador OF7", final: true, virtual: true, day: "Dissabte 19 d'abril" },
    { code: "QF4", time: "12:00", detail: "Guanyador OF4 vs Guanyador OF8", final: true, virtual: true, day: "Dissabte 19 d'abril" },
    { code: "SF1", time: "16:00", detail: "Guanyador QF1 vs Guanyador QF4", final: true, virtual: true, day: "Dissabte 19 d'abril" },
    { code: "SF2", time: "17:00", detail: "Guanyador QF2 vs Guanyador QF3", final: true, virtual: true, day: "Dissabte 19 d'abril" },
    { code: "F", time: "19:30", detail: "Guanyador SF1 vs Guanyador SF2", final: true, virtual: true, day: "Dissabte 19 d'abril" }
];

const STORAGE_KEY = "trofeu-filaes-results-v1";
const picks = {};
const scores = {};

const knockoutLayoutEl = document.getElementById("knockoutLayout");
const boardPanelEl = document.querySelector(".board.panel");
const resolvedCountEl = document.getElementById("resolvedCount");
const resolvedNoteEl = document.getElementById("resolvedNote");
const bestThirdFirstEl = document.getElementById("bestThirdFirst");
const bestThirdSecondEl = document.getElementById("bestThirdSecond");
const scheduleToggleBtn = document.getElementById("scheduleToggleBtn");
let showSchedule = true;

function clearObjectEntries(target) {
    Object.keys(target).forEach((key) => {
        delete target[key];
    });
}

function getStorage() {
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

function savePersistedState() {
    const baseState = window.TrofeuStorageBridge?.readState
        ? window.TrofeuStorageBridge.readState()
        : null;
    const payload = {
        ...(baseState && typeof baseState === "object" ? baseState : {}),
        picks: { ...picks },
        scores: { ...scores },
        octavosUi: {
            showSchedule
        }
    };

    if (window.TrofeuStorageBridge?.writeState) {
        window.TrofeuStorageBridge.writeState(payload);
        return;
    }

    const storage = getStorage();
    if (!storage) {
        return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadPersistedState() {
    const sharedState = window.TrofeuStorageBridge?.readState
        ? window.TrofeuStorageBridge.readState()
        : null;
    const storage = getStorage();

    clearObjectEntries(picks);
    clearObjectEntries(scores);

    try {
        const raw = sharedState ? null : storage?.getItem(STORAGE_KEY);
        const data = sharedState || (raw ? JSON.parse(raw) : null);
        if (!data || typeof data !== "object") {
            return;
        }

        if (data.picks && typeof data.picks === "object") {
            Object.entries(data.picks).forEach(([code, side]) => {
                if (side === "left" || side === "right") {
                    picks[code] = side;
                }
            });
        }

        if (data.scores && typeof data.scores === "object") {
            Object.entries(data.scores).forEach(([code, score]) => {
                if (!score || typeof score !== "object") {
                    return;
                }

                const left = Number.isInteger(score.left) && score.left >= 0 ? score.left : null;
                const right = Number.isInteger(score.right) && score.right >= 0 ? score.right : null;

                if (left !== null || right !== null) {
                    scores[code] = { left, right };
                }
            });
        }

        if (data.octavosUi && typeof data.octavosUi === "object" && typeof data.octavosUi.showSchedule === "boolean") {
            showSchedule = data.octavosUi.showSchedule;
        }
    } catch {
        if (window.TrofeuStorageBridge?.clearState) {
            window.TrofeuStorageBridge.clearState();
        } else {
            storage?.removeItem(STORAGE_KEY);
        }
    }
}

function applyScheduleVisibility() {
    if (!knockoutLayoutEl) {
        return;
    }

    knockoutLayoutEl.classList.toggle("times-hidden", !showSchedule);

    if (scheduleToggleBtn) {
        scheduleToggleBtn.textContent = showSchedule
            ? "Ocultar fechas y horas"
            : "Mostrar fechas y horas";
    }
}

function splitSides(detail) {
    if (!detail.includes(" vs ")) {
        return null;
    }

    const parts = detail.split(" vs ");
    return parts.length === 2 ? parts.map((part) => part.trim()) : null;
}

function getMatchByCode(code) {
    return matches.find((match) => match.code === code) || virtualBracketMatches.find((match) => match.code === code);
}

function getMatchScore(code) {
    const score = scores[code];
    if (!score) {
        return null;
    }

    const left = Number.isInteger(score.left) ? score.left : null;
    const right = Number.isInteger(score.right) ? score.right : null;
    return left === null || right === null ? null : { left, right };
}

function getWinnerSideFromScore(score) {
    if (!score) {
        return null;
    }

    if (score.left > score.right) {
        return "left";
    }

    if (score.right > score.left) {
        return "right";
    }

    return null;
}

function getResolvedWinnerSide(code) {
    return getWinnerSideFromScore(getMatchScore(code)) || picks[code] || null;
}

function sameBestThirdRecord(a, b) {
    return Boolean(
        a && b
        && a.points === b.points
        && a.gd === b.gd
        && a.gf === b.gf
        && a.wins === b.wins
        && a.ga === b.ga
    );
}

function getResolvedOutcome(code, stack = new Set()) {
    const match = getMatchByCode(code);
    if (!match || stack.has(code)) {
        return null;
    }

    stack.add(code);
    const sides = splitSides(match.detail);
    if (!sides) {
        stack.delete(code);
        return null;
    }

    const left = resolveSideToken(sides[0], stack);
    const right = resolveSideToken(sides[1], stack);
    const winnerSide = getResolvedWinnerSide(code);
    stack.delete(code);

    if (winnerSide === "left") {
        return { winner: left, loser: right };
    }

    if (winnerSide === "right") {
        return { winner: right, loser: left };
    }

    return null;
}

function computeGroupStandings() {
    const standings = {};
    const groupStats = {};

    groups.forEach((group) => {
        const table = {};
        group.teams.forEach((teamCode) => {
            table[teamCode] = {
                code: teamCode,
                wins: 0,
                draws: 0,
                losses: 0,
                played: 0,
                points: 0,
                gf: 0,
                ga: 0,
                gd: 0
            };
        });

        standings[group.id] = table;
        groupStats[group.id] = { totalMatches: 0, resolvedMatches: 0 };
    });

    matches
        .filter((match) => /^[1-4]G[1-7]$/.test(match.code))
        .forEach((match) => {
            const groupMatch = match.code.match(/G([1-7])$/);
            if (!groupMatch) {
                return;
            }

            const groupId = Number(groupMatch[1]);
            groupStats[groupId].totalMatches += 1;

            const sides = splitSides(match.detail);
            if (!sides) {
                return;
            }

            const leftTeam = resolveSideToken(sides[0]);
            const rightTeam = resolveSideToken(sides[1]);
            if (!leftTeam?.code || !rightTeam?.code) {
                return;
            }

            const leftRow = standings[groupId][leftTeam.code];
            const rightRow = standings[groupId][rightTeam.code];
            if (!leftRow || !rightRow) {
                return;
            }

            const score = getMatchScore(match.code);
            let registeredPlayed = false;
            if (score) {
                leftRow.gf += score.left;
                leftRow.ga += score.right;
                rightRow.gf += score.right;
                rightRow.ga += score.left;
                leftRow.played += 1;
                rightRow.played += 1;
                registeredPlayed = true;
            }

            const outcome = getResolvedOutcome(match.code);
            if (!outcome?.winner?.code || !outcome?.loser?.code) {
                if (score && score.left === score.right) {
                    leftRow.draws += 1;
                    rightRow.draws += 1;
                    leftRow.points += 1;
                    rightRow.points += 1;
                    groupStats[groupId].resolvedMatches += 1;
                }
                return;
            }

            standings[groupId][outcome.winner.code].wins += 1;
            standings[groupId][outcome.loser.code].losses += 1;
            standings[groupId][outcome.winner.code].points += 3;

            if (!registeredPlayed) {
                standings[groupId][outcome.winner.code].played += 1;
                standings[groupId][outcome.loser.code].played += 1;
            }

            groupStats[groupId].resolvedMatches += 1;
        });

    Object.keys(standings).forEach((groupId) => {
        Object.values(standings[groupId]).forEach((row) => {
            row.gd = row.gf - row.ga;
        });
    });

    const ranking = {};
    Object.keys(standings).forEach((groupId) => {
        const rows = Object.values(standings[groupId]).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.gd !== a.gd) return b.gd - a.gd;
            if (b.gf !== a.gf) return b.gf - a.gf;
            if (b.wins !== a.wins) return b.wins - a.wins;
            if (a.ga !== b.ga) return a.ga - b.ga;
            if (b.played !== a.played) return b.played - a.played;
            return a.code.localeCompare(b.code);
        });

        const hasSameRecord = (left, right) => Boolean(
            left && right
            && left.points === right.points
            && left.gd === right.gd
            && left.gf === right.gf
            && left.wins === right.wins
            && left.ga === right.ga
        );

        const stats = groupStats[groupId];
        const complete = stats.totalMatches > 0 && stats.totalMatches === stats.resolvedMatches;
        ranking[groupId] = {
            rows,
            complete,
            firstResolved: complete && !hasSameRecord(rows[0], rows[1]),
            secondResolved: complete && !hasSameRecord(rows[0], rows[1]) && !hasSameRecord(rows[1], rows[2]),
            thirdResolved: complete && !hasSameRecord(rows[1], rows[2]) && !hasSameRecord(rows[2], rows[3])
        };
    });

    return ranking;
}

function getGroupPositionTeam(groupId, positionIndex) {
    const ranking = computeGroupStandings();
    const groupRanking = ranking[groupId];
    if (!groupRanking) {
        return null;
    }

    if (positionIndex === 0 && !groupRanking.firstResolved) {
        return null;
    }

    if (positionIndex === 1 && !groupRanking.secondResolved) {
        return null;
    }

    if (positionIndex === 2 && !groupRanking.thirdResolved) {
        return null;
    }

    const entry = groupRanking.rows[positionIndex];
    if (!entry?.code) {
        return null;
    }

    return { code: entry.code, text: `${teamNames[entry.code]} (${entry.code})` };
}

function getBestThirdRanking(ranking = computeGroupStandings(), excludedGroupId = null) {
    const candidates = [];

    Object.keys(ranking).forEach((groupIdKey) => {
        const groupId = Number(groupIdKey);
        if (excludedGroupId && groupId === excludedGroupId) {
            return;
        }

        const groupData = ranking[groupId];
        if (!groupData?.thirdResolved) {
            return;
        }

        const third = groupData.rows[2];
        if (third?.code) {
            candidates.push({ groupId, ...third });
        }
    });

    candidates.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (a.ga !== b.ga) return a.ga - b.ga;
        if (b.played !== a.played) return b.played - a.played;
        return a.code.localeCompare(b.code);
    });

    const first = candidates[0] || null;
    const second = candidates[1] || null;
    const third = candidates[2] || null;
    const firstResolved = Boolean(first) && !sameBestThirdRecord(first, second);
    const secondResolved = Boolean(second) && firstResolved && !sameBestThirdRecord(second, third);

    return {
        candidates,
        first: firstResolved ? first : null,
        second: secondResolved ? second : null,
        firstResolved,
        secondResolved
    };
}

function getBestThirdTeamByRank(rankNumber, excludedGroupId = null) {
    const ranking = getBestThirdRanking(computeGroupStandings(), excludedGroupId);
    if (rankNumber === 1) {
        return ranking.first ? { code: ranking.first.code, text: `${teamNames[ranking.first.code]} (${ranking.first.code})` } : null;
    }

    if (rankNumber === 2) {
        return ranking.second ? { code: ranking.second.code, text: `${teamNames[ranking.second.code]} (${ranking.second.code})` } : null;
    }

    return null;
}

function resolveSideToken(token, stack = new Set()) {
    const winnerMatch = token.match(/^Guanyador\s+([A-Z0-9-]+)$/i);
    if (winnerMatch) {
        const outcome = getResolvedOutcome(winnerMatch[1], stack);
        return outcome?.winner || { text: `Guanyador ${winnerMatch[1]}` };
    }

    const loserMatch = token.match(/^Perdedor\s+([A-Z0-9-]+)$/i);
    if (loserMatch) {
        const outcome = getResolvedOutcome(loserMatch[1], stack);
        return outcome?.loser || { text: `Perdedor ${loserMatch[1]}` };
    }

    const firstGroupMatch = token.match(/^1r\s+G([1-7])$/i);
    if (firstGroupMatch) {
        return getGroupPositionTeam(Number(firstGroupMatch[1]), 0) || { text: token };
    }

    const secondGroupMatch = token.match(/^2n\s+G([1-7])$/i);
    if (secondGroupMatch) {
        return getGroupPositionTeam(Number(secondGroupMatch[1]), 1) || { text: token };
    }

    const firstBestThirdMatch = token.match(/^1r\s+millor\s+3r(?:\s+G([1-7]))?$/i);
    if (firstBestThirdMatch) {
        const excludedGroupId = firstBestThirdMatch[1] ? Number(firstBestThirdMatch[1]) : null;
        return getBestThirdTeamByRank(1, excludedGroupId) || { text: token };
    }

    const secondBestThirdMatch = token.match(/^2n\s+millor\s+3r(?:\s+G([1-7]))?$/i);
    if (secondBestThirdMatch) {
        const excludedGroupId = secondBestThirdMatch[1] ? Number(secondBestThirdMatch[1]) : null;
        return getBestThirdTeamByRank(2, excludedGroupId) || { text: token };
    }

    if (teamNames[token]) {
        return { code: token, text: `${teamNames[token]} (${token})` };
    }

    return { text: token };
}

function formatStageTime(match) {
    if (!match) {
        return "Pendent";
    }

    if (match.virtual && match.day) {
        return `${match.time} · ${match.day}`;
    }

    return `${match.time} · ${match.venue}`;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderTeamSlot(label, token, sideData, options = {}) {
    const {
        matchCode = "",
        side = "",
        picked = false,
        locked = false
    } = options;

    const resolved = Boolean(sideData?.code);
    const isPickable = Boolean(matchCode && (side === "left" || side === "right"));

    return `
        <div
            class="team-slot ${resolved ? "resolved" : "pending"} ${isPickable ? "pickable" : ""} ${picked ? "picked" : ""} ${locked ? "locked" : ""}"
            ${isPickable ? `data-slot-pick="true" data-match-code="${escapeHtml(matchCode)}" data-side="${escapeHtml(side)}" data-locked="${locked ? "true" : "false"}"` : ""}
        >
            <p class="slot-seed">${escapeHtml(label)}</p>
            <p class="team-name">${escapeHtml(sideData?.text || token)}</p>
        </div>
    `;
}

function getMatchStatusSummary(matchCode, left, right) {
    const winnerSide = getResolvedWinnerSide(matchCode);
    if (!winnerSide) {
        return "";
    }

    const winner = winnerSide === "left" ? left.text : right.text;
    const loser = winnerSide === "left" ? right.text : left.text;
    return `
        <p class="match-status resolved">
            Guanyador: ${escapeHtml(winner)}
            <span class="match-status-separator">·</span>
            Perdedor: ${escapeHtml(loser)}
        </p>
    `;
}

function renderMatchCard(matchCode, label) {
    const match = getMatchByCode(matchCode);
    if (!match) {
        return "";
    }

    const sides = splitSides(match.detail);
    if (!sides) {
        return "";
    }

    const left = resolveSideToken(sides[0]);
    const right = resolveSideToken(sides[1]);
    const resolved = Boolean(left?.code && right?.code);
    const pickedSide = picks[match.code] || "";
    const scoreWinnerSide = getWinnerSideFromScore(getMatchScore(match.code));
    const lockedByScore = Boolean(scoreWinnerSide);
    const activeSide = lockedByScore ? scoreWinnerSide : pickedSide;

    return `
        <article class="stage-card" data-match-code="${escapeHtml(match.code)}">
            <p class="card-time">${escapeHtml(formatStageTime(match))}</p>
            <p class="card-label">${escapeHtml(label)}</p>
            ${renderTeamSlot("Costat A", sides[0], left, { matchCode: match.code, side: "left", picked: activeSide === "left", locked: lockedByScore })}
            ${renderTeamSlot("Costat B", sides[1], right, { matchCode: match.code, side: "right", picked: activeSide === "right", locked: lockedByScore })}
            ${getMatchStatusSummary(match.code, left, right)}
            ${lockedByScore ? '<p class="match-lock-note">El marcador guardat determina este resultat.</p>' : ""}
        </article>
    `;
}

function renderColumn(title, matchCodes, label) {
    const stackClass = label === "Quarts" ? "match-stack quarter-stack" : "match-stack";
    const columnRoleClass = label === "Semifinal"
        ? "is-semifinal"
        : label === "Final"
            ? "is-final"
            : "is-quarts";

    return `
        <section class="column ${columnRoleClass}">
            <p class="column-title">${escapeHtml(title)}</p>
            <div class="${stackClass}">
                ${matchCodes.map((code) => renderMatchCard(code, label)).join("")}
            </div>
        </section>
    `;
}

function renderCenterColumn() {
    const centerCards = [
        { code: "SF1", name: "Semifinal 1" },
        { code: "SF2", name: "Semifinal 2" },
        { code: "F", name: "Final", final: true }
    ];

    return `
        <section class="center-column">
            ${centerCards.map(({ code, name, final }) => {
        const match = getMatchByCode(code);
        const sides = splitSides(match.detail);
        const left = resolveSideToken(sides[0]);
        const right = resolveSideToken(sides[1]);
        const pickedSide = picks[match.code] || "";
        const scoreWinnerSide = getWinnerSideFromScore(getMatchScore(match.code));
        const lockedByScore = Boolean(scoreWinnerSide);
        const activeSide = lockedByScore ? scoreWinnerSide : pickedSide;

        return `
                    <article class="center-card ${final ? "final" : ""}" data-match-code="${escapeHtml(code)}">
                        <p class="board-kicker">${escapeHtml(formatStageTime(match))}</p>
                        <p class="center-stage">${escapeHtml(name)}</p>
                        <p class="center-note">${escapeHtml(match.detail)}</p>
                        ${renderTeamSlot("Costat A", sides[0], left, { matchCode: match.code, side: "left", picked: activeSide === "left", locked: lockedByScore })}
                        ${renderTeamSlot("Costat B", sides[1], right, { matchCode: match.code, side: "right", picked: activeSide === "right", locked: lockedByScore })}
                        ${getMatchStatusSummary(match.code, left, right)}
                        ${lockedByScore ? '<p class="match-lock-note">El marcador guardat determina este resultat.</p>' : ""}
                    </article>
                `;
    }).join("")}
        </section>
    `;
}

function updateSummary() {
    const finalStageCodes = ["QF1", "QF2", "QF3", "QF4", "SF1", "SF2", "F"];
    const resolvedMatches = finalStageCodes.filter((code) => Boolean(getResolvedWinnerSide(code))).length;

    resolvedCountEl.textContent = `${resolvedMatches}/7`;
    resolvedNoteEl.textContent = resolvedMatches === 7
        ? "La fase final està completament definida amb les teues seleccions."
        : "Selecciona guanyadors per completar quarts, semifinals i final.";

    const sf1Sides = splitSides(getMatchByCode("SF1")?.detail || "") || [];
    const sf2Sides = splitSides(getMatchByCode("SF2")?.detail || "") || [];
    const sf1Teams = sf1Sides.map((token) => resolveSideToken(token)?.text || token).filter(Boolean);
    const sf2Teams = sf2Sides.map((token) => resolveSideToken(token)?.text || token).filter(Boolean);

    bestThirdFirstEl.textContent = sf1Teams.length ? sf1Teams.join(" vs ") : "Pendent";
    bestThirdSecondEl.textContent = sf2Teams.length ? sf2Teams.join(" vs ") : "Pendent";
}

function getCardAnchor(matchCode) {
    const card = knockoutLayoutEl.querySelector(`[data-match-code="${matchCode}"]`);
    if (!card) {
        return null;
    }

    const layoutRect = knockoutLayoutEl.getBoundingClientRect();
    const rect = card.getBoundingClientRect();
    const zoom = Number.parseFloat(knockoutLayoutEl.style.zoom || "1");
    const scale = Number.isFinite(zoom) && zoom > 0 ? zoom : 1;

    return {
        left: (rect.left - layoutRect.left) / scale,
        right: (rect.right - layoutRect.left) / scale,
        centerY: ((rect.top - layoutRect.top) + (rect.height / 2)) / scale
    };
}

function getOrCreateLinesLayer() {
    let svg = knockoutLayoutEl.querySelector(".bracket-lines");
    if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("bracket-lines");
        knockoutLayoutEl.prepend(svg);
    }
    return svg;
}

function buildConnectorPath(from, to) {
    if (!from || !to) {
        return "";
    }

    const forward = from.right <= to.left;
    const startX = forward ? from.right : from.left;
    const endX = forward ? to.left : to.right;
    const midX = startX + ((endX - startX) * 0.5);
    return `M ${startX} ${from.centerY} L ${midX} ${from.centerY} L ${midX} ${to.centerY} L ${endX} ${to.centerY}`;
}

function fitBracketToViewport() {
    if (!knockoutLayoutEl || !boardPanelEl) {
        return;
    }

    if (window.matchMedia("(max-width: 1180px)").matches) {
        knockoutLayoutEl.style.zoom = "1";
        return;
    }

    knockoutLayoutEl.style.zoom = "1";

    const boardRect = boardPanelEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const availableHeight = Math.max(viewportHeight - boardRect.top - 12, 280);
    const contentHeight = Math.max(knockoutLayoutEl.scrollHeight, 1);

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    const availableWidth = Math.max(viewportWidth - 24, 520);
    const contentWidth = Math.max(knockoutLayoutEl.scrollWidth, 1);

    const scale = Math.min(1, availableHeight / contentHeight, availableWidth / contentWidth);
    knockoutLayoutEl.style.zoom = String(Math.max(scale, 0.65));
}

function getFeederMatchCodes(matchCode) {
    const match = getMatchByCode(matchCode);
    if (!match) {
        return [];
    }

    const sides = splitSides(match.detail);
    if (!sides) {
        return [];
    }

    return sides
        .map((token) => {
            const winner = token.match(/^Guanyador\s+([A-Z0-9-]+)$/i);
            return winner ? winner[1] : null;
        })
        .filter(Boolean);
}

function drawBracketLines() {
    if (!knockoutLayoutEl) {
        return;
    }

    const svg = getOrCreateLinesLayer();
    const smallLayout = window.matchMedia("(max-width: 1180px)").matches;

    if (smallLayout) {
        svg.innerHTML = "";
        return;
    }

    const width = Math.max(knockoutLayoutEl.scrollWidth, 10);
    const height = Math.max(knockoutLayoutEl.scrollHeight, 10);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));

    const links = [
        ...["SF1", "SF2"].flatMap((target) => getFeederMatchCodes(target).map((from) => [from, target])),
        ...["F"].flatMap((target) => getFeederMatchCodes(target).map((from) => [from, target]))
    ];

    const paths = links
        .map(([fromCode, toCode]) => {
            const from = getCardAnchor(fromCode);
            const to = getCardAnchor(toCode);
            const d = buildConnectorPath(from, to);
            return d ? `<path d="${d}" />` : "";
        })
        .filter(Boolean)
        .join("");

    svg.innerHTML = paths;
}

function renderBoard() {
    knockoutLayoutEl.innerHTML = [
        renderColumn("Cuartos A", ["QF1", "QF4"], "Quarts"),
        renderColumn("Semifinal A", ["SF1"], "Semifinal"),
        renderColumn("Final", ["F"], "Final"),
        renderColumn("Semifinal B", ["SF2"], "Semifinal"),
        renderColumn("Cuartos B", ["QF2", "QF3"], "Quarts")
    ].join("");

    knockoutLayoutEl.querySelectorAll("[data-slot-pick]").forEach((slot) => {
        slot.addEventListener("click", () => {
            if (slot.dataset.locked === "true") {
                return;
            }

            const code = slot.dataset.matchCode;
            const side = slot.dataset.side;
            if (!code || (side !== "left" && side !== "right")) {
                return;
            }

            if (picks[code] === side) {
                delete picks[code];
            } else {
                picks[code] = side;
            }

            savePersistedState();
            updateSummary();
            renderBoard();
        });
    });

    applyScheduleVisibility();
    fitBracketToViewport();
    drawBracketLines();
}

loadPersistedState();
updateSummary();
renderBoard();

if (scheduleToggleBtn) {
    scheduleToggleBtn.addEventListener("click", () => {
        showSchedule = !showSchedule;
        applyScheduleVisibility();
        savePersistedState();
        fitBracketToViewport();
        drawBracketLines();
    });
}

window.addEventListener("trofeu-storage-imported", () => {
    loadPersistedState();
    updateSummary();
    renderBoard();
});

window.addEventListener("resize", () => {
    fitBracketToViewport();
    drawBracketLines();
});