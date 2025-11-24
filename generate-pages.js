const fs = require('fs');
const path = require('path');

// Lista de todas las páginas a crear
const pages = [
  // ARTISTAS
  { slug: 'actores-performers', title: 'Actors & Performers', desc: 'Encuentra oportunidades de casting para actores y performers profesionales.' },
  { slug: 'voiceover-artists', title: 'Voiceover Artists', desc: 'Oportunidades de doblaje y voiceover para artistas profesionales.' },
  { slug: 'creativos-produccion', title: 'Creatives & Production Crew', desc: 'Conecta con profesionales creativos y equipos de producción.' },
  { slug: 'influencers-content-creators', title: 'Influencers + Content Creators', desc: 'Plataforma para influencers y creadores de contenido.' },
  { slug: 'modelos', title: 'Models', desc: 'Oportunidades de modelaje y casting para modelos profesionales.' },
  { slug: 'llamadas-casting', title: 'Llamadas de casting', desc: 'Explora las últimas llamadas de casting disponibles.' },
  { slug: 'audiciones-populares', title: 'Audiciones populares', desc: 'Las audiciones más populares y demandadas del momento.' },
  { slug: 'como-funciona-talento', title: 'Cómo funciona para talentos', desc: 'Aprende cómo funciona Castingfy para talentos y artistas.' },
  { slug: 'consejos-guias', title: 'Consejos y guías', desc: 'Guías y consejos profesionales para mejorar en castings.' },
  { slug: 'backstage-ninos', title: 'Backstage Niños', desc: 'Castings y oportunidades para niños y jóvenes talentos.' },
  { slug: 'comunidad', title: 'Comunidad', desc: 'Únete a la comunidad de artistas y profesionales del casting.' },
  { slug: 'monologo', title: 'El monólogo', desc: 'Recursos y consejos para perfeccionar tus monólogos.' },
  { slug: 'clases-online', title: 'Clases en línea', desc: 'Cursos y clases online para actores y performers.' },

  // CREADORES
  { slug: 'film-video-tv-production', title: 'Film, Video & TV Production', desc: 'Encuentra talento para producción de cine, video y televisión.' },
  { slug: 'teatro-artes-escenicas', title: 'Theater & Performing Arts', desc: 'Casting para teatro y artes escénicas.' },
  { slug: 'voiceover-production', title: 'Voiceover Production', desc: 'Producción de voiceover y doblaje profesional.' },
  { slug: 'comercial-branded-content', title: 'Commercial + Branded Content', desc: 'Talento para comerciales y contenido de marca.' },
  { slug: 'influencers-ugc', title: 'Influencers + UGC', desc: 'Encuentra influencers y creadores de contenido generado por usuarios.' },
  { slug: 'empresas-ongs', title: 'Companies & NGOs', desc: 'Servicios de casting para empresas y organizaciones.' },
  { slug: 'talent-database-directory', title: 'Talent Database Directory', desc: 'Directorio completo de base de datos de talentos.' },
  { slug: 'base-datos-talentos', title: 'Base de datos de talentos', desc: 'Accede a nuestra extensa base de datos de talentos profesionales.' },
  { slug: 'pay-talent', title: 'Pay Talent', desc: 'Sistema de pagos para talentos y colaboradores.' },
  { slug: 'como-funciona-creadores', title: 'Cómo funciona para creadores', desc: 'Aprende cómo funciona Castingfy para directores y productores.' },
  { slug: 'consejos-creadores', title: 'Consejos para creadores', desc: 'Guías y consejos para directores de casting y productores.' },

  // EMPRESA
  { slug: 'acerca-de', title: 'Acerca de', desc: 'Conoce más sobre Castingfy y nuestra misión.' },
  { slug: 'carreras', title: 'Carreras', desc: 'Únete al equipo de Castingfy. Oportunidades laborales.' },
  { slug: 'asociados', title: 'Asociados', desc: 'Conviértete en asociado de Castingfy.' },
  { slug: 'articulos-tema', title: 'Artículos por tema', desc: 'Explora artículos organizados por categorías y temas.' },
  { slug: 'articulos-archivo', title: 'Articles Archive', desc: 'Archivo completo de artículos y recursos.' },
  { slug: 'suscripciones-empresas', title: 'Suscripciones para negocios y escuelas', desc: 'Planes de suscripción para empresas y escuelas de actuación.' }
];

// Template HTML
function generateHTML(page) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=https://castingfy.com">
  <title>${page.title} - Castingfy</title>
  <meta name="description" content="${page.desc} Únete a Castingfy.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://castingfy.com/${page.slug}">

  <!-- Open Graph -->
  <meta property="og:title" content="${page.title} - Castingfy">
  <meta property="og:description" content="${page.desc}">
  <meta property="og:url" content="https://castingfy.com/${page.slug}">
  <meta property="og:type" content="website">

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
      color: #ffffff;
      text-align: center;
      padding: 2rem;
    }
    .container {
      max-width: 600px;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 800;
    }
    p {
      font-size: 1.25rem;
      color: #cccccc;
      margin-bottom: 2rem;
    }
    .loader {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 2rem;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    a {
      color: #d4c5a9;
      text-decoration: none;
      font-weight: 600;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>

  <script>
    // Fallback redirection if meta refresh doesn't work
    setTimeout(function() {
      window.location.href = 'https://castingfy.com';
    }, 100);
  </script>
</head>
<body>
  <div class="container">
    <div class="loader"></div>
    <h1>${page.title}</h1>
    <p>Redirigiendo a Castingfy...</p>
    <p><a href="https://castingfy.com">Haz clic aquí si no eres redirigido automáticamente</a></p>
  </div>
</body>
</html>
`;
}

// Generar todas las páginas
console.log('🚀 Generando páginas landing...\n');

pages.forEach(page => {
  const filename = `${page.slug}.html`;
  const filepath = path.join(__dirname, filename);
  const html = generateHTML(page);

  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ Creada: ${filename}`);
});

console.log(`\n✨ ${pages.length} páginas generadas exitosamente!`);
