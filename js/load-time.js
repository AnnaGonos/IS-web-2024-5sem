(function() {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        const interactiveTime = window.performance.timing.domInteractive - window.performance.timing.navigationStart;
        const serverResponseTime = window.performance.timing.responseEnd - window.performance.timing.requestStart;

        const statsDiv = document.getElementById('loadStats');
        if (statsDiv) {
            statsDiv.innerHTML = `
                <h4>Статистика загрузки:</h4>
                <p>Время загрузки страницы: ${loadTime} мс</p>
                <p>Время интерактивности: ${interactiveTime} мс</p>
                <p>Время отклика сервера: ${serverResponseTime} мс</p>
            `;
        }
    });
})();