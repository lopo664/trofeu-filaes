const knockoutMatches = [
    { code: "OF1", time: "19:00", detail: "2n millor 3r vs 2n G1" },
    { code: "OF2", time: "19:00", detail: "1r G2 vs 1r millor 3r" },
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
    const firstBestThird = seed.match(/^1r\s+millor\s+3r\s+G([1-7])$/i);
    if (firstBestThird) {
        const group = Number(firstBestThird[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `1r millor 3r (G${group}): ${names.join(" / ")}`
            : `1r millor 3r (G${group})`;
    }

    const secondBestThird = seed.match(/^2n\s+millor\s+3r\s+G([1-7])$/i);
    if (secondBestThird) {
        const group = Number(secondBestThird[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `2n millor 3r (G${group}): ${names.join(" / ")}`
            : `2n millor 3r (G${group})`;
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

    const third = seed.match(/^3r\sG([1-7])$/i);
    if (third) {
        const group = Number(third[1]);
        const names = teamsByGroup[group] || [];
        return names.length
            ? `3r del Grup ${group}: ${names.join(" / ")}`
            : `3r del Grup ${group}`;
    }

    return seed;
}

function sortSeeds(a, b) {
    const parseSeed = (seed) => {
        const first = seed.match(/^1r\sG([1-7])$/i);
        if (first) return { rank: 1, group: Number(first[1]) };

        const second = seed.match(/^2n\sG([1-7])$/i);
        if (second) return { rank: 2, group: Number(second[1]) };

        const third = seed.match(/^3r\sG([1-7])$/i);
        if (third) return { rank: 3, group: Number(third[1]) };

        const firstBestThird = seed.match(/^1r\s+millor\s+3r\s+G([1-7])$/i);
        if (firstBestThird) return { rank: 3, group: Number(firstBestThird[1]) };

        const secondBestThird = seed.match(/^2n\s+millor\s+3r\s+G([1-7])$/i);
        if (secondBestThird) return { rank: 3, group: Number(secondBestThird[1]) };

        return { rank: 9, group: 99 };
    };

    const left = parseSeed(a);
    const right = parseSeed(b);

    if (left.rank !== right.rank) return left.rank - right.rank;
    if (left.group !== right.group) return left.group - right.group;
    return a.localeCompare(b);
}

function expandBestThird(token) {
    const firstBestThird = token.match(/^1r\s+millor\s+3r(?:\s+G([1-7]))?$/i);
    const secondBestThird = token.match(/^2n\s+millor\s+3r(?:\s+G([1-7]))?$/i);
    const genericBestThird = token.match(/^millor\s+3r(?:\s+G([1-7]))?$/i);
    const fallbackBestThird = token.match(/^2n\smillor\s3r(?:\sG([1-7]))?$/i);

    const match = firstBestThird || secondBestThird || genericBestThird || fallbackBestThird;
    if (!match) {
        return null;
    }

    const tier = secondBestThird || fallbackBestThird ? "2n" : "1r";
    const excludedGroup = match[1] ? Number(match[1]) : null;
    const list = [];

    for (let group = 1; group <= 7; group += 1) {
        if (group === excludedGroup) {
            continue;
        }
        list.push(`${tier} millor 3r G${group}`);
    }

    return list;
}

function getBestThirdTokenTier(token) {
    if (/^1r\s+millor\s+3r(?:\s+G[1-7])?$/i.test(token)) {
        return "1r";
    }

    if (/^2n\s+millor\s+3r(?:\s+G[1-7])?$/i.test(token) || /^2n\smillor\s3r(?:\sG[1-7])?$/i.test(token)) {
        return "2n";
    }

    if (/^millor\s+3r(?:\s+G[1-7])?$/i.test(token)) {
        return "1r";
    }

    return null;
}

function possibleWinnersFromToken(token, visited = new Set()) {
    const winnerMatch = token.match(/^Guanyador\s([A-Z0-9]+)$/i);
    if (winnerMatch) {
        return possibleWinnersFromMatch(winnerMatch[1], visited);
    }

    const expandedBestThird = expandBestThird(token);
    if (expandedBestThird) {
        return new Set(expandedBestThird);
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

function seedQualifiesAsBestThird(group, token) {
    const bestThird =
        token.match(/^1r\s+millor\s+3r(?:\s+G([1-7]))?$/i)
        || token.match(/^2n\s+millor\s+3r(?:\s+G([1-7]))?$/i)
        || token.match(/^millor\s+3r(?:\s+G([1-7]))?$/i)
        || token.match(/^2n\smillor\s3r(?:\sG([1-7]))?$/i);
    if (!bestThird) {
        return false;
    }

    const excludedGroup = bestThird[1] ? Number(bestThird[1]) : null;
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

                if (seed.startsWith("3r G") && seedQualifiesAsBestThird(group, token)) {
                    const tier = getBestThirdTokenTier(token);
                    const routeTypeLabel = tier ? `${tier} millor 3r` : "millor tercer";
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
                <p class="empty">Amb ${seedLabelText} no hi ha un camí clar cap al quadre final amb les regles actuals.</p>
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
    const thirdSeed = `3r G${group}`;

    const firstRoutes = findEntryRoutes(firstSeed, group);
    const secondRoutes = findEntryRoutes(secondSeed, group);
    const thirdRoutes = findEntryRoutes(thirdSeed, group);

    comparisonEl.innerHTML = [
        renderPositionCard("Si acabes 1r", "first", firstRoutes, firstSeed),
        renderPositionCard("Si acabes 2n", "second", secondRoutes, secondSeed),
        renderPositionCard("Si acabes 3r", "third", thirdRoutes, thirdSeed)
    ].join("");
}

groupSelectEl.addEventListener("input", renderComparison);
renderComparison();
