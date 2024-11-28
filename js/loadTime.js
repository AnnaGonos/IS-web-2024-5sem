(() => {
    const startTime = Date.now();
    window.addEventListener("load", () => {
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        document.getElementById("loadTime").innerText = `Страница загружена за ${loadTime} мс.`;
    });
})();