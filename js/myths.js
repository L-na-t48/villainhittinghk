/**
 * 打小人迷思頁面
 */

(function() {
    'use strict';

    const Myths = {
        init() {
            // 影片卡片點擊可在此擴展：開啟燈箱播放影片
            document.querySelectorAll('.video-play').forEach(btn => {
                btn.addEventListener('click', () => {
                    // TODO: 開啟影片播放器
                    console.log('影片播放待實作');
                });
            });
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'myths') Myths.init();
    });
})();
