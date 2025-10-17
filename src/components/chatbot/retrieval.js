// src/components/chatbot/retrieval.js

// 🔹 Función para normalizar texto (quita acentos, pasa a minúsculas)
function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // elimina tildes
}

// 🔹 Similaridad simple: cantidad de palabras en común
function keywordScore(query, target) {
    const qWords = new Set(normalize(query).split(/\s+/));
    const tWords = new Set(normalize(target).split(/\s+/));

    let overlap = 0;
    qWords.forEach((w) => {
        if (tWords.has(w)) overlap++;
    });

    return overlap / Math.max(1, qWords.size);
}

// 🔹 Similaridad fuzzy (basada en distancia de Levenshtein)
function levenshtein(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[m][n];
}

function fuzzyScore(query, target) {
    const q = normalize(query);
    const t = normalize(target);
    const dist = levenshtein(q, t);
    return 1 - dist / Math.max(q.length, t.length);
}

// 🔹 Obtener los mejores matches
export function getTopMatches(query, faq, topK = 1) {
    if (!query || !faq) return [];

    const results = faq.map((item) => {
        const score1 = keywordScore(query, item.q);
        const score2 = fuzzyScore(query, item.q);
        const score3 = keywordScore(query, item.a) * 0.5; // menos peso en la respuesta
        const score = (score1 + score2 + score3) / 3;

        return { ...item, score };
    });

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .filter((r) => r.score > 0.2); // umbral mínimo
}
