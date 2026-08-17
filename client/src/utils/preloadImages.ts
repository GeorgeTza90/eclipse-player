export async function preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map(
        (url) =>
            new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            })
    );
    await Promise.all(promises);
}