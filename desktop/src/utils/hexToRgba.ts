export default function hexToRgba(hex: string | undefined | null, alpha: number = 1): string {
    if (!hex) return `rgba(0,0,0,${alpha})`;

    hex = hex.replace('#', '');

    if (hex.length === 8) hex = hex.substring(0, 6);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}