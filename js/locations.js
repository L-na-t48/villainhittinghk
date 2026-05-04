/**
 * 推薦地點頁面
 */

(function() {
    'use strict';

    const Locations = {
        init() {
            const page = document.getElementById('page-locations');
            if (page && window.VillainApp) {
                window.VillainApp.initTabs(page);
            }
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'locations') Locations.init();
    });
})();
