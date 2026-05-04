/**
 * 打小人指南頁面
 */

(function() {
    'use strict';

    const Guide = {
        init() {
            const page = document.getElementById('page-guide');
            if (page && window.VillainApp) {
                window.VillainApp.initTabs(page);
            }
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'guide') Guide.init();
    });
})();
