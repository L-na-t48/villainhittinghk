/**
 * 關於打小人頁面
 */

(function() {
    'use strict';

    const About = {
        init() {
            const page = document.getElementById('page-about');
            if (page && window.VillainApp) {
                window.VillainApp.initTabs(page);
            }
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'about') About.init();
    });
})();
