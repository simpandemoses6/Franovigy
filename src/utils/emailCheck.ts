const COMMON = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "live.com", "protonmail.com", "yahoo.co.uk"];

function distance(a: string, b: string): number {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => {
        const row = new Array<number>(b.length + 1).fill(0);
        row[0] = i;
        return row;
    });
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
    }
    return dp[a.length][b.length];
}

// If the domain looks like a typo of a popular one (gmial.com, gmail.co ...), return the corrected address.
export function suggestEmail(email: string): string | null {
    const [local, domain] = email.trim().toLowerCase().split("@");
    if (!local || !domain || COMMON.includes(domain)) return null;
    let best: string | null = null;
    let bestDistance = 3;
    for (const d of COMMON) {
        const dist = distance(domain, d);
        if (dist < bestDistance) {
            bestDistance = dist;
            best = d;
        }
    }
    return best && bestDistance <= 2 ? `${local}@${best}` : null;
}