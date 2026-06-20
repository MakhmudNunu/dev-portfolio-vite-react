import { useState, useEffect } from "react";
import "../styles/portfolio.scss";

// ─── DATA ────────────────────────────────────────────────────────────────────
const SKILLS = [
  { label: "React / Next.js", variant: "purple" },
  { label: "TypeScript", variant: "blue" },
  { label: "Node.js", variant: "green" },
  { label: "PostgreSQL", variant: "blue" },
  { label: "Docker", variant: "green" },
  { label: "GraphQL", variant: "purple" },
  { label: "Figma", variant: "purple" },
  { label: "AWS / GCP", variant: "blue" },
  { label: "SCSS / BEM", variant: "green" },
];

const SERVICES = [
  {
    icon: "⬡",
    iconVariant: "purple",
    title: "Frontend-разработка",
    desc: "Точные интерфейсы на React и TypeScript. Приоритет — производительность и доступность.",
    items: ["React / Next.js", "TypeScript", "SCSS / Tailwind", "Motion / GSAP"],
    featured: true,
  },
  {
    icon: "◈",
    iconVariant: "green",
    title: "Бэкенд и API",
    desc: "Масштабируемые REST и GraphQL API, проектирование БД, авторизация и серверлесс-архитектура.",
    items: ["Node.js / Express", "PostgreSQL / Redis", "GraphQL", "JWT / OAuth"],
    featured: false,
  },
  {
    icon: "◉",
    iconVariant: "blue",
    title: "UI/UX дизайн",
    desc: "От вайрфреймов до дизайн-систем. Прототипы в Figma, готовые к продакшену.",
    items: ["Figma / Figjam", "Design Systems", "Prototyping", "User Testing"],
    featured: false,
  },
  {
    icon: "◫",
    iconVariant: "pink",
    title: "DevOps и облако",
    desc: "CI/CD, контейнеризация и облачная инфраструктура в AWS и GCP.",
    items: ["Docker / Kubernetes", "AWS / GCP", "GitHub Actions", "Terraform"],
    featured: false,
  },
  {
    icon: "◬",
    iconVariant: "purple",
    title: "Аудит производительности",
    desc: "Анализ Core Web Vitals, бандлов и узких мест рендеринга.",
    items: ["Lighthouse / WebPageTest", "Bundle Splitting", "CDN Strategy", "SSR / ISR"],
    featured: false,
  },
  {
    icon: "◆",
    iconVariant: "green",
    title: "Технический консалтинг",
    desc: "Ревью архитектуры, выбор стека и менторство для команд.",
    items: ["Code Review", "Architecture Design", "Tech Selection", "Team Mentoring"],
    featured: false,
  },
];

const PROJECTS = [
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=440&fit=crop&auto=format",
    alt: "Панель аналитики SaaS на нескольких экранах",
    tags: [{ label: "Next.js", v: "purple" }, { label: "TypeScript", v: "blue" }, { label: "PostgreSQL", v: "green" }],
    title: "Vanta Analytics Platform",
    desc: "Панель бизнес-аналитики в реальном времени, обрабатывающая 2M+ событий в день. Кастомная система графиков, ролевой доступ и мультиарендная архитектура.",
    link: "#",
    wide: true,
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=440&fit=crop&auto=format",
    alt: "Экраны мобильного банковского приложения",
    tags: [{ label: "React Native", v: "purple" }, { label: "GraphQL", v: "green" }],
    title: "Solaris FinTech App",
    desc: "Кроссплатформенное банковское приложение с биометрической авторизацией и моментальными переводами.",
    link: "#",
    wide: false,
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=440&fit=crop&auto=format",
    alt: "Сетка продуктов для e‑commerce",
    tags: [{ label: "Next.js", v: "purple" }, { label: "Shopify", v: "blue" }],
    title: "Oxide Commerce",
    desc: "Headless Shopify витрина с рейтингом Lighthouse 99+ и LCP менее 1 секунды.",
    link: "#",
    wide: false,
  },
  {
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=440&fit=crop&auto=format",
    alt: "Панель управления инференсом модели ИИ",
    tags: [{ label: "Python", v: "green" }, { label: "React", v: "purple" }, { label: "Docker", v: "blue" }],
    title: "Neuron ML Ops Dashboard",
    desc: "Управление end‑to‑end ML pipeline: версия моделей, A/B тестирование и мониторинг инференса на распределённых GPU-кластерах.",
    link: "#",
    wide: true,
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}



// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function App() {
  const API_BASE = import.meta.env.VITE_API_BASE || "";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiReply, setAiReply] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  function validateForm(): string | null {
    if (form.name.trim().length < 2) return "Имя должно содержать минимум 2 символа.";
    if (form.name.trim().length > 50) return "Имя не должно превышать 50 символов.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) return "Введите корректный email.";

    if (form.phone.trim().length < 5) return "Телефон должен содержать минимум 5 символов.";
    if (form.phone.trim().length > 20) return "Телефон не должен превышать 20 символов.";

    if (form.message.trim().length < 10) return "Сообщение должно содержать минимум 10 символов.";
    if (form.message.trim().length > 1000) return "Сообщение не должно превышать 1000 символов.";

    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!API_BASE) {
      setError("Ошибка конфигурации: URL бэкенда не задан.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        comment: form.message.trim(),
      };

      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        const data = await res.json();
        setAiReply(data.ai_reply || "Спасибо — ваше сообщение принято.");
        setForm({ name: "", email: "", phone: "", message: "" });
        fetchMetrics();
      } else if (res.status === 422) {
        const err = await res.json();
        if (Array.isArray(err.detail)) {
          const messages = err.detail.map((d: any) => d.msg || d.message || JSON.stringify(d));
          setError(messages.join("; "));
        } else {
          setError(err.detail || "Ошибка валидации данных.");
        }
      } else if (res.status === 429) {
        setError("Слишком много запросов — попробуйте позже.");
      } else {
        setError(`Ошибка сервера (${res.status}). Попробуйте позже.`);
      }
    } catch {
      setError("Не удалось связаться с сервером. Проверьте подключение к интернету.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMetrics() {
    if (!API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/api/metrics`);
      if (!res.ok) return;
      const data = await res.json();
      setMetrics(data);
    } catch {
      // metrics fetch is non-critical
    }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="portfolio">

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className="nav">
        <span className="nav__logo" onClick={() => scrollTo("hero")}>
          &lt;Алексей /&gt;
        </span>
        <ul className="nav__links">
          {[
            { label: "Обо мне", id: "about" },
            { label: "Услуги", id: "services" },
            { label: "Проекты", id: "projects" },
            { label: "Контакты", id: "contact" },
          ].map(({ label, id }) => (
            <li key={id}>
              <span className="nav__link" onClick={() => scrollTo(id)}>
                {label}
              </span>
            </li>
          ))}
        </ul>
        <span className="nav__cta" onClick={() => scrollTo("contact")}>
          Нанять
        </span>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Доступен для проектов · Удалённо по всему миру
          </div>

          <h1 className="hero__title">
           Цифровые решения
            <span className="hero__title-gradient"> для вашего результата.</span>
          </h1>

          <p className="hero__sub">
            Full‑stack инженер и UI‑дизайнер. Создаю быстрые веб‑продукты и
            понятные интерфейсы, которые отлично работают на каждом экране.
          </p>

          <div className="hero__actions">
            <button className="hero__btn hero__btn--primary" onClick={() => scrollTo("projects")}>
              Посмотреть проекты →
            </button>
            <button className="hero__btn hero__btn--outline" onClick={() => scrollTo("contact")}>
              Связаться
            </button>
          </div>

          <div className="hero__stats">
              {[
              { value: "7+", label: "лет опыта" },
              { value: "60+", label: "реализованных проектов" },
              { value: "24", label: "довольных клиентов" },
              { value: "99%", label: "удовлетворённость клиентов" },
            ].map(({ value, label }) => (
              <div key={label}>
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      <hr className="section__divider" />

      {/* ── ABOUT ───────────────────────────────────── */}
      <section id="about" className="section">
        <div className="about">
          <div className="about__visual">
            <div className="about__photo-glow" />
            <img
              className="about__photo"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=560&h=700&fit=crop&auto=format"
              alt="Alexei Kovalev — full-stack developer"
            />
            <div className="about__accent" />
          </div>

          <div className="about__content">
            <p className="about__label">// Обо мне</p>
            <h2 className="about__heading">
              Создаю веб,
              <br />
              <span className="about__heading-highlight">слой за слоем.</span>
            </h2>
            <p className="about__text">
              Я — Алексей Ковалёв, full‑stack разработчик и UI‑дизайнер из Берлина.
              За 7+ лет работы я запускал продукты для стартапов, корпораций и
              независимых команд — всегда с одной целью: сделать софт, который работает интуитивно.
            </p>
            <p className="about__text">
              Мой опыт охватывает дизайн и инженеринг: я перевожу макеты из Figma в
              продакшен‑код, не теряя качества. Особое внимание уделяю производительности,
              доступности и мелочам, которые ценят пользователи.
            </p>

            <div className="about__skills">
              {SKILLS.map(({ label, variant }) => (
                <span key={label} className={`about__skill about__skill--${variant}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="section__divider" />

      {/* ── SERVICES ────────────────────────────────── */}
      <section id="services" className="section">
        <div className="section__tag">Услуги</div>
        <h2 className="section__title">Что я могу предложить</h2>
        <p className="section__subtitle">
          Полный цикл — от идеи до развернутого продукта. Без потери контекста между этапами.
        </p>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`services__card${s.featured ? " services__card--featured" : ""}`}
            >
              <div className={`services__card-icon services__card-icon--${s.iconVariant}`}>
                {s.icon}
              </div>
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.desc}</p>
              <ul className="services__card-list">
                {s.items.map((i) => (
                  <li key={i} className="services__card-item">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <hr className="section__divider" />

      {/* ── PROJECTS ────────────────────────────────── */}
      <section id="projects" className="section">
        <div className="section__tag">Работы</div>
        <h2 className="section__title">Избранные проекты</h2>
        <p className="section__subtitle">
          Подборка проектов — от старта «с нуля» до крупных рефакторингов.
        </p>

        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className={`projects__card${p.wide ? " projects__card--wide" : " projects__card--narrow"}`}
            >
              <img
                className="projects__card-image"
                src={p.img}
                alt={p.alt}
              />
              <div className="projects__card-body">
                <div className="projects__card-tags">
                  {p.tags.map((t) => (
                    <span key={t.label} className={`projects__card-tag projects__card-tag--${t.v}`}>
                      {t.label}
                    </span>
                  ))}
                </div>
                <h3 className="projects__card-title">{p.title}</h3>
                <p className="projects__card-desc">{p.desc}</p>
                <a className="projects__card-link" href={p.link}>
                  View case study →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section__divider" />

      {/* ── CONTACT ─────────────────────────────────── */}
      <section id="contact" className="section">
        <div className="contact">
          <div className="contact__info">
            <div className="section__tag">Контакты</div>
            <h2 className="contact__heading">
              Давайте создадим
              <span className="contact__heading-highlight">что‑то классное вместе.</span>
            </h2>
            <p className="contact__text">
              Есть идея? Я открыт для фриланс‑задач и долгосрочных проектов. Напишите — отвечу в течение 24 часов.
            </p>

            <div className="contact__metrics">
              {metrics ? (
                <div className="contact__metrics-grid">
                  {[
                    { label: "Всего заявок", value: metrics.total_submissions ?? 0, colorClass: "contact__metrics-stat--primary" },
                    { label: "Положительные", value: metrics.ai_sentiment_breakdown?.positive ?? 0, colorClass: "contact__metrics-stat--positive" },
                    { label: "Нейтральные", value: metrics.ai_sentiment_breakdown?.neutral ?? 0, colorClass: "contact__metrics-stat--neutral" },
                    { label: "Негативные", value: metrics.ai_sentiment_breakdown?.negative ?? 0, colorClass: "contact__metrics-stat--negative" },
                  ].map((stat) => (
                    <div key={stat.label} className={`contact__metrics-stat ${stat.colorClass}`}>
                      <div className="contact__metrics-stat-value">{stat.value}</div>
                      <div className="contact__metrics-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="contact__metrics-empty">Загрузка метрик...</div>
              )}
            </div>

            <div className="contact__channels">
              {[
                { icon: "✉", v: "purple", label: "Почта", value: "hello@alexei.dev" },
                { icon: "◎", v: "green",  label: "Telegram", value: "@alexei_kovalev" },
                { icon: "⬡", v: "blue",   label: "LinkedIn", value: "linkedin.com/in/alexeikovalev" },
              ].map(({ icon, v, label, value }) => (
                <div key={label} className="contact__channel">
                  <div className={`contact__channel-icon contact__channel-icon--${v}`}>
                    {icon}
                  </div>
                  <div>
                    <div className="contact__channel-label">{label}</div>
                    <div className="contact__channel-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <h3 className="contact__form-title">Отправить сообщение</h3>
            <p className="contact__form-sub">Отвечаю в течение одного рабочего дня.</p>

            {aiReply ? (
              <div className="contact__form-success">
                <div>
                  <h4>Сообщение отправлено</h4>
                  <p>{aiReply}</p>
                </div>
                <button type="button" onClick={() => setAiReply(null)}>
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">ФИО</label>
                    <input
                      className="contact__input"
                      type="text"
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      minLength={2}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Телефон</label>
                    <input
                      className="contact__input"
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      minLength={5}
                      maxLength={20}
                      required
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label">Электронная почта</label>
                  <input
                    className="contact__input"
                    type="email"
                    placeholder="ivan@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label">Сообщение</label>
                  <textarea
                    className="contact__input"
                    rows={5}
                    placeholder="Расскажите о проекте — бюджет, сроки и цель..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    minLength={10}
                    maxLength={1000}
                    required
                  />
                </div>

                {error && <div className="contact__error">{error}</div>}

                <button
                  className="contact__submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Отправка..." : "Отправить сообщение →"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
            <span className="footer__logo">&lt;Алексей /&gt;</span>
            <span className="footer__copy">© 2024 Алексей Ковалёв · Создано с заботой</span>
            <div className="footer__socials">
              {['⬡', '◎', '✉', '◈'].map((icon, i) => (
                <a key={i} className="footer__social" href="#">{icon}</a>
              ))}
            </div>
          </div>
        </footer>

    </div>
  );
}
