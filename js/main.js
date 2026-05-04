/**
 * 「正」小人 - 核心路由與導航
 * 負責：頁面切換、導航控制、公共工具
 */

(function() {
    'use strict';

    const App = {
        currentPage: 'home',
        pages: {},

        init() {
            this.initNavigation();
            this.initPageSwitching();
            this.initBackToTop();
            this.initNavScroll();
            this.dispatchPageEvent('home');
        },

        /* ---------- 導航欄 ---------- */
        initNavigation() {
            const toggle = document.getElementById('navToggle');
            const menu = document.getElementById('navMenu');
            const overlay = document.getElementById('navOverlay');
            if (!toggle || !menu) return;

            const open = () => {
                menu.classList.add('open');
                overlay?.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            const close = () => {
                menu.classList.remove('open');
                overlay?.classList.remove('active');
                document.body.style.overflow = '';
            };

            toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
            overlay?.addEventListener('click', close);
            menu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
        },

        /* ---------- 頁面切換 ---------- */
        initPageSwitching() {
            document.querySelectorAll('[data-page]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.dataset.page;
                    if (pageId) this.switchPage(pageId);
                });
            });
        },

        switchPage(pageId) {
            // 切換顯示
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const target = document.getElementById('page-' + pageId);
            if (target) target.classList.add('active');

            // 導航高亮
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.toggle('active', l.dataset.page === pageId);
            });

            // 通知各頁面腳本
            this.dispatchPageEvent(pageId);

            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.currentPage = pageId;
        },

        dispatchPageEvent(pageId) {
            document.dispatchEvent(new CustomEvent('page:switch', {
                detail: { page: pageId, prev: this.currentPage }
            }));
        },

        /* ---------- 回到頂部 ---------- */
        initBackToTop() {
            const btn = document.getElementById('backToTop');
            if (!btn) return;
            window.addEventListener('scroll', () => {
                btn.classList.toggle('visible', window.scrollY > 500);
            });
            btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        },

        /* ---------- 導航滾動效果 ---------- */
        initNavScroll() {
            const nav = document.getElementById('navbar');
            if (!nav) return;
            window.addEventListener('scroll', () => {
                nav.style.boxShadow = window.scrollY > 100
                    ? '0 4px 20px rgba(0,0,0,0.15)'
                    : 'none';
            });
        },

        /* ---------- 內容標籤工具（供各頁面調用） ---------- */
        initTabs(container) {
            const nav = container.querySelector('.content-nav');
            if (!nav) return;

            nav.querySelectorAll('.content-nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.dataset.target;
                    if (!targetId) return;

                    nav.querySelectorAll('.content-nav-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    container.querySelectorAll('.content-panel').forEach(p => {
                        p.classList.toggle('active', p.id === targetId);
                    });
                });
            });
        }
    };

    window.VillainApp = App;
    document.addEventListener('DOMContentLoaded', () => App.init());
})();
