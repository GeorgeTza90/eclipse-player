export function resolveSinceDate(days: number | null): Date | null {
    if (days === null) return null;
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
}