/**
 * 關於我們頁面
 */

(function() {
    'use strict';

    const Contact = {
        init() {
            // 可在此擴展表單驗證、地圖載入等
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'contact') Contact.init();
    });
})();
