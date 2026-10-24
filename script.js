/**
 * 식품 구성 자전거 지렁이 대모험 - 레트로 아케이드 에디션 (script.js)
 * 대형 음식 그래픽(32px 그리드) & 편안한 난이도 & 보글보글 낙하 연출
 * 순수 바닐라 자바스크립트 100% (GitHub Pages 호환)
 */

// ==========================================
// 1. 식품군 및 대표 식품 데이터베이스
// ==========================================
const FOOD_GROUPS = [
  {
    id: 'grain',
    name: '곡류',
    english: 'GRAINS',
    color: '#facc15',
    tagColor: 'bg-yellow-400 text-black',
    accentColor: '#ca8a04',
    description: '주 영양소: 탄수화물 (주식으로 섭취, 활동 에너지 공급)',
    kcalInfo: '1인 1회 300 kcal (하루 3~3.5회 권장)',
    angle: { start: 270, end: 380 },
    wheelColor: '#facc15',
    targetCount: 5,
    items: [
      { name: '쌀밥', emoji: '🍚', serving: '210g' },
      { name: '식빵', emoji: '🍞', serving: '35g' },
      { name: '시리얼', emoji: '🥣', serving: '30g' },
      { name: '감자', emoji: '🥔', serving: '140g' },
      { name: '고구마', emoji: '🍠', serving: '140g' },
      { name: '국수', emoji: '🍜', serving: '90g' },
      { name: '라면사리', emoji: '🍲', serving: '120g' },
      { name: '가래떡', emoji: '🍡', serving: '150g' },
      { name: '옥수수', emoji: '🌽', serving: '100g' }
    ]
  },
  {
    id: 'vegetable',
    name: '채소류',
    english: 'VEGETABLES',
    color: '#4ade80',
    tagColor: 'bg-green-400 text-black',
    accentColor: '#16a34a',
    description: '주 영양소: 비타민, 무기질, 식이섬유 (면역력 & 장 건강)',
    kcalInfo: '1인 1회 15 kcal (하루 7~8회 매끼 풍성하게)',
    angle: { start: 380, end: 460 },
    wheelColor: '#4ade80',
    targetCount: 5,
    items: [
      { name: '콩나물', emoji: '🌱', serving: '70g' },
      { name: '시금치', emoji: '🥬', serving: '70g' },
      { name: '토마토', emoji: '🍅', serving: '70g' },
      { name: '배추김치', emoji: '🥢', serving: '40g' },
      { name: '미역', emoji: '🌿', serving: '10g' },
      { name: '김', emoji: '🍙', serving: '2g' },
      { name: '느타리버섯', emoji: '🍄', serving: '30g' },
      { name: '당근', emoji: '🥕', serving: '50g' },
      { name: '오이', emoji: '🥒', serving: '70g' }
    ]
  },
  {
    id: 'protein',
    name: '고기·생선·달걀·콩류',
    english: 'MEAT & BEANS',
    color: '#c084fc',
    tagColor: 'bg-purple-400 text-black',
    accentColor: '#9333ea',
    description: '주 영양소: 단백질 & 필수아미노산 (근육, 뼈, 피 구성)',
    kcalInfo: '1인 1회 100 kcal (하루 3.5~5.5회)',
    angle: { start: 460, end: 535 },
    wheelColor: '#c084fc',
    targetCount: 5,
    items: [
      { name: '쇠고기', emoji: '🥩', serving: '60g' },
      { name: '닭고기', emoji: '🍗', serving: '60g' },
      { name: '고등어', emoji: '🐟', serving: '70g' },
      { name: '새우', emoji: '🦐', serving: '80g' },
      { name: '달걀', emoji: '🥚', serving: '60g' },
      { name: '두부', emoji: '🧊', serving: '80g' },
      { name: '땅콩', emoji: '🥜', serving: '10g' },
      { name: '돼지고기', emoji: '🥓', serving: '60g' },
      { name: '오징어', emoji: '🦑', serving: '70g' }
    ]
  },
  {
    id: 'fruit',
    name: '과일류',
    english: 'FRUITS',
    color: '#fb7185',
    tagColor: 'bg-rose-400 text-black',
    accentColor: '#e11d48',
    description: '주 영양소: 비타민, 무기질, 당분 (피로 회복과 비타민 C)',
    kcalInfo: '1인 1회 50 kcal (하루 2~4회 간식으로)',
    angle: { start: 535, end: 575 },
    wheelColor: '#fb7185',
    targetCount: 5,
    items: [
      { name: '수박', emoji: '🍉', serving: '150g' },
      { name: '키위', emoji: '🥝', serving: '100g' },
      { name: '사과', emoji: '🍎', serving: '100g' },
      { name: '귤', emoji: '🍊', serving: '100g' },
      { name: '바나나', emoji: '🍌', serving: '100g' },
      { name: '포도', emoji: '🍇', serving: '100g' },
      { name: '블루베리', emoji: '🫐', serving: '100g' },
      { name: '망고', emoji: '🥭', serving: '100g' },
      { name: '딸기', emoji: '🍓', serving: '120g' }
    ]
  },
  {
    id: 'dairy',
    name: '우유·유제품류',
    english: 'DAIRY',
    color: '#38bdf8',
    tagColor: 'bg-sky-400 text-black',
    accentColor: '#0284c7',
    description: '주 영양소: 칼슘 & 단백질 (성장기 뼈와 치아 건강)',
    kcalInfo: '1인 1회 125 kcal (하루 1~2회)',
    angle: { start: 575, end: 605 },
    wheelColor: '#38bdf8',
    targetCount: 5,
    items: [
      { name: '우유', emoji: '🥛', serving: '200mL' },
      { name: '그릭요거트', emoji: '🥣', serving: '100g' },
      { name: '액상 요구르트', emoji: '🍶', serving: '150mL' },
      { name: '아이스크림', emoji: '🍦', serving: '100g' },
      { name: '치즈', emoji: '🧀', serving: '20g' }
    ]
  },
  {
    id: 'oil',
    name: '유지·당류',
    english: 'OILS & SUGAR',
    color: '#94a3b8',
    tagColor: 'bg-slate-400 text-black',
    accentColor: '#475569',
    description: '주 영양소: 지방 & 단순 당 (조리 시 소량만 사용 권장)',
    kcalInfo: '1인 1회 45 kcal (음식 조리 시 소량만 자연스럽게)',
    angle: { start: 605, end: 630 },
    wheelColor: '#94a3b8',
    targetCount: 5,
    items: [
      { name: '콩기름', emoji: '🫒', serving: '5g' },
      { name: '올리브오일', emoji: '🧴', serving: '5g' },
      { name: '깨', emoji: '🌾', serving: '5g' },
      { name: '버터', emoji: '🧈', serving: '5g' },
      { name: '설탕', emoji: '🧂', serving: '10g' },
      { name: '꿀', emoji: '🍯', serving: '10g' },
      { name: '시럽', emoji: '🥞', serving: '10g' }
    ]
  }
];

// ==========================================
// 2. 8-Bit 레트로 사운드 엔진
// ==========================================
class RetroAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.bgmPlaying) this.stopBgm();
    return this.muted;
  }

  playCoin() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playEat() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  playHit() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playDropFall() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(784, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.55);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  }

  playLand() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.setValueAtTime(240, now + 0.06);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playHurryUpAlert() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.12, 0.24].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now + offset);
      osc.frequency.setValueAtTime(1200, now + offset + 0.05);

      gain.gain.setValueAtTime(0.18, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
    });
  }

  playFoodHop() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.setValueAtTime(650, now + 0.04);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playTick() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, now);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playStart() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1760, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playClear() {
    if (this.muted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((f, i) => {
      const now = this.ctx.currentTime + i * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    });
  }

  playGameOver() {
    if (this.muted || !this.ctx) return;
    const notes = [440, 415, 392, 349];
    notes.forEach((f, i) => {
      const now = this.ctx.currentTime + i * 0.14;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    });
  }

  toggleBgm() {
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    if (this.muted || !this.ctx) return;
    this.bgmPlaying = true;
    const melody = [
      261.63, 0, 329.63, 392.00, 523.25, 392.00, 329.63, 0,
      293.66, 0, 349.23, 440.00, 587.33, 440.00, 349.23, 0
    ];
    const tempo = 150;

    const step = () => {
      if (!this.bgmPlaying || this.muted) return;
      const freq = melody[this.bgmStep % melody.length];
      if (freq > 0) {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (tempo / 1000) * 0.85);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + (tempo / 1000) * 0.85);
      }
      this.bgmStep++;
      this.bgmTimer = setTimeout(step, tempo);
    };

    step();
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

const audio = new RetroAudio();

// ==========================================
// 3. 지렁이 게임 엔진 (난이도 완화 & 음식 크기 32px 대형화)
// ==========================================
class NutritionSnakeArcade {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // ★ 음식과 지렁이 크기를 큼직하게 32px로 확대!
    this.gridSize = 32;
    this.cols = 20; // 20 * 32 = 640px
    this.rows = 16; // 16 * 32 = 512px

    this.currentGroupIndex = 0;
    this.collectedInGroup = 0;
    this.filledFoods = {};

    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };

    this.foodsOnField = [];

    // 도망치는 음식 시스템 (난이도 완화: 1.35초 간격으로 여유 있게 도망)
    this.isPanicMode = false;
    this.foodMoveTimer = null;
    this.foodMoveInterval = 1350; // 1.35초로 여유 조율

    this.score = 0;
    // ★ 체력 5개로 여유있게 상향!
    this.lives = 5;
    this.maxLives = 5;

    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerInterval = null;

    this.isRunning = false;
    this.isPaused = false;
    this.isCountingDown = false;
    this.gameLoopTimer = null;

    this.difficulty = 'normal';

    this.initCanvasSize();
    this.bindEvents();
    this.renderBicycle();
    this.updateHUD();
  }

  initCanvasSize() {
    this.canvas.width = this.cols * this.gridSize;
    this.canvas.height = this.rows * this.gridSize;
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      audio.init();

      const startOverlay = document.getElementById('startOverlay');
      if ((e.code === 'Space' || e.key === ' ' || e.key === 'Enter') && startOverlay && !startOverlay.classList.contains('hidden')) {
        e.preventDefault();
        this.startNewGame();
        return;
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (this.isCountingDown || !this.isRunning || this.isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
          break;
        case 'Escape':
        case 'p':
        case 'P':
          this.togglePause();
          break;
      }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      audio.init();
    }, { passive: true });

    this.canvas.addEventListener('touchend', (e) => {
      if (this.isCountingDown || !this.isRunning || this.isPaused) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 20 && this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
        else if (dx < -20 && this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
      } else {
        if (dy > 20 && this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
        else if (dy < -20 && this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
      }
    }, { passive: true });

    document.querySelectorAll('.retro-dpad-btn').forEach(btn => {
      const handlePress = (e) => {
        e.preventDefault();
        audio.init();
        if (this.isCountingDown || !this.isRunning || this.isPaused) return;
        const dir = btn.dataset.dir;
        if (dir === 'up' && this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
        if (dir === 'down' && this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
        if (dir === 'left' && this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
        if (dir === 'right' && this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
      };
      btn.addEventListener('click', handlePress);
      btn.addEventListener('touchstart', handlePress, { passive: false });
    });

    const muteBtn = document.getElementById('soundToggleBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        audio.init();
        const muted = audio.toggleMute();
        muteBtn.textContent = muted ? '🔇 소리 끔' : '🔊 소리 켬';
      });
    }

    const bgmBtn = document.getElementById('bgmToggleBtn');
    if (bgmBtn) {
      bgmBtn.addEventListener('click', () => {
        audio.init();
        const playing = audio.toggleBgm();
        bgmBtn.textContent = playing ? '🎵 BGM ON' : '🎵 BGM OFF';
      });
    }

    const diffSelect = document.getElementById('difficultySelect');
    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        this.difficulty = e.target.value;
      });
    }
  }

  startNewGame() {
    audio.init();
    audio.playCoin();

    const startOverlay = document.getElementById('startOverlay');
    if (startOverlay) startOverlay.classList.add('hidden');
    this.hideAllModals();

    this.currentGroupIndex = 0;
    this.collectedInGroup = 0;
    this.isPanicMode = false;
    this.filledFoods = {};
    FOOD_GROUPS.forEach(g => {
      this.filledFoods[g.id] = [];
    });

    this.score = 0;
    this.lives = this.maxLives;
    this.elapsedTime = 0;
    clearInterval(this.timerInterval);
    clearInterval(this.foodMoveTimer);

    this.resetSnakePosition();
    this.renderBicycle();
    this.updateHUD();

    this.startCountdown(this.currentGroupIndex);
  }

  resetSnakePosition() {
    const sx = Math.floor(this.cols / 2);
    const sy = Math.floor(this.rows / 2);
    this.snake = [
      { x: sx, y: sy },
      { x: sx - 1, y: sy },
      { x: sx - 2, y: sy },
      { x: sx - 3, y: sy }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  startCountdown(groupIndex) {
    this.isCountingDown = true;
    this.isRunning = false;
    this.isPanicMode = false;
    clearTimeout(this.gameLoopTimer);
    clearInterval(this.foodMoveTimer);

    const group = FOOD_GROUPS[groupIndex];
    const overlay = document.getElementById('countdownOverlay');
    const title = document.getElementById('countdownTitle');
    const num = document.getElementById('countdownNumber');
    const desc = document.getElementById('countdownDesc');

    overlay.classList.remove('hidden');
    title.textContent = `ROUND ${groupIndex + 1}: ${group.name} 채우기!`;
    title.style.color = group.color;
    desc.textContent = `[${group.items.slice(0, 4).map(i => i.name).join(', ')}] 등 골라먹기`;

    let count = 3;
    num.textContent = count;
    num.className = 'text-7xl md:text-8xl font-black text-yellow-400 countdown-scale font-pixel';
    audio.playTick();

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        num.textContent = count;
        num.classList.remove('countdown-scale');
        void num.offsetWidth;
        num.classList.add('countdown-scale');
        audio.playTick();
      } else if (count === 0) {
        num.textContent = 'START!';
        num.className = 'text-6xl md:text-7xl font-black text-green-400 countdown-scale font-pixel';
        audio.playStart();
      } else {
        clearInterval(interval);
        overlay.classList.add('hidden');
        this.isCountingDown = false;
        this.isRunning = true;
        this.spawnFoodBatch();
        this.startTimer();
        this.tick();
      }
    }, 750);
  }

  startTimer() {
    this.startTime = Date.now() - this.elapsedTime;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.isRunning && !this.isPaused && !this.isCountingDown) {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateTimerDisplay();
      }
    }, 100);
  }

  updateTimerDisplay() {
    const totalSec = Math.floor(this.elapsedTime / 1000);
    const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    const timerElem = document.getElementById('timerText');
    if (timerElem) timerElem.textContent = `${m}:${s}`;
  }

  // ★ 음식 스폰 (정답 음식 4개로 넉넉하게, 오답 음식은 2개로 줄여 난이도 완화!)
  spawnFoodBatch() {
    this.foodsOnField = [];
    const targetGroup = FOOD_GROUPS[this.currentGroupIndex];

    // 정답 음식 4개 스폰 (더 찾기 쉬움!)
    const targets = [...targetGroup.items].sort(() => 0.5 - Math.random()).slice(0, 4);
    targets.forEach(item => {
      const pos = this.getFreePos();
      this.foodsOnField.push({
        x: pos.x,
        y: pos.y,
        groupId: targetGroup.id,
        groupName: targetGroup.name,
        isTarget: true,
        item: item,
        hopAnim: 0
      });
    });

    // 오답 음식은 2개만 스폰 (스트레스 감소)
    const others = FOOD_GROUPS.filter(g => g.id !== targetGroup.id);
    for (let i = 0; i < 2; i++) {
      const randG = others[Math.floor(Math.random() * others.length)];
      const randItem = randG.items[Math.floor(Math.random() * randG.items.length)];
      const pos = this.getFreePos();
      this.foodsOnField.push({
        x: pos.x,
        y: pos.y,
        groupId: randG.id,
        groupName: randG.name,
        isTarget: false,
        item: randItem,
        hopAnim: 0
      });
    }
  }

  spawnSingleFood(isTargetPreference = null) {
    const targetGroup = FOOD_GROUPS[this.currentGroupIndex];
    // 정답 음식이 나올 확률을 70%로 상향
    const isTarget = isTargetPreference !== null ? isTargetPreference : Math.random() < 0.7;

    let foodObj;
    if (isTarget) {
      const item = targetGroup.items[Math.floor(Math.random() * targetGroup.items.length)];
      const pos = this.getFreePos();
      foodObj = {
        x: pos.x,
        y: pos.y,
        groupId: targetGroup.id,
        groupName: targetGroup.name,
        isTarget: true,
        item: item,
        hopAnim: 0
      };
    } else {
      const others = FOOD_GROUPS.filter(g => g.id !== targetGroup.id);
      const randG = others[Math.floor(Math.random() * others.length)];
      const item = randG.items[Math.floor(Math.random() * randG.items.length)];
      const pos = this.getFreePos();
      foodObj = {
        x: pos.x,
        y: pos.y,
        groupId: randG.id,
        groupName: randG.name,
        isTarget: false,
        item: item,
        hopAnim: 0
      };
    }
    this.foodsOnField.push(foodObj);
  }

  getFreePos() {
    let x, y, collides;
    let tries = 0;
    do {
      x = Math.floor(Math.random() * this.cols);
      y = Math.floor(Math.random() * this.rows);
      collides = this.snake.some(s => s.x === x && s.y === y) ||
                 this.foodsOnField.some(f => f.x === x && f.y === y);
      tries++;
      if (tries > 100) break;
    } while (collides);
    return { x, y };
  }

  // ★ 3개 이상 먹었을 때 도망치기 모드 (난이도 완화: 1.35초마다 귀엽게 1칸 이동)
  triggerPanicMode() {
    if (this.isPanicMode) return;
    this.isPanicMode = true;

    audio.playHurryUpAlert();
    this.showToast(`🚨 HURRY UP! 음식이 놀라서 깡총 도망쳐요! 🏃💨`, 'error');

    const banner = document.getElementById('missionBanner');
    if (banner) banner.classList.add('hurry-up-pulse');

    clearInterval(this.foodMoveTimer);
    this.foodMoveTimer = setInterval(() => {
      if (this.isRunning && !this.isPaused && !this.isCountingDown) {
        this.moveFoodsAround();
      }
    }, this.foodMoveInterval);
  }

  moveFoodsAround() {
    if (!this.foodsOnField.length) return;
    const head = this.snake[0];

    let hopped = false;
    this.foodsOnField.forEach(food => {
      // 50% 확률로만 이동 (너무 날쌔지 않도록 완화)
      if (Math.random() < 0.5) {
        const moves = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 }
        ];

        if (food.isTarget && head) {
          const distX = food.x - head.x;
          const distY = food.y - head.y;
          if (Math.abs(distX) < 3 && Math.abs(distY) < 3) {
            moves.sort((a, b) => {
              const scoreA = (food.x + a.dx - head.x) ** 2 + (food.y + a.dy - head.y) ** 2;
              const scoreB = (food.x + b.dx - head.x) ** 2 + (food.y + b.dy - head.y) ** 2;
              return scoreB - scoreA;
            });
          } else {
            moves.sort(() => 0.5 - Math.random());
          }
        } else {
          moves.sort(() => 0.5 - Math.random());
        }

        for (let m of moves) {
          let nx = food.x + m.dx;
          let ny = food.y + m.dy;

          if (nx < 0) nx = this.cols - 1;
          if (nx >= this.cols) nx = 0;
          if (ny < 0) ny = this.rows - 1;
          if (ny >= this.rows) ny = 0;

          const collidesSnake = this.snake.some(s => s.x === nx && s.y === ny);
          const collidesFood = this.foodsOnField.some(f => f !== food && f.x === nx && f.y === ny);

          if (!collidesSnake && !collidesFood) {
            food.x = nx;
            food.y = ny;
            food.hopAnim = Date.now();
            hopped = true;
            break;
          }
        }
      }
    });

    if (hopped) {
      audio.playFoodHop();
    }
  }

  // ★ 지렁이 이동 속도 여유 있게 조율 (180ms로 편안하게 조작 가능)
  tick() {
    if (!this.isRunning || this.isPaused || this.isCountingDown) return;

    this.update();
    this.draw();

    const baseSpeed = this.difficulty === 'hard' ? 140 : (this.difficulty === 'easy' ? 220 : 180);
    const speed = Math.max(120, baseSpeed - Math.floor(this.snake.length * 0.8));

    this.gameLoopTimer = setTimeout(() => {
      requestAnimationFrame(() => this.tick());
    }, speed);
  }

  update() {
    this.direction = this.nextDirection;

    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // ★ 벽 처리: 기본 모드(NORMAL) 및 EASY에서는 반대편으로 자연스럽게 워프 통과!
    // HARD 모드에서만 벽 충돌 적용
    if (this.difficulty !== 'hard') {
      if (head.x < 0) head.x = this.cols - 1;
      if (head.x >= this.cols) head.x = 0;
      if (head.y < 0) head.y = this.rows - 1;
      if (head.y >= this.rows) head.y = 0;
    } else {
      if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
        this.onHitHazard('벽에 부딪혔어요!');
        return;
      }
    }

    // 자기 몸통 충돌
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
        this.onHitHazard('자기 꼬리에 부딪혔어요!');
        return;
      }
    }

    this.snake.unshift(head);

    // 음식 충돌 검사
    const foodIdx = this.foodsOnField.findIndex(f => f.x === head.x && f.y === head.y);
    if (foodIdx !== -1) {
      const food = this.foodsOnField[foodIdx];
      this.foodsOnField.splice(foodIdx, 1);

      if (food.isTarget) {
        this.onEatTarget(food);
      } else {
        this.onEatWrong(food);
        this.snake.pop();
      }
    } else {
      this.snake.pop();
    }
  }

  onEatTarget(food) {
    audio.playEat();
    this.score += 100;
    this.collectedInGroup++;

    if (!this.filledFoods[food.groupId]) {
      this.filledFoods[food.groupId] = [];
    }
    this.filledFoods[food.groupId].push(food.item);

    this.showToast(`[${food.item.name}] 획득! +100`, 'success');
    this.updateHUD();
    this.renderBicycle();

    const targetGroup = FOOD_GROUPS[this.currentGroupIndex];

    // 3개 이상 먹으면 도망치기 모드 발동
    if (this.collectedInGroup >= 3 && this.collectedInGroup < targetGroup.targetCount) {
      this.triggerPanicMode();
    }

    if (this.collectedInGroup >= targetGroup.targetCount) {
      this.onGroupClear();
    } else {
      this.spawnSingleFood(true);
    }
  }

  onEatWrong(food) {
    audio.playHit();
    this.lives--;
    this.score = Math.max(0, this.score - 20); // 오답 감점도 -20점으로 완화

    this.canvas.classList.remove('shake');
    void this.canvas.offsetWidth;
    this.canvas.classList.add('shake');

    this.showToast(`오답! [${food.item.name}]은(는) [${food.groupName}]! -1♥`, 'error');
    this.updateHUD();

    if (this.lives <= 0) {
      this.onGameOver();
    } else {
      this.spawnSingleFood(false);
    }
  }

  onHitHazard(msg) {
    audio.playHit();
    this.lives--;
    this.canvas.classList.remove('shake');
    void this.canvas.offsetWidth;
    this.canvas.classList.add('shake');

    this.showToast(`${msg} -1♥`, 'error');
    this.updateHUD();

    if (this.lives <= 0) {
      this.onGameOver();
    } else {
      this.resetSnakePosition();
    }
  }

  // 보글보글 스타일 레벨 전환
  onGroupClear() {
    this.isRunning = false;
    clearInterval(this.foodMoveTimer);
    clearTimeout(this.gameLoopTimer);

    const banner = document.getElementById('missionBanner');
    if (banner) banner.classList.remove('hurry-up-pulse');

    audio.playClear();

    if (window.confetti) {
      window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }

    const currentG = FOOD_GROUPS[this.currentGroupIndex];
    this.showToast(`★ ${currentG.name} 완성! 다음 층으로 다이빙! ★`, 'success');

    setTimeout(() => {
      audio.playDropFall();
      this.canvas.classList.add('stage-fall-down');
    }, 400);

    setTimeout(() => {
      this.canvas.classList.remove('stage-fall-down');
      this.canvas.classList.add('stage-drop-enter');
      audio.playLand();

      this.currentGroupIndex++;
      this.collectedInGroup = 0;
      this.isPanicMode = false;

      if (this.currentGroupIndex >= FOOD_GROUPS.length) {
        setTimeout(() => this.onVictory(), 600);
      } else {
        setTimeout(() => {
          this.canvas.classList.remove('stage-drop-enter');
          this.resetSnakePosition();
          this.updateHUD();
          this.startCountdown(this.currentGroupIndex);
        }, 600);
      }
    }, 1200);
  }

  onVictory() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    clearInterval(this.foodMoveTimer);
    audio.playClear();

    if (window.confetti) {
      window.confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }

    const totalSec = Math.floor(this.elapsedTime / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const timeStr = `${m}분 ${s}초`;

    document.getElementById('victoryTime').textContent = timeStr;
    document.getElementById('victoryScore').textContent = `${this.score} PTS`;

    const best = localStorage.getItem('arcadeBestTime');
    if (!best || this.elapsedTime < parseInt(best)) {
      localStorage.setItem('arcadeBestTime', this.elapsedTime);
      document.getElementById('victoryBest').textContent = `★ 신기록! (${timeStr})`;
    } else {
      const bSec = Math.floor(parseInt(best) / 1000);
      document.getElementById('victoryBest').textContent = `최고: ${Math.floor(bSec / 60)}분 ${bSec % 60}초`;
    }

    document.getElementById('victoryModal').classList.remove('hidden');
  }

  onGameOver() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    clearInterval(this.foodMoveTimer);
    audio.playGameOver();

    const banner = document.getElementById('missionBanner');
    if (banner) banner.classList.remove('hurry-up-pulse');

    const g = FOOD_GROUPS[this.currentGroupIndex];
    document.getElementById('gameOverReason').textContent = 
      `ROUND ${this.currentGroupIndex + 1} [${g.name}]에서 체력이 소진되었습니다. 다시 도전해 보세요!`;

    document.getElementById('gameOverModal').classList.remove('hidden');
  }

  togglePause() {
    if (!this.isRunning && !this.isPaused) return;
    this.isPaused = !this.isPaused;
    const modal = document.getElementById('pauseModal');
    if (this.isPaused) {
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
      this.tick();
    }
  }

  // ==========================================
  // 4. 레트로 도트 픽셀 캔버스 렌더링 (32px 대형화!)
  // ==========================================
  draw() {
    const ctx = this.ctx;
    const gs = this.gridSize; // 32px
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 배경
    ctx.fillStyle = this.isPanicMode ? '#180c14' : '#0e121d';
    ctx.fillRect(0, 0, w, h);

    // 격자 도트
    ctx.fillStyle = this.isPanicMode ? '#261320' : '#192033';
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if ((x + y) % 2 === 0) {
          ctx.fillRect(x * gs, y * gs, gs, gs);
        }
      }
    }

    // 패닉 모드 테두리
    if (this.isPanicMode) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, w - 4, h - 4);
    }

    // ★ 음식 아이템 렌더링 (32px 프레임 + 22px 이모지 + 11px 이름)
    this.foodsOnField.forEach(f => {
      const px = f.x * gs;
      const py = f.y * gs;

      let bounceY = 0;
      if (this.isPanicMode && f.hopAnim) {
        const timeDiff = Date.now() - f.hopAnim;
        if (timeDiff < 280) {
          bounceY = -Math.sin((timeDiff / 280) * Math.PI) * 7;
        }
      }

      // 음식 바탕 프레임 (32px)
      if (f.isTarget) {
        // 정답 음식: 밝고 큼직한 노란빛/레드빛 프레임
        ctx.fillStyle = this.isPanicMode ? '#ef4444' : '#facc15';
        ctx.fillRect(px + 1, py + 1 + bounceY, gs - 2, gs - 2);
        ctx.fillStyle = '#26200d';
        ctx.fillRect(px + 3, py + 3 + bounceY, gs - 6, gs - 6);
      } else {
        // 오답 음식: 어두운 프레임
        ctx.fillStyle = '#475569';
        ctx.fillRect(px + 1, py + 1 + bounceY, gs - 2, gs - 2);
        ctx.fillStyle = '#171e2e';
        ctx.fillRect(px + 3, py + 3 + bounceY, gs - 6, gs - 6);
      }

      // ★ 큼직한 음식 이모지 (22px)
      ctx.font = '22px Apple Color Emoji, Segoe UI Emoji, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(f.item.emoji, px + gs / 2, py + gs / 2 - 2 + bounceY);

      // 도망 표시 💨
      if (this.isPanicMode) {
        ctx.font = '13px sans-serif';
        ctx.fillText('💨', px + gs - 4, py + 6 + bounceY);
      }

      // ★ 또렷하고 큼직한 한글 이름 라벨 (11px)
      ctx.font = 'bold 11px "DungGeunMo", monospace';
      ctx.fillStyle = f.isTarget ? (this.isPanicMode ? '#fca5a5' : '#fef08a') : '#cbd5e1';
      ctx.fillText(f.item.name, px + gs / 2, py + gs + 10 + bounceY);
    });

    // ★ 포동포동한 지렁이 몸통 (32px 블록)
    for (let i = this.snake.length - 1; i >= 1; i--) {
      const seg = this.snake[i];
      const px = seg.x * gs;
      const py = seg.y * gs;

      ctx.fillStyle = (i % 2 === 0) ? '#22c55e' : '#16a34a';
      ctx.fillRect(px + 3, py + 3, gs - 6, gs - 6);

      // 하이라이트 픽셀
      ctx.fillStyle = '#86efac';
      ctx.fillRect(px + 5, py + 5, 5, 5);
    }

    // ★ 귀엽고 큰 눈의 지렁이 머리
    if (this.snake.length > 0) {
      const head = this.snake[0];
      const hpx = head.x * gs;
      const hpy = head.y * gs;

      ctx.fillStyle = '#4ade80';
      ctx.fillRect(hpx + 2, hpy + 2, gs - 4, gs - 4);

      // 큰 눈동자 흰자위
      ctx.fillStyle = '#ffffff';
      let e1 = { x: 5, y: 5 };
      let e2 = { x: 19, y: 5 };

      if (this.direction.y !== 0) {
        e1 = { x: 5, y: this.direction.y > 0 ? 17 : 4 };
        e2 = { x: 19, y: this.direction.y > 0 ? 17 : 4 };
      } else if (this.direction.x !== 0) {
        e1 = { x: this.direction.x > 0 ? 17 : 4, y: 5 };
        e2 = { x: this.direction.x > 0 ? 17 : 4, y: 19 };
      }

      ctx.fillRect(hpx + e1.x, hpy + e1.y, 7, 7);
      ctx.fillRect(hpx + e2.x, hpy + e2.y, 7, 7);

      // 검은 눈동자
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(hpx + e1.x + 2, hpy + e1.y + 2, 4, 4);
      ctx.fillRect(hpx + e2.x + 2, hpy + e2.y + 2, 4, 4);

      // 땀방울 연출 (HURRY UP 모드)
      if (this.isPanicMode) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(hpx + 2, hpy - 5, 4, 5);
      }
    }
  }

  // ==========================================
  // 5. 식품구성 자전거 렌더링
  // ==========================================
  renderBicycle() {
    const container = document.getElementById('bicycleSvgContainer');
    if (!container) return;

    const cx = 340;
    const cy = 250;
    const r = 100;
    const innerR = 30;

    let wheelSlices = '';
    FOOD_GROUPS.forEach((g, idx) => {
      const isCompleted = (this.filledFoods[g.id] || []).length >= g.targetCount;
      const isCurrent = idx === this.currentGroupIndex;
      const path = this.getSlicePath(cx, cy, innerR, r, g.angle.start, g.angle.end);

      let fill = '#1c2236';
      let stroke = '#2f3854';
      let opacity = '0.7';

      if (isCompleted) {
        fill = g.wheelColor;
        stroke = '#ffffff';
        opacity = '1';
      } else if (isCurrent) {
        fill = '#38321a';
        stroke = g.color;
        opacity = '1';
      }

      const mid = ((g.angle.start + g.angle.end) / 2) * (Math.PI / 180);
      const iconDist = (innerR + r) / 2;
      const ix = cx + Math.cos(mid) * iconDist;
      const iy = cy + Math.sin(mid) * iconDist;

      const coll = this.filledFoods[g.id] || [];
      const emoji = coll.length > 0 ? coll[coll.length - 1].emoji : (isCompleted ? '★' : '🔒');

      wheelSlices += `
        <g>
          <path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${opacity}" />
          <text x="${ix}" y="${iy - 3}" font-size="15" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
          <text x="${ix}" y="${iy + 11}" font-size="9" font-family="'DungGeunMo', monospace" font-weight="bold" fill="${isCompleted ? '#000000' : '#cbd5e1'}" text-anchor="middle">
            ${g.name.split('·')[0]}
          </text>
        </g>
      `;
    });

    const isRunningAnim = this.isRunning ? 'pedal-rotate' : '';

    container.innerHTML = `
      <svg viewBox="0 0 460 360" class="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="110" cy="250" r="70" fill="#0d1f33" stroke="#38bdf8" stroke-width="5" />
          <circle cx="110" cy="250" r="58" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,4" />
          <path d="M 90 220 L 130 220 L 125 270 Q 110 278 95 270 Z" fill="#38bdf8" opacity="0.9" stroke="#bae6fd" stroke-width="2" />
          <rect x="75" y="305" width="70" height="18" rx="4" fill="#0284c7" />
          <text x="110" y="318" font-size="9" font-family="'DungGeunMo', monospace" fill="#ffffff" text-anchor="middle">
            💧 수분 섭취
          </text>
        </g>
        <g>
          <circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="none" stroke="#475569" stroke-width="6" />
          ${wheelSlices}
          <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="#0f172a" stroke="#f8fafc" stroke-width="3" />
          <text x="${cx}" y="${cy - 3}" font-size="9" font-family="'DungGeunMo', monospace" fill="#f8fafc" text-anchor="middle">식품구성</text>
          <text x="${cx}" y="${cy + 8}" font-size="9" font-family="'DungGeunMo', monospace" fill="#f8fafc" text-anchor="middle">자전거</text>
        </g>
        <g stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <line x1="${cx}" y1="${cy}" x2="225" y2="250" />
          <line x1="225" y1="250" x2="255" y2="155" />
          <line x1="${cx}" y1="${cy}" x2="255" y2="155" />
          <line x1="255" y1="155" x2="160" y2="140" />
          <line x1="225" y1="250" x2="160" y2="140" />
          <line x1="160" y1="140" x2="110" y2="250" />
        </g>
        <g>
          <circle cx="205" cy="75" r="16" fill="#facc15" stroke="#a16207" stroke-width="2" />
          <circle cx="200" cy="74" r="2.5" fill="#000" />
          <path d="M 194 81 Q 200 86 206 82" stroke="#000" stroke-width="2" fill="none" />
          <path d="M 205 91 L 225 145 L 250 150 L 218 100 Z" fill="#22c55e" />
          <path d="M 215 102 L 180 115 L 140 108" stroke="#22c55e" stroke-width="7" stroke-linecap="round" fill="none" />
          <path d="M 248 150 L 255 200 L 210 280" stroke="#15803d" stroke-width="8" stroke-linecap="round" fill="none" />
          <rect x="202" y="278" width="16" height="6" fill="#ef4444" />
          <circle cx="225" cy="250" r="8" fill="#475569" />
          <g class="${isRunningAnim}">
            <line x1="225" y1="250" x2="210" y2="280" stroke="#f8fafc" stroke-width="3" />
          </g>
          <rect x="175" y="16" width="100" height="20" rx="4" fill="#16a34a" />
          <text x="225" y="30" font-size="10" font-family="'DungGeunMo', monospace" fill="#ffffff" text-anchor="middle">
            🏃 규칙적인 운동
          </text>
        </g>
      </svg>
    `;

    this.renderFoodSlots();
  }

  getSlicePath(cx, cy, rIn, rOut, startDeg, endDeg) {
    const toRad = Math.PI / 180;
    const sRad = startDeg * toRad;
    const eRad = endDeg * toRad;

    const x1 = cx + rOut * Math.cos(sRad);
    const y1 = cy + rOut * Math.sin(sRad);
    const x2 = cx + rOut * Math.cos(eRad);
    const y2 = cy + rOut * Math.sin(eRad);

    const x3 = cx + rIn * Math.cos(eRad);
    const y3 = cy + rIn * Math.sin(eRad);
    const x4 = cx + rIn * Math.cos(sRad);
    const y4 = cy + rIn * Math.sin(sRad);

    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`;
  }

  renderFoodSlots() {
    const container = document.getElementById('foodGroupsStatusList');
    if (!container) return;

    let html = '';
    FOOD_GROUPS.forEach((g, idx) => {
      const coll = this.filledFoods[g.id] || [];
      const isDone = coll.length >= g.targetCount;
      const isCur = idx === this.currentGroupIndex;

      let cls = 'slot-badge p-2 flex items-center justify-between text-xs ';
      if (isDone) cls += 'completed ';
      else if (isCur) cls += 'active ';

      html += `
        <div class="${cls}">
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-xs inline-block" style="background:${g.color}"></span>
            <div>
              <div class="font-bold font-pixel flex items-center gap-1 text-slate-200">
                ${g.name}
                ${isCur ? '<span class="text-yellow-400 font-pixel blink text-[10px]">▶진행중</span>' : ''}
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">
                ${coll.length > 0 ? coll.map(i => i.emoji).join(' ') : '비어있음'}
              </div>
            </div>
          </div>
          <div class="font-pixel font-bold ${isDone ? 'text-green-400' : 'text-slate-400'}">
            ${isDone ? '완성★' : `${coll.length}/${g.targetCount}`}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // ==========================================
  // 6. 상단 HUD 업데이트
  // ==========================================
  updateHUD() {
    const scoreElem = document.getElementById('scoreText');
    if (scoreElem) scoreElem.textContent = String(this.score).padStart(6, '0');

    const livesElem = document.getElementById('livesContainer');
    if (livesElem) {
      let hearts = '';
      for (let i = 0; i < this.maxLives; i++) {
        hearts += i < this.lives ? '♥ ' : '♡ ';
      }
      livesElem.textContent = hearts.trim();
    }

    const curG = FOOD_GROUPS[this.currentGroupIndex];
    if (curG) {
      const stageElem = document.getElementById('stageText');
      if (stageElem) stageElem.textContent = `ROUND 0${this.currentGroupIndex + 1}`;

      const titleElem = document.getElementById('missionTitle');
      const descElem = document.getElementById('missionDesc');
      const countElem = document.getElementById('missionCount');
      const hintElem = document.getElementById('missionHintFoods');

      if (titleElem) {
        if (this.isPanicMode) {
          titleElem.textContent = `🚨 [HURRY UP!] 음식이 도망친다! (${curG.name})`;
          titleElem.className = 'text-lg md:text-xl font-bold hurry-banner-blink tracking-tight';
        } else {
          titleElem.textContent = `[${curG.name}] 골라먹기!`;
          titleElem.style.color = curG.color;
          titleElem.className = 'text-lg md:text-xl font-bold tracking-tight';
        }
      }
      if (descElem) {
        descElem.textContent = this.isPanicMode 
          ? '⚡ 음식이 깡총깡총 뛰어다닙니다! 서둘러 따라잡으세요!' 
          : curG.description;
      }
      if (countElem) {
        countElem.textContent = `${this.collectedInGroup} / ${curG.targetCount} 개`;
      }

      if (hintElem) {
        hintElem.innerHTML = curG.items
          .map(item => `<span class="px-2 py-1 rounded bg-[#23293d] border border-[#3b4463] text-xs font-pixel text-slate-200">${item.emoji} ${item.name}</span>`)
          .join('');
      }
    }

    // 전체 완성도
    let totalCollected = 0;
    const totalMax = FOOD_GROUPS.length * 5;
    FOOD_GROUPS.forEach(g => {
      totalCollected += Math.min(5, (this.filledFoods[g.id] || []).length);
    });
    const percent = Math.min(100, Math.round((totalCollected / totalMax) * 100));

    const pText = document.getElementById('totalProgressPercent');
    const pBar = document.getElementById('totalProgressBar');
    if (pText) pText.textContent = `${percent}%`;
    if (pBar) pBar.style.width = `${percent}%`;
  }

  showToast(text, type) {
    const toast = document.getElementById('gameToast');
    if (!toast) return;

    toast.textContent = text;
    toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-lg font-pixel text-xs z-50 transition-all duration-200 border-2 ${
      type === 'success' ? 'bg-green-950 border-green-500 text-green-300' : 'bg-red-950 border-red-500 text-red-300 animate-pulse'
    }`;
    toast.style.opacity = '1';

    if (this.tTimeout) clearTimeout(this.tTimeout);
    this.tTimeout = setTimeout(() => {
      toast.style.opacity = '0';
    }, 2000);
  }

  hideAllModals() {
    ['victoryModal', 'gameOverModal', 'pauseModal', 'guideModal', 'encyclopediaModal'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
  }
}

// ==========================================
// 7. 진입점 바인딩
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const game = new NutritionSnakeArcade();

  const startBtn = document.getElementById('startGameBtn');
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      game.startNewGame();
    });
    startBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      game.startNewGame();
    });
  }

  document.querySelectorAll('.btn-restart').forEach(btn => {
    btn.addEventListener('click', () => game.startNewGame());
  });

  const resumeBtn = document.getElementById('resumeGameBtn');
  if (resumeBtn) resumeBtn.addEventListener('click', () => game.togglePause());

  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) pauseBtn.addEventListener('click', () => game.togglePause());

  const guideBtn = document.getElementById('guideBtn');
  const guideModal = document.getElementById('guideModal');
  const closeGuide = document.getElementById('closeGuideBtn');
  if (guideBtn && guideModal) {
    guideBtn.addEventListener('click', () => guideModal.classList.remove('hidden'));
    if (closeGuide) closeGuide.addEventListener('click', () => guideModal.classList.add('hidden'));
  }

  const encBtn = document.getElementById('encyclopediaBtn');
  const encModal = document.getElementById('encyclopediaModal');
  const closeEnc = document.getElementById('closeEncyclopediaBtn');
  if (encBtn && encModal) {
    encBtn.addEventListener('click', () => {
      encModal.classList.remove('hidden');
      renderEncyclopedia();
    });
    if (closeEnc) closeEnc.addEventListener('click', () => encModal.classList.add('hidden'));
  }

  function renderEncyclopedia() {
    const tbody = document.getElementById('encyclopediaTableBody');
    if (!tbody) return;

    let rows = '';
    FOOD_GROUPS.forEach(g => {
      const itemsStr = g.items.map(i => `${i.emoji} ${i.name} (${i.serving})`).join(', ');
      rows += `
        <tr class="border-b border-[#2d3345] hover:bg-[#1a1f2e] text-xs font-pixel">
          <td class="p-3 font-bold" style="color:${g.color}">★ ${g.name}</td>
          <td class="p-3 text-slate-300 leading-relaxed">${itemsStr}</td>
          <td class="p-3 text-slate-400 whitespace-nowrap">${g.kcalInfo}</td>
          <td class="p-3 text-slate-400">${g.description}</td>
        </tr>
      `;
    });
    tbody.innerHTML = rows;
  }
});
