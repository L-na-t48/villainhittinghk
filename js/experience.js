/**
 * 線上體驗 - 打小人遊戲（全新互動版）
 */

(function() {
    'use strict';

    const Experience = {
        eventsBound: false,
        state: {
            master: null,
            villainName: '',
            reason: '',
            hits: 0,
            isAutoHitting: false,
            autoTimer: null,
            dollFlatLevel: 0,
            audioCtx: null
        },

        // 傳統派咒語庫
        chants: [
            '打你個小人頭，等你好運到盡頭！',
            '打你個小人手，等你有錢唔識收！',
            '打你個小人腳，等你有鞋唔識著！',
            '打你個小人口，等你有氣冇定抖！',
            '打你個小人眼，等你睇野矇查查！',
            '打你個小人耳，等你聽野聽唔清！',
            '小人退散，霉運走開！',
            '天靈靈，地靈靈，小人快快離！'
        ],

        // 現代派咒語庫（按原因分類）
        cyberChants: {
            work: [
                '打你個小人頭，OT 到天光都冇補水！',
                '打你個小人手，Send 錯 Email 俾個客！',
                '打你個小人眼，Mon 邊睇到盲都升唔到職！',
                '打你個小人腳，升職加薪永遠輪唔到你！',
                '打你個小人口，成日卸膊，講嘢唔經大腦！'
            ],
            love: [
                '打你個小人頭，思想錯亂，感情騙子快啲走！',
                '打你個小人手，Send 錯 Message 俾現任！',
                '打你個小人眼，盲目沉船，睇錯渣男渣女！',
                '打你個小人腳，行街拍拖永遠落雨又濕腳！',
                '打你個小人口，最叻情勒，甜言蜜語全部呃人！'
            ],
            health: [
                '打你個小人頭，日日想瞓覺，精神好唔到！',
                '打你個小人手，撳手機撳到隻手指發炎！',
                '打你個小人眼，通宵煲劇，對眼又紅又乾！',
                '打你個小人腳，行兩步路就腳軟！',
                '打你個小人口，為食口痕，食完又消化不良！'
            ],
            money: [
                '打你個小人頭，買咩跌咩，成手蟹貨！',
                '打你個小人手，撳錯掣輸晒身家！',
                '打你個小人眼，盲目跟風，睇錯大市！',
                '打你個小人腳，行街 Shopping 永遠睇中貴嘢！',
                '打你個小人口，亂咁大使，成日「手」口不一！'
            ],
            gossip: [
                '打你個小人頭，四圍唱衰你，是非講唔停！',
                '打你個小人手，打字太快，發錯黑材料！',
                '打你個小人眼，眼紅別人，日日 Mon 住你！',
                '打你個小人腳，出門口踩到泥水！',
                '打你個小人口，篤背脊、講大話一秒穿煲！'
            ],
            general: [
                '打你個小人頭，頭頭碰着黑，黑過墨斗！',
                '打你個小人手，執嘢永遠跌落地！',
                '打你個小人眼，黑到睇路都差啲仆親！',
                '打你個小人腳，出門搭車永遠趕唔切！',
                '打你個小人口，開口就撞板，黑氣一掃空！'
            ]
        },

        // 命中文字
        hitWords: ['啪！', '打！', '中！', '散！', '退！', '驅！', '破！', '滅！'],

        // 祝福語庫
        fortunes: {
            work: {
                category: '事業運',
                texts: [
                    '貴人扶持，是非遠離；步步高升，工作順遂。',
                    '上司賞識，同事和睦；大展鴻圖，前途光明。',
                    '才華盡展，機遇不斷；升職加薪，指日可待。'
                ]
            },
            money: {
                category: '財運',
                texts: [
                    '橫財就手，正財入袋；財源廣進，小人退散。',
                    '錢財滾滾來，投資皆有報；八方來財，富貴臨門。',
                    '開源節流，財庫豐盈；金玉滿堂，福祿雙全。'
                ]
            },
            study: {
                category: '學業運',
                texts: [
                    '頭腦清醒，逢考必過；過關斬將，學業進步。',
                    '文昌星照，智慧大開；金榜題名，前程似錦。',
                    '專注力强，事半功倍；學有所成，才華橫溢。'
                ]
            },
            health: {
                category: '平安運',
                texts: [
                    '心想事成，生活美滿；身體健康，笑口常開。',
                    '病魔退散，精神抖擻；百毒不侵，福壽安康。',
                    '心境平和，睡眠香甜；元氣滿滿，活力四射。'
                ]
            },
            love: {
                category: '感情運',
                texts: [
                    '桃花朵朵，良緣將至；情深意長，白頭偕老。',
                    '舊情已去，新歡將來；真心相待，幸福美滿。',
                    '感情順遂，家庭和睦；恩愛甜蜜，天長地久。'
                ]
            },
            gossip: {
                category: '人緣運',
                texts: [
                    '是非遠離，口舌平息；貴人環繞，人緣大旺。',
                    '謠言不攻自破，真相大白於天下；清者自清。',
                    '小人遠離，君子親近；左右逢源，廣結善緣。'
                ]
            },
            general: {
                category: '綜合運',
                texts: [
                    '諸事順遂，萬事亨通；時來運轉，鴻運當頭。',
                    '否極泰來，柳暗花明；困境已過，坦途在前。',
                    '福星高照，吉人天相；心想事成，萬事如意。'
                ]
            }
        },

        // 紙人狀態描述
        dollStatusLabels: ['完好', '微損', '凹陷', '扁塌', '快散', '消滅'],

        init() {
            this.initAudio();
            this.bindEvents();
            this.reset();
        },

        reset() {
            this.state.master = null;
            this.state.villainName = '';
            this.state.reason = '';
            this.state.hits = 0;
            this.state.isAutoHitting = false;
            this.state.dollFlatLevel = 0;
            if (this.state.autoTimer) {
                clearInterval(this.state.autoTimer);
                this.state.autoTimer = null;
            }
            this.showStage('xp-stage-select');
        },

        initAudio() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.state.audioCtx = new AudioContext();
                }
            } catch (e) {
                console.log('Audio not supported');
            }
        },

        playHitSound() {
            if (!this.state.audioCtx) return;
            try {
                const ctx = this.state.audioCtx;
                if (ctx.state === 'suspended') {
                    ctx.resume();
                }
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'square';
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.08);
            } catch (e) {}
        },

        bindEvents() {
            if (this.eventsBound) return;
            this.eventsBound = true;

            // 選擇師傅
            document.querySelectorAll('.master-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const master = card.dataset.master;
                    this.selectMaster(master, card);
                });
            });

            // 快速標籤
            document.querySelectorAll('.quick-tag').forEach(tag => {
                tag.addEventListener('click', () => {
                    const input = document.getElementById('villainInput');
                    if (input) input.value = tag.dataset.val;
                    this.checkInfoReady();
                });
            });

            // 輸入框
            const villainInput = document.getElementById('villainInput');
            if (villainInput) {
                villainInput.addEventListener('input', () => this.checkInfoReady());
            }

            // 原因選擇
            document.querySelectorAll('.reason-card').forEach(card => {
                card.addEventListener('click', () => {
                    document.querySelectorAll('.reason-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this.state.reason = card.dataset.reason;
                    this.checkInfoReady();
                });
            });

            // 前往戰鬥
            const btnToBattle = document.getElementById('btnToBattle');
            if (btnToBattle) {
                btnToBattle.addEventListener('click', () => this.toBattle());
            }

            // 拖鞋點擊
            const slipper = document.getElementById('gameSlipper');
            if (slipper) {
                slipper.addEventListener('click', () => this.hit());
            }

            // 奮力一擊
            const btnHitBig = document.getElementById('btnHitBig');
            if (btnHitBig) {
                btnHitBig.addEventListener('click', () => this.hit());
            }

            // 自動打擊
            const btnAutoHit = document.getElementById('btnAutoHit');
            if (btnAutoHit) {
                btnAutoHit.addEventListener('click', () => this.toggleAutoHit());
            }

            // 領取平安符（結束儀式）
            const btnFinish = document.getElementById('btnFinishBattle');
            if (btnFinish) {
                btnFinish.addEventListener('click', () => this.finishBattle());
            }

            // 再打一個
            const btnFortuneAgain = document.getElementById('btnFortuneAgain');
            if (btnFortuneAgain) {
                btnFortuneAgain.addEventListener('click', () => this.reset());
            }

            // 前往分享
            const btnToShare = document.getElementById('btnToShare');
            if (btnToShare) {
                btnToShare.addEventListener('click', () => this.toShare());
            }

            // 分享按鈕
            const btnShareCopy = document.getElementById('btnShareCopy');
            if (btnShareCopy) {
                btnShareCopy.addEventListener('click', () => this.copyShareText());
            }

            const btnShareDownload = document.getElementById('btnShareDownload');
            if (btnShareDownload) {
                btnShareDownload.addEventListener('click', () => this.downloadPoster());
            }

            const btnRestart = document.getElementById('btnRestart');
            if (btnRestart) {
                btnRestart.addEventListener('click', () => this.reset());
            }
        },

        showStage(stageId) {
            document.querySelectorAll('.xp-stage').forEach(s => s.classList.remove('active'));
            const target = document.getElementById(stageId);
            if (target) target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        selectMaster(master, cardEl) {
            this.state.master = master;
            document.querySelectorAll('.master-card').forEach(c => c.classList.remove('selected'));
            cardEl.classList.add('selected');

            setTimeout(() => {
                this.showStage('xp-stage-info');
            }, 400);
        },

        checkInfoReady() {
            const input = document.getElementById('villainInput');
            const name = input?.value.trim() || '';
            this.state.villainName = name;

            const btn = document.getElementById('btnToBattle');
            if (btn) {
                const ready = name.length > 0 && this.state.reason.length > 0;
                btn.disabled = !ready;
            }
        },

        toBattle() {
            this.showStage('xp-stage-battle');
            this.initBattleScene();
        },

        initBattleScene() {
            const arena = document.getElementById('battleArena');
            const masterFace = document.getElementById('masterFace');
            const dollName = document.getElementById('dollNameDisplay');

            if (this.state.master === 'cyber') {
                arena?.classList.add('cyber-mode');
                if (masterFace) masterFace.textContent = '🧙‍♀️';
            } else {
                arena?.classList.remove('cyber-mode');
                if (masterFace) masterFace.textContent = '👵';
            }

            if (dollName) dollName.textContent = this.state.villainName || '小人';

            this.state.hits = 0;
            this.state.dollFlatLevel = 0;
            this.updateHud();

            const doll = document.getElementById('paperDoll');
            if (doll) {
                doll.className = 'paper-doll';
                doll.style.opacity = '1';
                doll.style.transform = 'translateX(-50%)';
            }
        },

        hit() {
            this.state.hits++;
            this.playHitSound();

            const doll = document.getElementById('paperDoll');
            const slipper = document.getElementById('gameSlipper');

            // 拖鞋動畫
            slipper?.classList.remove('hit-anim');
            void slipper?.offsetWidth;
            slipper?.classList.add('hit-anim');

            // 紙人震動
            doll?.classList.remove('shake');
            void doll?.offsetWidth;
            doll?.classList.add('shake');

            // 更新紙人扁度（最多到 level 5，之後保持最扁）
            if (this.state.hits % 6 === 0 && this.state.dollFlatLevel < 5) {
                this.state.dollFlatLevel++;
                if (doll) {
                    doll.classList.remove('flat-1', 'flat-2', 'flat-3', 'flat-4', 'flat-5');
                    if (this.state.dollFlatLevel > 0) {
                        doll.classList.add('flat-' + this.state.dollFlatLevel);
                    }
                }
            }

            // 粒子效果
            this.spawnParticles();

            // 命中文字
            this.showHitText();

            // 咒語
            if (this.state.hits % 3 === 1) {
                this.showChant();
            }

            this.updateHud();
        },

        toggleAutoHit() {
            if (this.state.isAutoHitting) {
                this.stopAutoHit();
            } else {
                this.startAutoHit();
            }
        },

        startAutoHit() {
            this.state.isAutoHitting = true;
            document.body.classList.add('auto-hitting');
            const btn = document.getElementById('btnAutoHit');
            if (btn) btn.textContent = '停止自動';

            this.state.autoTimer = setInterval(() => {
                this.hit();
            }, 350);
        },

        stopAutoHit() {
            this.state.isAutoHitting = false;
            document.body.classList.remove('auto-hitting');
            if (this.state.autoTimer) {
                clearInterval(this.state.autoTimer);
                this.state.autoTimer = null;
            }
            const btn = document.getElementById('btnAutoHit');
            if (btn) btn.textContent = '打到佢斷氣（自動）';
        },

        spawnParticles() {
            const container = document.getElementById('hitParticles');
            if (!container) return;

            const doll = document.getElementById('paperDoll');
            const rect = doll?.getBoundingClientRect();
            const arenaRect = document.getElementById('battleArena')?.getBoundingClientRect();
            if (!rect || !arenaRect) return;

            const cx = rect.left - arenaRect.left + rect.width / 2;
            const cy = rect.top - arenaRect.top + rect.height / 2;

            const count = 8 + Math.floor(Math.random() * 6);
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                const isSpark = Math.random() > 0.4;
                p.className = 'particle ' + (isSpark ? 'spark' : 'dust');

                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
                const dist = 30 + Math.random() * 70;
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist - 20;
                const size = 3 + Math.random() * 5;

                p.style.left = cx + 'px';
                p.style.top = cy + 'px';
                p.style.width = size + 'px';
                p.style.height = size + 'px';
                p.style.setProperty('--tx', tx + 'px');
                p.style.setProperty('--ty', ty + 'px');

                // 使用 inline animation
                const duration = 400 + Math.random() * 400;
                p.animate([
                    { transform: 'translate(0,0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: duration,
                    easing: 'ease-out',
                    fill: 'forwards'
                });

                container.appendChild(p);
                setTimeout(() => p.remove(), duration);
            }
        },

        showHitText() {
            const container = document.getElementById('battleArena');
            const effect = document.getElementById('hitTextEffect');
            if (!container || !effect) return;

            const word = this.hitWords[Math.floor(Math.random() * this.hitWords.length)];
            effect.textContent = word;

            const rect = container.getBoundingClientRect();
            const ox = (Math.random() - 0.5) * 100;
            const oy = (Math.random() - 0.5) * 60;
            effect.style.left = (rect.width / 2 + ox) + 'px';
            effect.style.top = (rect.height / 2 - 60 + oy) + 'px';

            effect.classList.remove('pop');
            void effect.offsetWidth;
            effect.classList.add('pop');
        },

        showChant() {
            let chant;
            if (this.state.master === 'cyber') {
                const reason = this.state.reason || 'general';
                const list = this.cyberChants[reason] || this.cyberChants.general;
                chant = list[Math.floor(Math.random() * list.length)];
            } else {
                chant = this.chants[Math.floor(Math.random() * this.chants.length)];
            }

            // 頂部咒語
            const masterChant = document.getElementById('masterChant');
            if (masterChant) {
                masterChant.textContent = chant;
                masterChant.classList.remove('show');
                void masterChant.offsetWidth;
                masterChant.classList.add('show');
                setTimeout(() => masterChant.classList.remove('show'), 2000);
            }

            // 歷史咒語
            const history = document.getElementById('chantHistory');
            if (history) {
                const p = document.createElement('p');
                p.textContent = '「' + chant + '」';
                history.innerHTML = '';
                history.appendChild(p);
            }

            // 漂浮咒語氣泡
            const arena = document.getElementById('battleArena');
            const doll = document.getElementById('paperDoll');
            if (arena && doll) {
                const bubble = document.createElement('div');
                bubble.className = 'chant-bubble';
                bubble.textContent = chant;
                const rect = doll.getBoundingClientRect();
                const arenaRect = arena.getBoundingClientRect();
                bubble.style.left = (rect.left - arenaRect.left + rect.width / 2) + 'px';
                bubble.style.top = (rect.top - arenaRect.top - 20) + 'px';
                bubble.style.transform = 'translateX(-50%)';
                arena.appendChild(bubble);
                setTimeout(() => bubble.remove(), 1200);
            }
        },

        updateHud() {
            const countEl = document.getElementById('battleCount');
            const statusEl = document.getElementById('dollStatus');
            if (countEl) countEl.textContent = this.state.hits;
            if (statusEl) statusEl.textContent = this.dollStatusLabels[Math.min(this.state.dollFlatLevel, 5)];
        },

        toBless() {
            this.stopAutoHit();
            this.showStage('xp-stage-bless');

            const master = document.getElementById('blessMaster');
            if (master) master.textContent = this.state.master === 'cyber' ? '🧙‍♀️' : '👵';

            // 生成金色粒子
            this.spawnGoldParticles();

            // 隨機祝福
            const reason = this.state.reason || 'general';
            const fortune = this.fortunes[reason] || this.fortunes.general;
            const text = fortune.texts[Math.floor(Math.random() * fortune.texts.length)];

            const catEl = document.getElementById('fortuneCategory');
            const textEl = document.getElementById('fortuneText');
            const starsEl = document.getElementById('fortuneStars');

            if (catEl) catEl.textContent = fortune.category;
            if (textEl) textEl.textContent = text;
            if (starsEl) {
                const starCount = 4 + Math.floor(Math.random() * 2);
                starsEl.textContent = '⭐'.repeat(starCount) + (starCount === 5 ? '' : '☆');
            }
        },

        spawnGoldParticles() {
            const container = document.getElementById('goldParticles');
            if (!container) return;
            container.innerHTML = '';

            for (let i = 0; i < 40; i++) {
                const p = document.createElement('div');
                p.className = 'gold-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 2 + 's';
                p.style.animationDuration = (2 + Math.random() * 2) + 's';
                const size = 3 + Math.random() * 5;
                p.style.width = size + 'px';
                p.style.height = size + 'px';
                container.appendChild(p);
            }
        },

        toShare() {
            this.showStage('xp-stage-share');
            this.generatePoster();
        },

        generatePoster() {
            const name = this.state.villainName || '小人';
            const hits = this.state.hits;

            document.getElementById('posterTargetName').textContent = name;
            document.getElementById('posterHits').textContent = hits > 99 ? '99+' : hits;

            const fortuneText = document.getElementById('fortuneText')?.textContent || '';
            document.getElementById('posterFortune').textContent = fortuneText;

            const stars = document.getElementById('fortuneStars')?.textContent || '⭐⭐⭐⭐⭐';
            document.getElementById('posterLuck').textContent = stars;

            // 畫 QR 碼
            this.drawQRCode();
        },

        drawQRCode() {
            const canvas = document.getElementById('qrCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const size = 100;
            canvas.width = size;
            canvas.height = size;

            // 白底
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, size, size);

            // 簡單的模擬 QR 碼圖案
            ctx.fillStyle = '#2D0A0C';
            const cell = 5;
            for (let y = 0; y < size; y += cell) {
                for (let x = 0; x < size; x += cell) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(x, y, cell, cell);
                    }
                }
            }

            // 三個定位角
            const corners = [[8, 8], [size - 22, 8], [8, size - 22]];
            ctx.fillStyle = '#fff';
            corners.forEach(([cx, cy]) => {
                ctx.fillRect(cx - 2, cy - 2, 22, 22);
            });
            ctx.fillStyle = '#2D0A0C';
            corners.forEach(([cx, cy]) => {
                ctx.fillRect(cx, cy, 18, 18);
                ctx.fillStyle = '#fff';
                ctx.fillRect(cx + 5, cy + 5, 8, 8);
                ctx.fillStyle = '#2D0A0C';
            });
        },

        copyShareText() {
            const name = this.state.villainName || '小人';
            const hits = this.state.hits;
            const text = `我剛剛在「正」小人網站擊退了「${name}」！擊打次數：${hits}次，轉運指數爆表！你也來試試線上打小人？ #打小人 #轉運 #香港文化`;

            navigator.clipboard?.writeText(text).then(() => {
                const caption = document.getElementById('shareCaption');
                if (caption) {
                    caption.textContent = '✅ 分享文案已複製到剪貼簿！';
                    setTimeout(() => caption.textContent = '', 3000);
                }
            }).catch(() => {
                const caption = document.getElementById('shareCaption');
                if (caption) caption.textContent = '請手動複製分享';
            });
        },

        finishBattle() {
            this.stopAutoHit();
            const doll = document.getElementById('paperDoll');
            if (doll) doll.classList.add('broken');
            setTimeout(() => this.toBless(), 500);
        },

        downloadPoster() {
            const caption = document.getElementById('shareCaption');
            if (caption) caption.textContent = '正在生成海報...';

            // 等待字體載入後再繪製
            document.fonts.ready.then(() => {
                this.drawPosterToCanvas();
                if (caption) {
                    caption.textContent = '✅ 海報已下載！';
                    setTimeout(() => caption.textContent = '', 4000);
                }
            }).catch(() => {
                this.drawPosterToCanvas();
            });
        },

        drawPosterToCanvas() {
            const BASE = 420; // 與 CSS 中 .share-poster max-width 一致
            const S = 2;      // 2x 高清
            const W = BASE * S;

            // 建立臨時 canvas 測量文字
            const tCan = document.createElement('canvas');
            const tCtx = tCan.getContext('2d');

            // 讀取數據
            const name = document.getElementById('posterTargetName')?.textContent || '小人';
            const hitsText = document.getElementById('posterHits')?.textContent || '0';
            const luckText = document.getElementById('posterLuck')?.textContent || '⭐⭐⭐⭐⭐';
            const fortune = document.getElementById('posterFortune')?.textContent || '心想事成，萬事如意。';

            // 計算所需高度（嚴格按 CSS 尺寸累加）
            let H = 0;
            const headerH = 64;       // padding 20*2 + ~24 content
            const footerH = 110;      // padding 20*2 + ~70 content
            const bodyPad = 32;
            const iconArea = 56 + 16; // font 56 + margin-bottom 16
            const titleArea = Math.ceil(22 * 1.6) * 2 + 20; // 2 lines + margin-bottom 20
            const targetArea = 12 * 2 + 12 + 4 + 24 + 20; // padding + span + gap + strong + margin-bottom
            const statsArea = 20 + 4 + 11 + 20; // num + gap + label + margin-bottom
            const fortuneArea = 16 * 2 + this.measureWrapLines(tCtx, fortune, 15, BASE - 56, 1.7);
            H = headerH + bodyPad + iconArea + titleArea + targetArea + statsArea + fortuneArea + bodyPad + footerH;
            H = Math.ceil(H);

            const canvas = document.createElement('canvas');
            canvas.width = W;
            canvas.height = H * S;
            const ctx = canvas.getContext('2d');
            ctx.scale(S, S);

            // 背景 + 圓角裁剪
            ctx.save();
            this.drawRoundRect(ctx, 0, 0, BASE, H, 20);
            ctx.clip();
            ctx.fillStyle = '#2D0A0C';
            ctx.fillRect(0, 0, BASE, H);

            // 外框
            ctx.strokeStyle = 'rgba(212,175,55,0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            let y = 0;

            // ---- Header ----
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(0, y, BASE, headerH);
            // 品牌
            ctx.font = 'bold 18px "Noto Serif TC", serif';
            ctx.fillStyle = '#D4AF37';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText('「正」小人', 24, y + headerH / 2);
            // 徽章
            const badgeText = '轉運成功';
            ctx.font = 'bold 12px "Noto Sans TC", sans-serif';
            const badgeTW = ctx.measureText(badgeText).width + 24; // padding 12*2
            const badgeX = BASE - 24 - badgeTW;
            const badgeY = y + (headerH - 28) / 2;
            this.drawRoundRect(ctx, badgeX, badgeY, badgeTW, 28, 14);
            ctx.fillStyle = '#D4AF37';
            ctx.fill();
            ctx.fillStyle = '#2D0A0C';
            ctx.textAlign = 'center';
            ctx.fillText(badgeText, badgeX + badgeTW / 2, y + headerH / 2);
            y += headerH;

            // ---- Body ----
            const bodyX = 28;
            const bodyW = BASE - 56;
            y += bodyPad;

            // 圖標
            ctx.font = '56px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText('✨', BASE / 2, y + 48);
            y += iconArea;

            // 標題
            ctx.font = 'bold 22px "Noto Serif TC", serif';
            ctx.fillStyle = '#D4AF37';
            ctx.textAlign = 'center';
            const titleLines = ['我剛剛在線上擊退了小人！', '你也來試試？'];
            titleLines.forEach((line, i) => {
                ctx.fillText(line, BASE / 2, y + i * Math.ceil(22 * 1.6) + 18);
            });
            y += titleArea;

            // 擊退對象框
            const targetH = 12 * 2 + 12 + 4 + 24;
            this.drawRoundRect(ctx, bodyX, y, bodyW, targetH, 12);
            ctx.fillStyle = 'rgba(255,255,255,0.06)';
            ctx.fill();
            ctx.font = '12px "Noto Sans TC", sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.fillText('擊退對象', BASE / 2, y + 24);
            ctx.font = 'bold 24px "Noto Serif TC", serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(name, BASE / 2, y + 52);
            y += targetArea;

            // 統計數據
            const stats = [
                { label: '擊打次數', value: hitsText },
                { label: '戰鬥力', value: '爆表' },
                { label: '轉運指數', value: luckText }
            ];
            const colW = (bodyW - 40) / 3;
            const statsStartX = bodyX + 20;
            stats.forEach((s, i) => {
                const cx = statsStartX + i * (colW + 20) + colW / 2;
                // 動態縮放字體，防止星星溢出
                let fontSize = 20;
                ctx.font = 'bold ' + fontSize + 'px "Noto Sans TC", sans-serif';
                let tw = ctx.measureText(s.value).width;
                while (tw > colW - 8 && fontSize > 10) {
                    fontSize -= 1;
                    ctx.font = 'bold ' + fontSize + 'px "Noto Sans TC", sans-serif';
                    tw = ctx.measureText(s.value).width;
                }
                ctx.fillStyle = '#D4AF37';
                ctx.fillText(s.value, cx, y + 18);
                ctx.font = '11px "Noto Sans TC", sans-serif';
                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                ctx.fillText(s.label, cx, y + 34);
            });
            y += statsArea;

            // 祝福語（上下邊框）
            ctx.strokeStyle = 'rgba(255,255,255,0.08)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(bodyX, y);
            ctx.lineTo(bodyX + bodyW, y);
            ctx.stroke();
            y += 16;
            const fLines = this.wrapTextByWidth(ctx, fortune, bodyW - 32, 15);
            ctx.font = '15px "Noto Serif TC", serif';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            fLines.forEach((line, i) => {
                ctx.fillText(line, BASE / 2, y + i * Math.ceil(15 * 1.7) + 12);
            });
            y += fLines.length * Math.ceil(15 * 1.7) + 16;
            ctx.beginPath();
            ctx.moveTo(bodyX, y);
            ctx.lineTo(bodyX + bodyW, y);
            ctx.stroke();
            y += bodyPad;

            // ---- Footer ----
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(0, y, BASE, footerH);
            // QR 碼
            const qrX = 24;
            const qrY = y + 20;
            const qrSize = 70;
            this.drawRoundRect(ctx, qrX, qrY, qrSize, qrSize, 8);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            this.drawPosterQR(ctx, qrX + 5, qrY + 5, qrSize - 10);
            // 文字
            ctx.font = '13px "Noto Sans TC", sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText('掃碼體驗線上打小人', qrX + qrSize + 16, qrY + 26);
            ctx.font = '11px "Noto Sans TC", sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.fillText('香港非物質文化遺產', qrX + qrSize + 16, qrY + 50);

            // 水印
            ctx.font = '10px "Noto Sans TC", sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            ctx.textAlign = 'right';
            ctx.fillText('「正」小人 · 以正制邪', BASE - 12, H - 8);

            // 下載
            const link = document.createElement('a');
            link.download = '正小人-轉運海報.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        },

        measureWrapLines(ctx, text, fontSize, maxW, lineHeight) {
            ctx.font = fontSize + 'px serif';
            const lines = this.wrapTextByWidth(ctx, text, maxW, fontSize);
            return lines.length * Math.ceil(fontSize * lineHeight);
        },

        drawRoundRect(ctx, x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        },

        wrapTextByWidth(ctx, text, maxWidth, fontSize) {
            ctx.font = fontSize + 'px serif';
            const chars = text.split('');
            const lines = [];
            let currentLine = chars[0] || '';
            for (let i = 1; i < chars.length; i++) {
                const testLine = currentLine + chars[i];
                if (ctx.measureText(testLine).width < maxWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = chars[i];
                }
            }
            if (currentLine) lines.push(currentLine);
            return lines;
        },

        drawPosterQR(ctx, x, y, size) {
            const cell = size / 20;
            ctx.fillStyle = '#2D0A0C';
            for (let ry = 0; ry < 20; ry++) {
                for (let cx = 0; cx < 20; cx++) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(x + cx * cell, y + ry * cell, cell + 0.5, cell + 0.5);
                    }
                }
            }
            // 三個定位角
            const drawCorner = (cx, cy) => {
                ctx.fillStyle = '#2D0A0C';
                ctx.fillRect(cx, cy, cell * 5, cell * 5);
                ctx.fillStyle = '#fff';
                ctx.fillRect(cx + cell, cy + cell, cell * 3, cell * 3);
                ctx.fillStyle = '#2D0A0C';
                ctx.fillRect(cx + cell * 2, cy + cell * 2, cell, cell);
            };
            drawCorner(x, y);
            drawCorner(x + size - cell * 5, y);
            drawCorner(x, y + size - cell * 5);
        }
    };

    document.addEventListener('page:switch', (e) => {
        if (e.detail.page === 'experience') Experience.init();
    });
})();
