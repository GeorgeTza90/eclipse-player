export async function errorChecker(result, message) {
    if (!result.ok) {
        const error = await result.json().catch(() => ({}));
        throw new Error(error?.error || message);
    }
}