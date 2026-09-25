// ============================================
// КОНФИГУРАЦИЯ
// ============================================
const CONFIG = {
  TELEGRAM_BOT_TOKEN: "ТОКЕН_ТВОЕГО_БОТА",
  TELEGRAM_CHAT_ID: "ТВОЙ_CHAT_ID",
  START_DATE: "2024-09-25T00:00:00", // ← дата вашей первой встречи (ГГГГ-ММ-ДД)
};

// ============================================
// ТЕКСТ ПОЗДРАВЛЕНИЯ
// ============================================
const MESSAGE_TEXT = `Дорогая Амина,

Сегодня ровно год с того дня, как наша история началась. Этот год был похож на красивый фильм — со своими яркими кадрами, тёплыми моментами и чувствами, которые с каждым днём становятся только сильнее.

Я помню нашу первую встречу так, будто это было вчера. Твой взгляд, твоя улыбка — они остались в моём сердце навсегда. С тех пор каждый день с тобой — это подарок.

Ты делаешь мою жизнь ярче. Рядом с тобой я чувствую себя счастливым, нужным и любимым. Спасибо тебе за каждый момент, за каждое слово, за каждую улыбку.

Этот год — только начало нашей большой истории. Впереди ещё много лет, много счастливых дней и незабываемых мгновений. Я хочу провести их все с тобой.

С годовщиной, любимая. Спасибо, что ты рядом.

Я тебя очень люблю. ❤️`;

// ============================================
// ПРИЧИНЫ ЛЮБВИ
// ============================================
const REASONS = [
  "За твою улыбку, от которой тает моё сердце",
  "За то, как ты смеёшься над моими шутками",
  "За твою заботу, которую я чувствую каждый день",
  "За твои глаза, в которых я тону",
  "За то, что ты всегда рядом, когда мне трудно",
  "За твой голос — он для меня лучший звук на свете",
  "За то, как ты морщишь носик, когда думаешь",
  "За твою доброту ко всем вокруг",
  "За то, что ты делаешь обычные дни волшебными",
  "За твои объятия, в которых я забываю обо всём",
  "За то, что ты веришь в меня",
  'За каждое "доброе утро" и "спокойной ночи"',
  "За то, что ты моя самая родная",
  "За твоё терпение с моими недостатками",
  "За то, как ты радуешься мелочам",
  "За твою искренность и честность",
  "За то, что ты — моё вдохновение",
  "За твои тёплые руки, которые всегда успокаивают",
  "За то, что ты моя Вселенная",
  "За то, что ты — это ты. И этого достаточно ❤️",
];

// ============================================
// ТАЙНЫЕ ПОСЛАНИЯ
// ============================================
const SECRETS = [
  "Ты — самое лучшее, что случилось со мной 💖",
  "Каждый день с тобой — это подарок",
  "Я люблю тебя больше, чем могу выразить словами",
  "Ты моя самая красивая на свете",
  "Думаю о тебе каждую минуту",
  "Ты — моё вдохновение и моя муза",
  "Мечтаю о нашем будущем вместе",
  "Твоё счастье — моё счастье",
  "Ты — причина моей улыбки каждый день",
  "Я самый счастливый человек, потому что ты рядом ❤️",
];

// ============================================
// СЧЁТЧИК ВРЕМЕНИ
// ============================================
function updateCounter() {
  const start = new Date(CONFIG.START_DATE).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCounter();
setInterval(updateCounter, 1000);

// ============================================
// АНИМАЦИЯ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА
// ============================================
let typingStarted = false;

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;

  const el = document.getElementById("typingText");
  let index = 0;
  const speed = 35;

  function type() {
    if (index < MESSAGE_TEXT.length) {
      el.textContent += MESSAGE_TEXT.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      el.classList.add("done");
    }
  }
  type();
}

// ============================================
// ЗВЁЗДЫ НА ФОНЕ
// ============================================
const starsCanvas = document.getElementById("starsCanvas");
const sctx = starsCanvas.getContext("2d");
let stars = [];

function resizeStars() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  stars = [];
  const count = Math.floor((starsCanvas.width * starsCanvas.height) / 12000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
    });
  }
}

function drawStars(t) {
  sctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach((s) => {
    const twinkle = Math.sin(t * s.speed * 0.001) * 0.3 + 0.7;
    sctx.globalAlpha = s.alpha * twinkle;
    sctx.fillStyle = "#ffffff";
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sctx.fill();
  });
  sctx.globalAlpha = 1;
}

// ============================================
// СЕРДЕЧКИ + ЛЕПЕСТКИ + САЛЮТ
// ============================================
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");
let items = [];
let particles = [];

function resizeHearts() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeStars();
resizeHearts();
window.addEventListener("resize", () => {
  resizeStars();
  resizeHearts();
});

class FloatingItem {
  constructor(type) {
    this.type = type; // 'heart' или 'petal'
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 30;
    this.size = Math.random() * 12 + (this.type === "heart" ? 10 : 8);
    this.speed = Math.random() * 1.2 + 0.4;
    this.opacity = Math.random() * 0.35 + 0.2;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.015 + 0.005;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.color =
      this.type === "heart"
        ? `hsla(${Math.random() * 30 + 330}, 80%, 70%, ${this.opacity})`
        : `hsla(${Math.random() * 20 + 340}, 70%, 75%, ${this.opacity})`;
  }

  update() {
    this.y -= this.speed;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.8;
    this.rotation += this.rotationSpeed;

    if (this.y < -40) this.reset();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;

    if (this.type === "heart") {
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.5, -s, 0, -s * 0.5);
      ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.5, 0, s * 0.3);
      ctx.fill();
    } else {
      // Лепесток
      const s = this.size;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.6, s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
    this.color = color;
    this.size = Math.random() * 3 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.vx *= 0.98;
    this.life -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function createFirework(x, y) {
  const colors = ["#ff6b9d", "#ff8a80", "#ffb74d", "#ce93d8", "#81d4fa"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const count = 30;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 4 + 2;
    const p = new Particle(x, y, color);
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
    particles.push(p);
  }
}

// Инициализация плавающих элементов
for (let i = 0; i < 18; i++) items.push(new FloatingItem("heart"));
for (let i = 0; i < 12; i++) items.push(new FloatingItem("petal"));

let startTime = null;

function animate(t) {
  if (!startTime) startTime = t;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars(t);

  items.forEach((i) => {
    i.update();
    i.draw();
  });

  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Салют каждые 3 сек
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  createFirework(x, y);
}, 3000);

// ============================================
// МУЗЫКА
// ============================================
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let musicPlaying = false;

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicBtn.textContent = "🔇";
  } else {
    music.play().catch((err) => console.log("Ошибка:", err));
    musicBtn.textContent = "🔊";
  }
  musicPlaying = !musicPlaying;
});

// ============================================
// ПЛЕЙЛИСТ
// ============================================
const playlistItems = document.querySelectorAll(".playlist-item");

playlistItems.forEach((item) => {
  item.addEventListener("click", () => {
    const src = item.dataset.src;
    music.src = src;
    music.play().catch((err) => console.log("Ошибка:", err));
    musicBtn.textContent = "🔊";
    musicPlaying = true;

    playlistItems.forEach((i) => i.classList.remove("playing"));
    item.classList.add("playing");

    // Меняем иконку на паузу, остальным — play
    playlistItems.forEach(
      (i) => (i.querySelector(".playlist-icon").textContent = "▶"),
    );
    item.querySelector(".playlist-icon").textContent = "❚❚";
  });
});

// ============================================
// ТИПИНГ ПРИ СКРОЛЛЕ
// ============================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("message-section")
      ) {
        startTyping();
      }
    });
  },
  { threshold: 0.3 },
);

const messageSection = document.querySelector(".message-section");
if (messageSection) observer.observe(messageSection);

// ============================================
// ПРИЧИНЫ ЛЮБВИ
// ============================================
const reasonBtn = document.getElementById("reasonBtn");
const reasonText = document.getElementById("reasonText");
let lastReasonIndex = -1;

reasonBtn.addEventListener("click", () => {
  reasonText.classList.add("fade");
  setTimeout(() => {
    let index;
    do {
      index = Math.floor(Math.random() * REASONS.length);
    } while (index === lastReasonIndex && REASONS.length > 1);
    lastReasonIndex = index;
    reasonText.textContent = REASONS[index];
    reasonText.classList.remove("fade");
  }, 300);
});

// ============================================
// СЕКРЕТНЫЕ ПОСЛАНИЯ
// ============================================
const secretBtn = document.getElementById("secretBtn");
const secretModal = document.getElementById("secretModal");
const secretText = document.getElementById("secretText");
const secretClose = document.getElementById("secretClose");

function showSecret() {
  const random = SECRETS[Math.floor(Math.random() * SECRETS.length)];
  secretText.textContent = random;
  secretModal.classList.add("active");
}

secretBtn.addEventListener("click", showSecret);
secretClose.addEventListener("click", () =>
  secretModal.classList.remove("active"),
);
secretModal.addEventListener("click", (e) => {
  if (e.target === secretModal) secretModal.classList.remove("active");
});

// ============================================
// КЛИК ПО СЕРДЕЧКАМ (canvas) — открывает послание
// ============================================
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    const dist = Math.hypot(item.x - x, item.y - y);
    if (dist < item.size * 1.5) {
      showSecret();
      break;
    }
  }
});

// ============================================
// ФОРМА ОТПРАВКИ
// ============================================
const replyForm = document.getElementById("replyForm");
const replyMessage = document.getElementById("replyMessage");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

replyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = replyMessage.value.trim();
  if (!message) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Отправка...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const text = `💌 Ответ от Амины:\n\n${message}`;

  try {
    const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();
    if (data.ok) {
      formStatus.textContent = "Спасибо, любимая! Я получил твой ответ ❤️";
      formStatus.classList.add("success");
      replyMessage.value = "";
    } else {
      throw new Error(data.description || "Ошибка");
    }
  } catch (error) {
    console.error(error);
    formStatus.textContent = "Ошибка отправки. Попробуй ещё раз.";
    formStatus.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить";
  }
});

// ============================================
// ФИНАЛЬНЫЙ ВОПРОС
// ============================================
const btnYes = document.getElementById("btnYes");
const btnYes2 = document.getElementById("btnYes2");
const btnNo = document.getElementById("btnNo");
const finalAnswer = document.getElementById("finalAnswer");

function handleYes(message) {
  finalAnswer.textContent = message;
  createFirework(window.innerWidth / 2, window.innerHeight / 2);
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6,
      );
    }, i * 300);
  }
}

btnYes.addEventListener("click", () =>
  handleYes("Я знал! Люблю тебя бесконечно ❤️"),
);
btnYes2.addEventListener("click", () =>
  handleYes("Ты сделала меня самым счастливым 💍❤️"),
);

// Кнопка "Нет" убегает от курсора
btnNo.addEventListener("mouseover", () => {
  const maxX = 200;
  const maxY = 100;
  const x = (Math.random() - 0.5) * maxX;
  const y = (Math.random() - 0.5) * maxY;
  btnNo.style.transform = `translate(${x}px, ${y}px)`;
});

btnNo.addEventListener("click", () => {
  finalAnswer.textContent = "Ну и ладно... шучу! Я всё равно тебя люблю 😄";
});
