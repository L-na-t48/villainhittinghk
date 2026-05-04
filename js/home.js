/**
 * 首頁腳本
 */

(function() {
    'use strict';

    const Home = {
        init() {
            // 可在此加入 Hero 滾動視差、數字動畫等
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'home') Home.init();
    });
})();
