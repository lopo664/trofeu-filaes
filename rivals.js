const knockoutMatches = [
    { code: "OF1", time: "19:00", detail: "2n millor 2n vs 2n G1" },
    { code: "OF2", time: "19:00", detail: "1r G2 vs 1r millor 2n" },
    { code: "OF3", time: "20:00", detail: "1r G1 vs 2n G3" },
    { code: "OF4", time: "20:00", detail: "1r G4 vs 2n G2" },
    { code: "OF5", time: "21:00", detail: "1r G3 vs 2n G5" },
    { code: "OF6", time: "21:00", detail: "1r G6 vs 2n G4" },
    { code: "OF7", time: "22:00", detail: "1r G5 vs 2n G7" },
    { code: "OF8", time: "22:00", detail: "1r G7 vs 2n G6" },
    { code: "QF1", time: "09:00", day: "Dissabte 19 d'abril", detail: "Guanyador OF1 vs Guanyador OF5" },
    { code: "QF2", time: "10:00", day: "Dissabte 19 d'abril", detail: "Guanyador OF2 vs Guanyador OF6" },
    { code: "QF3", time: "11:00", day: "Dissabte 19 d'abril", detail: "Guanyador OF3 vs Guanyador OF7" },
    { code: "QF4", time: "12:00", day: "Dissabte 19 d'abril", detail: "Guanyador OF4 vs Guanyador OF8" },
    { code: "SF1", time: "16:00", day: "Dissabte 19 d'abril", detail: "Guanyador QF1 vs Guanyador QF4" },
    { code: "SF2", time: "17:00", day: "Dissabte 19 d'abril", detail: "Guanyador QF2 vs Guanyador QF3" },
    { code: "F", time: "19:30", day: "Dissabte 19 d'abril", detail: "Guanyador SF1 vs Guanyador SF2" }
];

const teamsByGroup = {
    1: ["Vascos", "Realistes", "Cruzados"],
    2: ["Tomasines", "Verdes", "Guzmans"],
    3: ["Magenta", "Llana", "Cides"],
    4: ["Almogavares", "Mudejares", "Judios"],
    5: ["Asturianos", "Muntanyesos", "Benimerines"],
    6: ["Aragoneses", "Labradores", "Cordon", "Alcodianos"],
    7: ["Navarros", "Ligeros", "Abencerrajes", "Andaluces"]
};

const matchByCode = Object.fromEntries(knockoutMatches.map((match) => [match.code, match]));
const groupSelectEl = document.getElementById("groupSelect");
const comparisonEl = document.getElementById("comparison");

function splitSides(detail) {
    const parts = detail.split(" vs ");
    return parts.length === 2 ? parts.map((part) => part.trim()) : null;
}

function stageNameFromCode(code) {
    if (code.startsWith("OF")) return "Octaus";
    if (code.startsWith("QF")) return "Quarts";
    if (code.startsWith("SF")) return "Semifinals";
    if (code === "F") return "Final";
    return code;
}

function timeLabel(match) {
    if (!match) return "";
    if (match.time && match.day) return `${match.time} · ${match.day}`;
    return match.time || match.day || "";
}

function seedLabel(seed) {
    const firstBestSecond = seed.match(/^1r\s+millor\s+2n\s+G([1-7])$/i);
    if (firstBestSecond) {
        const group = Number(firstBestSecond[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `1r millor 2n (G${group}): ${names.join(" / ")}`
            : `1r millor 2n (G${group})`;
    }

    const secondBestSecond = seed.match(/^2n\s+millor\s+2n\s+G([1-7])$/i);
    if (secondBestSecond) {
        const group = Number(secondBestSecond[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `2n millor 2n (G${group}): ${names.join(" / ")}`
            : `2n millor 2n (G${group})`;
    }

    const first = seed.match(/^1r\sG([1-7])$/i);
    if (first) {
        const group = Number(first[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `1r del Grup ${group}: ${names.join(" / ")}`
            : `1r del Grup ${group}`;
    }

    const second = seed.match(/^2n\sG([1-7])$/i);
    if (second) {
        const group = Number(second[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `2n del Grup ${group}: ${names.join(" / ")}`
            : `2n del Grup ${group}`;
    }

    return seed;
}

function sortSeeds(a, b) {
    const parseSeed = (seed) => {
        const first = seed.match(/^1r\sG([1-7])$/i);
        if (first) return { rank: 1, group: Number(first[1]) };

        const second = seed.match(/^2n\sG([1-7])$/i);
        if (second) return { rank: 2, group: Number(second[1]) };

        const firstBestSecond = seed.match(/^1r\s+millor\s+2n\s+G([1-7])$/i);
        if (firstBestSecond) return { rank: 2, group: Number(firstBestSecond[1]) };

        const secondBestSecond = seed.match(/^2n\s+millor\s+2n\s+G([1-7])$/i);
        if (secondBestSecond) return { rank: 2, group: Number(secondBestSecond[1]) };

        return { rank: 9, group: 99 };
    };

    const left = parseSeed(a);
    const right = parseSeed(b);

    if (left.rank !== right.rank) return left.rank - right.rank;
    if (left.group !== right.group) return left.group - right.group;
    return a.localeCompare(b);
}

function expandBestSecond(token) {
    const firstBestSecond = token.match(/^1r\s+millor\s+2n(?:\s+G([1-7]))?$/i);
    const secondBestSecond = token.match(/^2n\s+millor\s+2n(?:\s+G([1-7]))?$/i);
    const genericBestSecond = token.match(/^millor\s+2n(?:\s+G([1-7]))?$/i);
    const fallbackBestSecond = token.match(/^2n\smillor\s2n(?:\sG([1-7]))?$/i);

    const match = firstBestSecond || secondBestSecond || genericBestSecond || fallbackBestSecond;
    if (!match) {
        return null;
    }

    const tier = secondBestSecond || fallbackBestSecond ? "2n" : "1r";
    const excludedGroup = match[1] ? Number(match[1]) : null;
    const list = [];

    for (let group = 1; group <= 7; group += 1) {
        if (group === excludedGroup) {
            continue;
        }
        list.push(`${tier} millor 2n G${group}`);
    }

    return list;
}

function getBestSecondTokenTier(token) {
    if (/^1r\s+millor\s+2n(?:\s+G[1-7])?$/i.test(token)) {
        return "1r";
    }

    if (/^2n\s+millor\s+2n(?:\s+G[1-7])?$/i.test(token) || /^2n\smillor\s2n(?:\sG[1-7])?$/i.test(token)) {
        return "2n";
    }

    if (/^millor\s+2n(?:\s+G[1-7])?$/i.test(token)) {
        return "1r";
    }

    return null;
}

function possibleWinnersFromToken(token, visited = new Set()) {
    const winnerMatch = token.match(/^Guanyador\s([A-Z0-9]+)$/i);
    if (winnerMatch) {
        return possibleWinnersFromMatch(winnerMatch[1], visited);
    }

    const expandedBestSecond = expandBestSecond(token);
    if (expandedBestSecond) {
        return new Set(expandedBestSecond);
    }

    return new Set([token]);
}

function possibleWinnersFromMatch(code, visited = new Set()) {
    if (visited.has(code)) {
        return new Set();
    }

    visited.add(code);
    const match = matchByCode[code];
    if (!match) {
        visited.delete(code);
        return new Set([`Guanyador ${code}`]);
    }

    const sides = splitSides(match.detail);
    if (!sides) {
        visited.delete(code);
        return new Set([`Guanyador ${code}`]);
    }

    const left = possibleWinnersFromToken(sides[0], visited);
    const right = possibleWinnersFromToken(sides[1], visited);
    const winners = new Set([...left, ...right]);

    visited.delete(code);
    return winners;
}

function findNextMatch(code) {
    const marker = `Guanyador ${code}`;

    for (const match of knockoutMatches) {
        const sides = splitSides(match.detail);
        if (!sides) {
            continue;
        }

        if (sides[0] === marker) {
            return { match, side: "left" };
        }

        if (sides[1] === marker) {
            return { match, side: "right" };
        }
    }

    return null;
}

function seedQualifiesAsBestSecond(group, token) {
    const bestSecond =
        token.match(/^1r\s+millor\s+2n(?:\s+G([1-7]))?$/i)
        || token.match(/^2n\s+millor\s+2n(?:\s+G([1-7]))?$/i)
        || token.match(/^millor\s+2n(?:\s+G([1-7]))?$/i)
        || token.match(/^2n\smillor\s2n(?:\sG([1-7]))?$/i);
    if (!bestSecond) {
        return false;
    }

    const excludedGroup = bestSecond[1] ? Number(bestSecond[1]) : null;
    return group !== excludedGroup;
}

function findEntryRoutes(seed, group) {
    const routes = [];

    knockoutMatches
        .filter((match) => match.code.startsWith("OF"))
        .forEach((match) => {
            const sides = splitSides(match.detail);
            if (!sides) {
                return;
            }

            ["left", "right"].forEach((side, index) => {
                const token = sides[index];

                if (token === seed) {
                    routes.push({
                        matchCode: match.code,
                        side,
                        label: `Via directa en ${match.code}`
                    });
                    return;
                }

                if (seed.startsWith("2n G") && seedQualifiesAsBestSecond(group, token)) {
                    const tier = getBestSecondTokenTier(token);
                    const routeTypeLabel = tier ? `${tier} millor 2n` : "millor segon";
                    routes.push({
                        matchCode: match.code,
                        side,
                        label: `Via ${routeTypeLabel} en ${match.code}`
                    });
                }
            });
        });

    const unique = new Map();
    routes.forEach((route) => {
        const key = `${route.matchCode}-${route.side}-${route.label}`;
        unique.set(key, route);
    });

    return [...unique.values()];
}

function buildPath(route, ownSeed) {
    const stages = [];
    let currentMatch = matchByCode[route.matchCode];
    let currentSide = route.side;

    while (currentMatch) {
        const sides = splitSides(currentMatch.detail);
        if (!sides) {
            break;
        }

        const rivalToken = currentSide === "left" ? sides[1] : sides[0];
        const rivalSeeds = [...possibleWinnersFromToken(rivalToken)]
            .filter((seed) => seed !== ownSeed)
            .sort(sortSeeds);

        stages.push({
            stageName: stageNameFromCode(currentMatch.code),
            code: currentMatch.code,
            when: timeLabel(currentMatch),
            rivals: rivalSeeds
        });

        const next = findNextMatch(currentMatch.code);
        if (!next) {
            break;
        }

        currentMatch = next.match;
        currentSide = next.side;
    }

    return stages;
}

function renderStage(stage) {
    const chips = stage.rivals.length
        ? `<div class="chips">${stage.rivals.map((seed) => `<span class="chip">${seedLabel(seed)}</span>`).join("")}</div>`
        : '<p class="empty">No hi ha rivals possibles definits per a esta ronda.</p>';

    return `
        <article class="stage">
            <p class="stage-name">${stage.stageName} (${stage.code})</p>
            <p class="stage-meta">${stage.when}</p>
            ${chips}
        </article>
    `;
}

function renderPositionCard(title, titleClass, routes, seedLabelText) {
    if (!routes.length) {
        return `
            <article class="compare-card">
                <h2 class="compare-title ${titleClass}">${title}</h2>
                <p class="empty">Amb ${seedLabelText} no hi ha un cami clar cap al quadre final amb les regles actuals.</p>
            </article>
        `;
    }

    const routesHtml = routes.map((route) => {
        const path = buildPath(route, seedLabelText);
        return `
            <article class="route">
                <p class="route-head">${route.label}</p>
                ${path.map((stage) => renderStage(stage)).join("")}
            </article>
        `;
    }).join("");

    return `
        <article class="compare-card">
            <h2 class="compare-title ${titleClass}">${title}</h2>
            ${routesHtml}
        </article>
    `;
}

function renderComparison() {
    const group = Number(groupSelectEl.value);
    const firstSeed = `1r G${group}`;
    const secondSeed = `2n G${group}`;

    const firstRoutes = findEntryRoutes(firstSeed, group);
    const secondRoutes = findEntryRoutes(secondSeed, group);

    comparisonEl.innerHTML = [
        renderPositionCard("Si acabes 1r", "first", firstRoutes, firstSeed),
        renderPositionCard("Si acabes 2n", "second", secondRoutes, secondSeed)
    ].join("");
}

groupSelectEl.addEventListener("input", renderComparison);
renderComparison();
