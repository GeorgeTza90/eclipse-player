export async function preloadImages(urls) {
  const promises = urls.map(
    (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      })
  );
  await Promise.all(promises);
}
