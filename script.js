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
    { venue: "Mutualidad de Levante", time: "19:00", code: "OF1", detail: "2n millor 2n G1 vs 2n G3", final: true },
    { venue: "Mutualidad de Levante", time: "20:00", code: "OF3", detail: "1r G1 vs 2n G5", final: true },
    { venue: "Mutualidad de Levante", time: "21:00", code: "OF5", detail: "1r G3 vs 1r G7", final: true },
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
    { venue: "Miguel Sarasa Lores", time: "19:00", code: "OF2", detail: "1r G2 vs 2n millor 2n", final: true },
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

const groupGrid = document.getElementById("groupGrid");
const venuesEl = document.getElementById("venues");
const globalCount = document.getElementById("globalCount");
const searchEl = document.getElementById("search");
const venueEl = document.getElementById("venue");
const startTimeEl = document.getElementById("startTime");
const startTimeText = document.getElementById("startTimeText");
const finalsOnlyEl = document.getElementById("finalsOnly");
const finalsBracketEl = document.getElementById("finalsBracket");
const standingsGridEl = document.getElementById("standingsGrid");

let activeGroup = null;
const picks = {};
const scores = {};

const virtualBracketMatches = [
    { code: "QF1", detail: "Guanyador OF1 vs Guanyador OF2", final: true, virtual: true },
    { code: "QF2", detail: "Guanyador OF3 vs Guanyador OF4", final: true, virtual: true },
    { code: "QF3", detail: "Guanyador OF5 vs Guanyador OF6", final: true, virtual: true },
    { code: "QF4", detail: "Guanyador OF7 vs Guanyador OF8", final: true, virtual: true },
    { code: "SF1", detail: "Guanyador QF1 vs Guanyador QF2", final: true, virtual: true },
    { code: "SF2", detail: "Guanyador QF3 vs Guanyador QF4", final: true, virtual: true },
    { code: "F", detail: "Guanyador SF1 vs Guanyador SF2", final: true, virtual: true }
];

function hourNumber(time) {
    return Number(time.split(":")[0]);
}

function teamLabel(code) {
    return teamNames[code] ? `${code} - ${teamNames[code]}` : code;
}

function expandTeamCodes(text) {
    return text.replace(/\b([1-7][A-D])\b/g, (code) => {
        if (!teamNames[code]) {
            return code;
        }
        return `${teamNames[code]} (${code})`;
    });
}

function splitSides(detail) {
    if (!detail.includes(" vs ")) {
        return null;
    }
    const parts = detail.split(" vs ");
    if (parts.length !== 2) {
        return null;
    }
    return parts.map((part) => part.trim());
}

function getMatchByCode(code) {
    return matches.find((m) => m.code === code) || virtualBracketMatches.find((m) => m.code === code);
}

function getMatchScore(code) {
    const score = scores[code];
    if (!score) {
        return null;
    }

    const left = Number.isInteger(score.left) ? score.left : null;
    const right = Number.isInteger(score.right) ? score.right : null;
    if (left === null || right === null) {
        return null;
    }

    return { left, right };
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
    const byScore = getWinnerSideFromScore(getMatchScore(code));
    return byScore || picks[code] || null;
}

function getResolvedOutcome(code, stack = new Set()) {
    const match = getMatchByCode(code);
    if (!match) {
        return null;
    }

    if (stack.has(code)) {
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

    let outcome = null;
    if (winnerSide === "left") {
        outcome = { winner: left, loser: right };
    } else if (winnerSide === "right") {
        outcome = { winner: right, loser: left };
    }

    stack.delete(code);
    return outcome;
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
            if (groupStats[groupId]) {
                groupStats[groupId].totalMatches += 1;
            }

            const sides = splitSides(match.detail);
            if (!sides) {
                return;
            }

            const leftTeam = resolveSideToken(sides[0]);
            const rightTeam = resolveSideToken(sides[1]);
            if (!leftTeam?.code || !rightTeam?.code) {
                return;
            }

            const groupTable = standings[groupId];
            const leftRow = groupTable[leftTeam.code];
            const rightRow = groupTable[rightTeam.code];
            if (!leftRow || !rightRow) {
                return;
            }

            const score = getMatchScore(match.code);
            let playedRegistered = false;
            if (score) {
                leftRow.gf += score.left;
                leftRow.ga += score.right;
                rightRow.gf += score.right;
                rightRow.ga += score.left;
                leftRow.played += 1;
                rightRow.played += 1;
                playedRegistered = true;
            }

            const outcome = getResolvedOutcome(match.code);
            if (!outcome?.winner?.code || !outcome?.loser?.code) {
                if (score && score.left === score.right) {
                    leftRow.draws += 1;
                    rightRow.draws += 1;
                    leftRow.points += 1;
                    rightRow.points += 1;
                    if (groupStats[groupId]) {
                        groupStats[groupId].resolvedMatches += 1;
                    }
                }
                return;
            }

            const winnerRow = groupTable[outcome.winner.code];
            const loserRow = groupTable[outcome.loser.code];
            if (!winnerRow || !loserRow) {
                return;
            }

            winnerRow.wins += 1;
            loserRow.losses += 1;
            winnerRow.points += 3;

            if (!playedRegistered) {
                winnerRow.played += 1;
                loserRow.played += 1;
            }

            if (groupStats[groupId]) {
                groupStats[groupId].resolvedMatches += 1;
            }
        });

    Object.keys(standings).forEach((groupId) => {
        Object.values(standings[groupId]).forEach((row) => {
            row.gd = row.gf - row.ga;
        });
    });

    const hasSameRecord = (a, b) => (
        a.points === b.points &&
        a.gd === b.gd &&
        a.gf === b.gf &&
        a.wins === b.wins &&
        a.ga === b.ga
    );

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

        const stats = groupStats[groupId];
        const complete = Boolean(stats && stats.totalMatches > 0 && stats.resolvedMatches === stats.totalMatches);
        const firstTied = rows.length > 1 && hasSameRecord(rows[0], rows[1]);
        const secondTiedWithThird = rows.length > 2 && hasSameRecord(rows[1], rows[2]);

        ranking[groupId] = {
            rows,
            complete,
            firstResolved: complete && !firstTied,
            secondResolved: complete && !firstTied && !secondTiedWithThird
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

    const entry = groupRanking.rows?.[positionIndex];
    if (!entry || !entry.code) {
        return null;
    }

    return {
        code: entry.code,
        text: `${teamNames[entry.code]} (${entry.code})`
    };
}

function getBestSecondTeam(excludedGroupId = null) {
    const ranking = computeGroupStandings();
    const candidates = [];

    Object.keys(ranking).forEach((groupIdKey) => {
        const groupId = Number(groupIdKey);
        if (excludedGroupId && groupId === excludedGroupId) {
            return;
        }

        if (!ranking[groupId].secondResolved) {
            return;
        }

        const second = ranking[groupId].rows[1];
        if (!second || !second.code) {
            return;
        }

        candidates.push({ groupId, ...second });
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

    if (candidates.length > 1) {
        const first = candidates[0];
        const second = candidates[1];
        const tiedTop =
            first.points === second.points &&
            first.gd === second.gd &&
            first.gf === second.gf &&
            first.wins === second.wins &&
            first.ga === second.ga;
        if (tiedTop) {
            return null;
        }
    }

    const best = candidates[0];
    if (!best) {
        return null;
    }

    return {
        code: best.code,
        text: `${teamNames[best.code]} (${best.code})`
    };
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
        const team = getGroupPositionTeam(Number(firstGroupMatch[1]), 0);
        return team || { text: token };
    }

    const secondGroupMatch = token.match(/^2n\s+G([1-7])$/i);
    if (secondGroupMatch) {
        const team = getGroupPositionTeam(Number(secondGroupMatch[1]), 1);
        return team || { text: token };
    }

    const bestSecondMatch = token.match(/^2n\s+millor\s+2n(?:\s+G([1-7]))?$/i);
    if (bestSecondMatch) {
        const excludedGroupId = bestSecondMatch[1] ? Number(bestSecondMatch[1]) : null;
        const team = getBestSecondTeam(excludedGroupId);
        return team || { text: token };
    }

    if (teamNames[token]) {
        return { text: `${teamNames[token]} (${token})`, code: token };
    }

    return { text: expandTeamCodes(token) };
}

function getRenderedDetail(match) {
    const sides = splitSides(match.detail);
    if (!sides) {
        return expandTeamCodes(match.detail);
    }

    const left = resolveSideToken(sides[0]);
    const right = resolveSideToken(sides[1]);
    return `${left.text} vs ${right.text}`;
}

function extractGroups(match) {
    const text = `${match.code} ${match.detail}`;
    const found = new Set();
    const regex = /\b([1-7])[A-D]?\b|\b[1-4]G([1-7])\b|\bOF[1-8]\b/g;
    let token;

    while ((token = regex.exec(text)) !== null) {
        if (token[1]) found.add(Number(token[1]));
        if (token[2]) found.add(Number(token[2]));
    }

    return [...found];
}

function isLiveSlot(match) {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour === hourNumber(match.time);
}

function renderStandings() {
    const ranking = computeGroupStandings();

    standingsGridEl.innerHTML = groups.map((group) => {
        const groupData = ranking[group.id];
        const rows = groupData?.rows || [];
        const status = groupData?.complete ? "Tancat" : "Pendent";

        const rowHtml = rows.map((entry, index) => {
            const teamCode = entry.code;
            const teamName = teamNames[teamCode] || teamCode;
            const tag = index === 0 && groupData.firstResolved
                ? '<span class="tag first">1r</span>'
                : index === 1 && groupData.secondResolved
                    ? '<span class="tag second">2n</span>'
                    : "";

            return `
                        <div class="standing-row">
                            <span class="standing-pos">${index + 1}</span>
                            <p class="standing-team">${teamName} (${teamCode}) ${tag}</p>
                            <p class="standing-stats">PTS ${entry.points} | DG ${entry.gd} | GF ${entry.gf}</p>
                        </div>
                    `;
        }).join("");

        return `
                    <article class="standing-card">
                        <div class="standing-header">
                            <p class="standing-group">${group.name}</p>
                            <p class="standing-status">${status}</p>
                        </div>
                        ${rowHtml}
                    </article>
                `;
    }).join("");
}

function renderGroups() {
    groupGrid.innerHTML = "";
    groups.forEach((group) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = `group-card ${activeGroup === group.id ? "active" : ""}`;
        card.innerHTML = `
          <p class="group-name">${group.name}</p>
          <div class="team-list">
                        ${group.teams.map((team) => `<span class="pill">${teamLabel(team)}</span>`).join("")}
          </div>
        `;

        card.addEventListener("click", () => {
            activeGroup = activeGroup === group.id ? null : group.id;
            renderGroups();
            renderBoard();
        });

        groupGrid.appendChild(card);
    });
}

function filteredMatches() {
    const q = searchEl.value.trim().toLowerCase();
    const selectedVenue = venueEl.value;
    const minHour = Number(startTimeEl.value);
    const finalsOnly = finalsOnlyEl.checked;

    return matches.filter((match) => {
        const renderedDetail = getRenderedDetail(match);
        const searchableText = `${match.code} ${match.detail} ${renderedDetail}`.toLowerCase();
        const byVenue = selectedVenue === "all" || match.venue === selectedVenue;
        const byHour = hourNumber(match.time) >= minHour;
        const byQuery = q === "" || searchableText.includes(q);
        const byFinal = !finalsOnly || Boolean(match.final);

        const groupsInMatch = extractGroups(match);
        const byGroup = !activeGroup || groupsInMatch.includes(activeGroup);

        return byVenue && byHour && byQuery && byFinal && byGroup;
    });
}

function renderBoard() {
    const currentMatches = filteredMatches();
    globalCount.textContent = `${currentMatches.length} partits visibles`;
    venuesEl.innerHTML = "";

    const orderedVenues = ["Mutualidad de Levante", "Miguel Sarasa Lores", "Pista exterior gespa"];

    orderedVenues.forEach((venueName) => {
        const list = currentMatches
            .filter((m) => m.venue === venueName)
            .sort((a, b) => hourNumber(a.time) - hourNumber(b.time));

        if (venueEl.value !== "all" && venueEl.value !== venueName) {
            return;
        }

        const venue = document.createElement("article");
        venue.className = "venue";

        const header = document.createElement("div");
        header.className = "venue-header";
        header.innerHTML = `
          <h3 class="venue-title">${venueName}</h3>
          <p class="venue-count">${list.length} partits</p>
        `;
        venue.appendChild(header);

        const matchList = document.createElement("div");
        matchList.className = "match-list";

        if (list.length === 0) {
            matchList.innerHTML = '<div class="empty">No hi ha partits amb aquests filtres.</div>';
        } else {
            list.forEach((match) => {
                const card = document.createElement("div");
                const live = isLiveSlot(match);
                const renderedDetail = getRenderedDetail(match);
                const sides = splitSides(match.detail);
                card.className = `match ${match.final ? "final" : ""} ${live ? "live" : ""}`.trim();
                let cardHtml = `
              <span class="time">${match.time}</span>
              <p class="desc">
                                <strong>${match.code}</strong> - ${renderedDetail}
              </p>
                        `;

                if (sides) {
                    const left = resolveSideToken(sides[0]);
                    const right = resolveSideToken(sides[1]);
                    const picked = picks[match.code] || "";
                    const savedScore = scores[match.code] || {};
                    const leftScore = Number.isInteger(savedScore.left) ? savedScore.left : "";
                    const rightScore = Number.isInteger(savedScore.right) ? savedScore.right : "";
                    cardHtml += `
                            <div class="score-editor">
                                <span class="score-label">Goles</span>
                                <div class="score-box">
                                    <input class="score-input" type="number" min="0" step="1" inputmode="numeric" data-score-code="${match.code}" data-score-side="left" value="${leftScore}" aria-label="Goles equipo 1" />
                                    <span class="score-sep">-</span>
                                    <input class="score-input" type="number" min="0" step="1" inputmode="numeric" data-score-code="${match.code}" data-score-side="right" value="${rightScore}" aria-label="Goles equipo 2" />
                                </div>
                            </div>
                            <div class="predictor">
                                <button type="button" class="pick-btn ${picked === "left" ? "active" : ""}" data-code="${match.code}" data-side="left">Gana: ${left.text}</button>
                                <button type="button" class="pick-btn ${picked === "right" ? "active" : ""}" data-code="${match.code}" data-side="right">Gana: ${right.text}</button>
                                ${picked ? `<button type="button" class="clear-pick-btn" data-clear-code="${match.code}">Limpiar</button>` : ""}
                            </div>
                            <p class="predictor-note">El ganador se deduce por goles. Si hay empate, usa los botones.</p>
                            `;
                }

                card.innerHTML = cardHtml;
                matchList.appendChild(card);
            });
        }

        venue.appendChild(matchList);
        venuesEl.appendChild(venue);
    });

    venuesEl.querySelectorAll(".pick-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const { code, side } = btn.dataset;
            picks[code] = side;
            renderBoard();
        });
    });

    venuesEl.querySelectorAll(".clear-pick-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const code = btn.dataset.clearCode;
            delete picks[code];
            renderBoard();
        });
    });

    venuesEl.querySelectorAll(".score-input").forEach((input) => {
        input.addEventListener("input", () => {
            const { scoreCode, scoreSide } = input.dataset;
            const numericValue = Number(input.value);

            if (!scores[scoreCode]) {
                scores[scoreCode] = { left: null, right: null };
            }

            if (input.value === "" || Number.isNaN(numericValue) || numericValue < 0) {
                scores[scoreCode][scoreSide] = null;
            } else {
                scores[scoreCode][scoreSide] = Math.floor(numericValue);
            }

            const winnerSide = getWinnerSideFromScore(getMatchScore(scoreCode));
            if (winnerSide) {
                picks[scoreCode] = winnerSide;
            }

            renderBoard();
        });
    });

    renderStandings();
    renderBracket();
}

function renderBracketMatchCard(match) {
    const sides = splitSides(match.detail);
    if (!sides) {
        return "";
    }

    const left = resolveSideToken(sides[0]);
    const right = resolveSideToken(sides[1]);
    const picked = picks[match.code] || "";

    return `
                <article class="bracket-match ${match.virtual ? "virtual" : ""}">
                    <div class="bracket-head">
                        <span class="bracket-code">${match.code}</span>
                        <span class="bracket-time">${match.time || "Virtual"}</span>
                    </div>
                    <p class="bracket-line">${left.text}</p>
                    <p class="bracket-line">${right.text}</p>
                    <div class="bracket-controls">
                        <button type="button" class="pick-btn ${picked === "left" ? "active" : ""}" data-code="${match.code}" data-side="left">Gana 1</button>
                        <button type="button" class="pick-btn ${picked === "right" ? "active" : ""}" data-code="${match.code}" data-side="right">Gana 2</button>
                        ${picked ? `<button type="button" class="clear-pick-btn" data-clear-code="${match.code}">Limpiar</button>` : ""}
                    </div>
                </article>
            `;
}

function renderBracket() {
    const rounds = [
        {
            name: "OF (Reals)",
            matches: ["OF1", "OF2", "OF3", "OF4", "OF5", "OF6", "OF7", "OF8"].map(getMatchByCode).filter(Boolean)
        },
        {
            name: "Quarts (Virtual)",
            matches: ["QF1", "QF2", "QF3", "QF4"].map(getMatchByCode).filter(Boolean)
        },
        {
            name: "Semifinals (Virtual)",
            matches: ["SF1", "SF2"].map(getMatchByCode).filter(Boolean)
        },
        {
            name: "Final (Virtual)",
            matches: ["F"].map(getMatchByCode).filter(Boolean)
        }
    ];

    finalsBracketEl.innerHTML = rounds.map((round) => `
                <div class="round">
                    <p class="round-name">${round.name}</p>
                    ${round.matches.map((match) => renderBracketMatchCard(match)).join("")}
                </div>
            `).join("");

    finalsBracketEl.querySelectorAll(".pick-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const { code, side } = btn.dataset;
            picks[code] = side;
            renderBoard();
        });
    });

    finalsBracketEl.querySelectorAll(".clear-pick-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const code = btn.dataset.clearCode;
            delete picks[code];
            renderBoard();
        });
    });
}

function refreshStartTimeLabel() {
    const value = Number(startTimeEl.value);
    startTimeText.textContent = `Des de les ${String(value).padStart(2, "0")}:00`;
}

[searchEl, venueEl, finalsOnlyEl].forEach((el) => el.addEventListener("input", renderBoard));
startTimeEl.addEventListener("input", () => {
    refreshStartTimeLabel();
    renderBoard();
});

renderGroups();
refreshStartTimeLabel();
renderBoard();
