const fs = require('fs');

// Configuración de las páginas
const pages = [
  {
    slug: 'voiceover-artists',
    title: 'Voiceover Artists - Encuentra Trabajos de Doblaje',
    heroTitle: 'Encuentra trabajos de voiceover y doblaje profesional',
    heroSubtitle: 'Accede a miles de oportunidades de locución en España. Crea tu demo reel, conecta con productores y consigue trabajos en comerciales, audiolibros, animación y más.',
    icon1: '🎙️', feature1Title: 'Demo Reel Profesional', feature1Desc: 'Sube múltiples reels personalizados: comerciales, audiolibros, animación, narrativa. Scripts de muestra incluidos para empezar.',
    icon2: '🎬', feature2Title: 'Miles de Proyectos', feature2Desc: 'Accede a trabajos para películas, series TV, marcas reconocidas, agencias creativas y producciones comerciales.',
    icon3: '🔍', feature3Title: 'Filtros Inteligentes', feature3Desc: 'Busca por tipo de producción, compensación, ubicación, rango de edad, y preferencia de grabación remota o presencial.',
    icon4: '✅', feature4Title: 'Oportunidades Verificadas', feature4Desc: 'Todos los castings son revisados para garantizar información confiable y protegerte de estafas. Tu seguridad es prioridad.',
    icon5: '📈', feature5Title: 'Desarrollo de Carrera', feature5Desc: 'Construye tu portafolio, networking con creadores, y acceso a base de datos de agencias de talento.',
    icon6: '🌍', feature6Title: 'Trabajos Globales', feature6Desc: 'Castings para proyectos en todo el mundo. Trabaja remotamente desde casa o en estudios profesionales.',
    testimonialText: '"En 6 meses conseguí trabajos para 3 audiolibros y varios comerciales. La plataforma es intuitiva, los castings son legítimos y el soporte es excelente."',
    testimonialAuthor: 'Carlos Rodríguez',
    testimonialRole: 'Actor de voz profesional, Barcelona',
    testimonialInitials: 'CR'
  },
  {
    slug: 'creativos-produccion',
    title: 'Creativos & Production Crew - Trabajos en Producción',
    heroTitle: 'Encuentra trabajos de crew y producción profesional',
    heroSubtitle: 'Miles de oportunidades para directores, productores, técnicos y creativos en España. Conecta con proyectos de cine, TV, teatro y contenido digital.',
    icon1: '🎬', feature1Title: 'Perfiles Especializados', feature1Desc: 'Crea perfiles para tu especialidad: dirección, fotografía, sonido, edición, diseño de producción y más.',
    icon2: '📋', feature2Title: 'Proyectos Diversos', feature2Desc: 'Trabaja en largometrajes, series, comerciales, documentales, videoclips y producciones teatrales.',
    icon3: '🤝', feature3Title: 'Networking Profesional', feature3Desc: 'Conecta con productoras, directores y otros profesionales del crew. Construye tu red de contactos.',
    icon4: '💼', feature4Title: 'Portafolio Digital', feature4Desc: 'Muestra tu trabajo con videos, imágenes y créditos. Destaca tus proyectos más importantes.',
    icon5: '🎯', feature5Title: 'Búsqueda Especializada', feature5Desc: 'Filtra por rol técnico, tipo de producción, presupuesto y ubicación. Encuentra el proyecto perfecto.',
    icon6: '⭐', feature6Title: 'Reputación Profesional', feature6Desc: 'Construye tu reputación con reseñas y recomendaciones de productores y directores.',
    testimonialText: '"Como director de fotografía, Castingfy me ha conectado con producciones increíbles. La calidad de los proyectos y la profesionalidad son excepcionales."',
    testimonialAuthor: 'María González',
    testimonialRole: 'Directora de Fotografía, Madrid',
    testimonialInitials: 'MG'
  },
  {
    slug: 'influencers-content-creators',
    title: 'Influencers & Content Creators - Colaboraciones de Marca',
    heroTitle: 'Encuentra colaboraciones y trabajos como influencer',
    heroSubtitle: 'Conecta con marcas y agencias en España. Monetiza tu contenido, consigue colaboraciones pagadas y haz crecer tu audiencia con proyectos profesionales.',
    icon1: '📱', feature1Title: 'Portafolio Social', feature1Desc: 'Muestra tu alcance, engagement y estilo de contenido. Estadísticas de Instagram, TikTok, YouTube y más.',
    icon2: '💰', feature2Title: 'Colaboraciones Pagadas', feature2Desc: 'Accede a campañas de marcas reconocidas. Contenido patrocinado, embajadorías y colaboraciones a largo plazo.',
    icon3: '🎯', feature3Title: 'Nichos Especializados', feature3Desc: 'Encuentra oportunidades en tu nicho: moda, fitness, tech, beauty, lifestyle, gaming, food y más.',
    icon4: '📊', feature4Title: 'Analíticas y Métricas', feature4Desc: 'Comparte tus métricas de forma segura. Las marcas verán tu alcance real y engagement auténtico.',
    icon5: '🤝', feature5Title: 'Relaciones Directas', feature5Desc: 'Comunícate directamente con marcas y agencias. Sin intermediarios, negociación transparente.',
    icon6: '🌟', feature6Title: 'UGC y Contenido', feature6Desc: 'Oportunidades de User Generated Content. Crea contenido para marcas sin necesidad de publicarlo en tus redes.',
    testimonialText: '"He conseguido 5 colaboraciones pagadas en 3 meses. Las marcas son serias y los pagos puntuales. Ideal para micro y macro influencers."',
    testimonialAuthor: 'Laura Martín',
    testimonialRole: 'Content Creator, Valencia',
    testimonialInitials: 'LM'
  },
  {
    slug: 'modelos',
    title: 'Modelos - Encuentra Trabajos de Modelaje',
    heroTitle: 'Encuentra trabajos de modelaje profesional',
    heroSubtitle: 'Miles de castings para modelos en España. Desfiles, sesiones fotográficas, campañas publicitarias, editorial y más. Todas las tallas, edades y estilos.',
    icon1: '📸', feature1Title: 'Book Profesional', feature1Desc: 'Crea tu book digital con fotos ilimitadas. Polaroids, composite cards, y portafolio completo.',
    icon2: '👗', feature2Title: 'Diversidad de Trabajos', feature2Desc: 'Pasarela, editorial, comercial, catálogo, fitness, plus size, petite, senior. Todas las categorías.',
    icon3: '📏', feature3Title: 'Medidas y Especificaciones', feature3Desc: 'Perfil detallado con medidas, tallas, color de ojos, cabello, habilidades especiales y experiencia.',
    icon4: '🌍', feature4Title: 'Agencias y Clientes', feature4Desc: 'Conecta con agencias de modelaje, fotógrafos, diseñadores y marcas de moda reconocidas.',
    icon5: '✨', feature5Title: 'Castings Verificados', feature5Desc: 'Todos los castings son revisados. Protección contra estafas y situaciones no profesionales.',
    icon6: '💫', feature6Title: 'Desarrollo Profesional', feature6Desc: 'Construye tu carrera con cada trabajo. Portfolio growing, networking y exposure con clientes top.',
    testimonialText: '"He trabajado en 2 campañas de moda y varias sesiones editorial. La plataforma es segura, profesional y las oportunidades son reales."',
    testimonialAuthor: 'Ana Silva',
    testimonialRole: 'Modelo profesional, Madrid',
    testimonialInitials: 'AS'
  },
  {
    slug: 'llamadas-casting',
    title: 'Llamadas de Casting - Encuentra Audiciones Ahora',
    heroTitle: 'Explora miles de llamadas de casting abiertas',
    heroSubtitle: 'Las últimas oportunidades de casting en España. Cine, TV, teatro, comerciales, voiceover, modelaje y más. Actualizado diariamente.',
    icon1: '🔔', feature1Title: 'Actualizaciones Diarias', feature1Desc: 'Nuevos castings publicados cada día. Alertas personalizadas para no perder ninguna oportunidad.',
    icon2: '🎯', feature2Title: 'Filtros Avanzados', feature2Desc: 'Busca por categoría, ubicación, fecha, compensación, edad requerida y tipo de proyecto.',
    icon3: '⚡', feature3Title: 'Aplicación Rápida', feature3Desc: 'Aplica en segundos con tu perfil guardado. Respuesta rápida de productores y directores de casting.',
    icon4: '📱', feature4Title: 'Notificaciones Instantáneas', feature4Desc: 'Recibe notificaciones cuando hay nuevos castings que coinciden con tu perfil y preferencias.',
    icon5: '🎬', feature5Title: 'Toda la Información', feature5Desc: 'Detalles completos: sinopsis, compensación, fechas de shooting, ubicación y requisitos específicos.',
    icon6: '✅', feature6Title: 'Castings Legítimos', feature6Desc: 'Todos los castings son verificados. Productoras y proyectos reales, sin estafas ni spam.',
    testimonialText: '"Reviso los castings todos los días. He encontrado proyectos increíbles que no hubiera conocido de otra forma. La plataforma es mi herramienta #1."',
    testimonialAuthor: 'David Torres',
    testimonialRole: 'Actor profesional, Sevilla',
    testimonialInitials: 'DT'
  },
  {
    slug: 'audiciones-populares',
    title: 'Audiciones Populares - Los Castings Más Solicitados',
    heroTitle: 'Audiciones más populares y demandadas',
    heroSubtitle: 'Descubre los castings con más aplicaciones y mejor valorados. Proyectos destacados de productoras reconocidas y oportunidades premium.',
    icon1: '⭐', feature1Title: 'Castings Destacados', feature1Desc: 'Los proyectos más populares de la semana. Grandes producciones, marcas reconocidas y presupuestos altos.',
    icon2: '🏆', feature2Title: 'Proyectos Premium', feature2Desc: 'Acceso a castings de alto perfil: largometrajes, series para plataformas streaming, campañas internacionales.',
    icon3: '📊', feature3Title: 'Tendencias del Sector', feature3Desc: 'Conoce qué tipo de talento se busca más. Adapta tu perfil a las demandas actuales del mercado.',
    icon4: '🎯', feature4Title: 'Mejor Valorados', feature4Desc: 'Castings con mejor reputación y feedback de otros artistas. Productores profesionales y serios.',
    icon5: '💼', feature5Title: 'Oportunidades de Carrera', feature5Desc: 'Proyectos que pueden impulsar tu carrera. Visibility, networking y créditos importantes.',
    icon6: '🌟', feature6Title: 'Directorio Completo', feature6Desc: 'Explora por categoría: film, TV, teatro, comercial, voiceover, modelaje, production crew.',
    testimonialText: '"Los castings destacados me han abierto puertas increíbles. Conseguí mi primer papel principal gracias a un proyecto destacado en la plataforma."',
    testimonialAuthor: 'Patricia Ramos',
    testimonialRole: 'Actriz profesional, Barcelona',
    testimonialInitials: 'PR'
  }
];

// Template HTML base
function generateHTML(page) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title} | Castingfy</title>
  <meta name="description" content="${page.heroSubtitle}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://castingfy.com/${page.slug}">
  <link rel="stylesheet" href="styles.css">
  <style>
    .landing-hero { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); color: #ffffff; padding: 6rem 0 4rem; text-align: center; }
    .landing-hero__title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; }
    .landing-hero__subtitle { font-size: clamp(1.125rem, 2vw, 1.5rem); color: #cccccc; margin-bottom: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; }
    .landing-hero__cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 3rem 0; }
    .stat-item { text-align: center; }
    .stat-number { font-size: 3rem; font-weight: 800; color: #d4c5a9; line-height: 1; }
    .stat-label { font-size: 0.875rem; color: #e0e0e0; margin-top: 0.5rem; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0; }
    .feature-card { background: #ffffff; padding: 2.5rem; border-radius: 1rem; border: 2px solid #e5e5e0; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06); }
    .feature-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12); border-color: #1a1a1a; }
    .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .feature-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: #1a1a1a; }
    .feature-desc { color: #4a4a4a; line-height: 1.6; font-size: 1rem; }
    .how-it-works { background: #ffffff; padding: 4rem 0; }
    .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 3rem 0; }
    .step-card { text-align: center; }
    .step-number { width: 64px; height: 64px; background: #1a1a1a; color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; margin: 0 auto 1.5rem; }
    .step-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: #1a1a1a; }
    .step-desc { color: #4a4a4a; line-height: 1.6; font-size: 1rem; }
    .testimonial-section { padding: 4rem 0; background: #f8f7f4; }
    .testimonial-card { background: #ffffff; padding: 3rem; border-radius: 1rem; max-width: 800px; margin: 2rem auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); }
    .testimonial-text { font-size: 1.25rem; font-style: italic; color: #1a1a1a; line-height: 1.7; margin-bottom: 1.5rem; }
    .testimonial-author { display: flex; align-items: center; gap: 1rem; }
    .testimonial-avatar { width: 64px; height: 64px; border-radius: 50%; background: #1a1a1a; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; }
    .testimonial-info h4 { font-weight: 700; color: #1a1a1a; margin-bottom: 0.25rem; font-size: 1rem; }
    .testimonial-info p { color: #4a4a4a; font-size: 0.875rem; }
    .cta-section { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); color: #ffffff; padding: 4rem 0; text-align: center; }
    .cta-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 1rem; }
    .cta-subtitle { font-size: 1.25rem; color: #cccccc; margin-bottom: 2rem; }
    .section-title { color: #1a1a1a !important; -webkit-text-fill-color: #1a1a1a !important; }
    .section-subtitle { color: #4a4a4a !important; font-size: 1.125rem; }
    .btn-outline { border: 2px solid #ffffff; color: #ffffff; }
    .btn-outline:hover { background-color: #ffffff; color: #1a1a1a; }
    @media (max-width: 768px) {
      .landing-hero { padding: 3rem 1rem 2rem; }
      .landing-hero__title { font-size: 2rem; }
      .landing-hero__subtitle { font-size: 1rem; padding: 0 1rem; }
      .landing-hero__cta { flex-direction: column; gap: 0.75rem; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
      .stat-number { font-size: 2rem; }
      .stat-label { font-size: 0.75rem; }
      .features-grid, .steps-grid { grid-template-columns: 1fr; gap: 1.5rem; }
      .feature-card, .testimonial-card { padding: 1.5rem; }
      .feature-title, .step-title { font-size: 1.25rem; }
      .feature-desc, .step-desc { font-size: 0.9375rem; }
      .how-it-works, .testimonial-section { padding: 3rem 0; }
      .cta-section { padding: 3rem 1rem; }
      .cta-title { font-size: 1.75rem; }
      .cta-subtitle { font-size: 1rem; }
      .section-title { font-size: 1.75rem; text-align: center; }
      .section-subtitle { font-size: 1rem; text-align: center; }
      .testimonial-text { font-size: 1rem; }
      .btn-lg { padding: 0.875rem 1.5rem; font-size: 1rem; width: 100%; }
      .features-section, .how-it-works, .testimonial-section { padding: 3rem 1rem !important; }
      .container { padding-left: 1rem; padding-right: 1rem; }
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="container navbar__container">
      <a href="/" class="navbar__logo"><span class="navbar__logo-text">CASTINGFY</span></a>
      <div class="navbar__actions">
        <a href="https://app.castingfy.com/login" class="navbar__link navbar__link--action">Iniciar sesión</a>
        <a href="https://app.castingfy.com/register" class="btn btn-primary btn-sm">Registrarse gratis</a>
      </div>
    </div>
  </nav>

  <main>
    <section class="landing-hero">
      <div class="container">
        <h1 class="landing-hero__title">${page.heroTitle}</h1>
        <p class="landing-hero__subtitle">${page.heroSubtitle}</p>
        <div class="landing-hero__cta">
          <a href="https://app.castingfy.com/register" class="btn btn-primary btn-lg">Crea tu perfil gratis</a>
          <a href="#como-funciona" class="btn btn-outline btn-lg">Cómo funciona</a>
        </div>
        <div class="stats-grid">
          <div class="stat-item"><div class="stat-number">60+</div><div class="stat-label">Años de confianza</div></div>
          <div class="stat-item"><div class="stat-number">1M+</div><div class="stat-label">Talentos registrados</div></div>
          <div class="stat-item"><div class="stat-number">100K+</div><div class="stat-label">Castings publicados</div></div>
          <div class="stat-item"><div class="stat-number">100%</div><div class="stat-label">Verificados</div></div>
        </div>
      </div>
    </section>

    <section class="features-section" style="padding: 4rem 0; background: #f8f7f4;">
      <div class="container">
        <h2 class="section-title">Todo lo que necesitas para tu carrera</h2>
        <p class="section-subtitle">Herramientas profesionales diseñadas para ti</p>
        <div class="features-grid">
          <div class="feature-card"><div class="feature-icon">${page.icon1}</div><h3 class="feature-title">${page.feature1Title}</h3><p class="feature-desc">${page.feature1Desc}</p></div>
          <div class="feature-card"><div class="feature-icon">${page.icon2}</div><h3 class="feature-title">${page.feature2Title}</h3><p class="feature-desc">${page.feature2Desc}</p></div>
          <div class="feature-card"><div class="feature-icon">${page.icon3}</div><h3 class="feature-title">${page.feature3Title}</h3><p class="feature-desc">${page.feature3Desc}</p></div>
          <div class="feature-card"><div class="feature-icon">${page.icon4}</div><h3 class="feature-title">${page.feature4Title}</h3><p class="feature-desc">${page.feature4Desc}</p></div>
          <div class="feature-card"><div class="feature-icon">${page.icon5}</div><h3 class="feature-title">${page.feature5Title}</h3><p class="feature-desc">${page.feature5Desc}</p></div>
          <div class="feature-card"><div class="feature-icon">${page.icon6}</div><h3 class="feature-title">${page.feature6Title}</h3><p class="feature-desc">${page.feature6Desc}</p></div>
        </div>
      </div>
    </section>

    <section id="como-funciona" class="how-it-works">
      <div class="container">
        <h2 class="section-title">Cómo funciona</h2>
        <p class="section-subtitle">Lanza tu carrera en 3 simples pasos</p>
        <div class="steps-grid">
          <div class="step-card"><div class="step-number">1</div><h3 class="step-title">Crea tu perfil</h3><p class="step-desc">Regístrate gratis y completa tu perfil profesional con fotos, videos y toda tu experiencia.</p></div>
          <div class="step-card"><div class="step-number">2</div><h3 class="step-title">Explora oportunidades</h3><p class="step-desc">Navega miles de castings verificados. Filtra por tipo, ubicación y encuentra tu proyecto ideal.</p></div>
          <div class="step-card"><div class="step-number">3</div><h3 class="step-title">Aplica y destaca</h3><p class="step-desc">Envía tu aplicación y comunícate directamente. ¡Consigue tu próximo trabajo!</p></div>
        </div>
        <div style="text-align: center; margin-top: 3rem;">
          <a href="https://app.castingfy.com/register" class="btn btn-primary btn-lg">Comienza ahora - Es gratis</a>
        </div>
      </div>
    </section>

    <section class="testimonial-section">
      <div class="container">
        <h2 class="section-title">Lo que dicen nuestros profesionales</h2>
        <div class="testimonial-card">
          <p class="testimonial-text">${page.testimonialText}</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${page.testimonialInitials}</div>
            <div class="testimonial-info">
              <h4>${page.testimonialAuthor}</h4>
              <p>${page.testimonialRole}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2 class="cta-title">¿Listo para comenzar?</h2>
        <p class="cta-subtitle">Únete a miles de profesionales que ya están construyendo su futuro con Castingfy</p>
        <a href="https://app.castingfy.com/register" class="btn btn-primary btn-lg" style="background: #ffffff; color: #1a1a1a;">Crea tu perfil gratis ahora</a>
        <p style="margin-top: 1rem; color: #cccccc; font-size: 0.875rem;">No se requiere tarjeta de crédito • Perfil ilimitado • Acceso instantáneo</p>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__links">
          <h3 class="footer__links-title">ARTISTAS</h3>
          <ul class="footer__links-list">
            <li><a href="/actores-performers">Actors & Performers</a></li>
            <li><a href="/voiceover-artists">Voiceover Artists</a></li>
            <li><a href="/creativos-produccion">Creatives & Production Crew</a></li>
            <li><a href="/influencers-content-creators">Influencers + Content Creators</a></li>
            <li><a href="/modelos">Models</a></li>
            <li><a href="https://app.castingfy.com/register" style="font-weight: 600;">Crea tu perfil gratis</a></li>
          </ul>
        </div>
        <div class="footer__links">
          <h3 class="footer__links-title">CREADORES</h3>
          <ul class="footer__links-list">
            <li><a href="/film-video-tv-production">Film, Video & TV Production</a></li>
            <li><a href="/voiceover-production">Voiceover Production</a></li>
            <li><a href="https://app.castingfy.com/register" style="font-weight: 600;">Publica un trabajo</a></li>
          </ul>
        </div>
        <div class="footer__links">
          <h3 class="footer__links-title">EMPRESA</h3>
          <ul class="footer__links-list">
            <li><a href="/acerca-de">Acerca de</a></li>
            <li><a href="/carreras">Carreras</a></li>
          </ul>
        </div>
        <div class="footer__connect">
          <h3 class="footer__links-title">CONECTA</h3>
          <div class="footer__social" style="margin-bottom: 1.5rem;">
            <a href="https://facebook.com" target="_blank" class="footer__social-link"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <a href="https://twitter.com/castingfy" target="_blank" class="footer__social-link"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
            <a href="https://instagram.com/castingfy" target="_blank" class="footer__social-link"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg></a>
          </div>
          <h4 class="footer__newsletter-title">Suscríbete</h4>
          <form class="footer__newsletter-form">
            <input type="email" placeholder="Tu correo" class="footer__newsletter-input" required/>
            <button type="submit" class="footer__newsletter-btn">Enviar</button>
          </form>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-content">
          <div class="footer__legal">
            <span>© 2025 Castingfy</span>
            <span class="footer__separator">•</span>
            <a href="/terminos">Términos</a>
            <span class="footer__separator">•</span>
            <a href="/privacidad">Privacidad</a>
          </div>
          <div class="footer__tagline">
            <p><span style="font-weight: 600;">🎬 Castingfy</span><br/>Hecho con ❤️ desde España</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// Generar todas las páginas
console.log('🚀 Generando 6 landing pages completas...\n');

pages.forEach(page => {
  const filename = `${page.slug}.html`;
  const html = generateHTML(page);
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✅ ${filename}`);
});

console.log(`\n✨ ${pages.length} landing pages creadas con diseño optimizado!`);
