export async function errorChecker(result: Response, message: string): Promise<void> {
    if (!result.ok) {
        const error = await result.json().catch(() => ({} as { error?: string }));
        throw new Error(error?.error || message);
    }
}