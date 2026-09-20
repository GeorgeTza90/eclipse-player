export function buildShuffleOrder(length: number, keepFirst: number): number[] {
    const indices = Array.from({ length }, (_, i) => i).filter((i) => i !== keepFirst);

    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return [keepFirst, ...indices];
}