/**
 * 打小人迷思頁面
 */

(function() {
    'use strict';

    const Myths = {
        videos: [],

        init() {
            const section = document.getElementById('page-myths');
            if (!section) return;

            this.videos = section.querySelectorAll('video');

            // 點擊影片縮圖：若尚未播放則開始播放
            section.querySelectorAll('.video-thumb').forEach(thumb => {
                const video = thumb.querySelector('video');
                if (!video) return;

                thumb.addEventListener('click', (e) => {
                    // 避免點到 controls 時重複觸發
                    if (e.target === video) return;
                    if (video.paused) {
                        // 先暫停其他影片
                        this.pauseAllExcept(video);
                        video.play();
                    }
                });
            });
        },

        pauseAll() {
            this.videos.forEach(v => {
                if (!v.paused) v.pause();
            });
        },

        pauseAllExcept(video) {
            this.videos.forEach(v => {
                if (v !== video && !v.paused) v.pause();
            });
        }
    };

    // 進入迷思頁面時初始化
    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'myths') {
            Myths.init();
        } else {
            // 離開頁面時暫停所有影片
            Myths.pauseAll();
        }
    });
})();
