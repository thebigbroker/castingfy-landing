# 🚀 Guía de Setup Completa - Castingfy MVP

**Objetivo:** Lanzar MVP funcional en Webflow con registro de usuarios en 1 día.

---

## 📋 CHECKLIST GENERAL

- [ ] Crear todas las cuentas necesarias
- [ ] Configurar Supabase (base de datos)
- [ ] Configurar Uploadcare (subida de archivos)
- [ ] Crear proyecto Webflow
- [ ] Diseñar formulario de registro
- [ ] Configurar Zapier (automatización)
- [ ] Configurar emails (Resend)
- [ ] Testing completo
- [ ] Deploy y dominio

---

## 1️⃣ CREAR CUENTAS (30 minutos)

### 1.1 Supabase (Base de Datos)

**URL:** https://supabase.com

```
1. Sign Up con GitHub o Email
2. Crear nuevo proyecto:
   - Nombre: castingfy-mvp
   - Database Password: [GENERA UNA FUERTE - GUÁRDALA]
   - Region: Europe West (Ireland)
3. Esperar ~2 minutos a que se aprovisione
4. ✅ GUARDAR:
   - Project URL: https://xxxxx.supabase.co
   - anon key: eyJhbGc...
   - service_role key: eyJhbGc... (⚠️ SECRETO)
```

**Archivo:** `SUPABASE-CREDENTIALS.txt` (NO subir a GitHub)
```
PROJECT_URL=https://xxxxx.supabase.co
ANON_KEY=eyJhbGc...
SERVICE_ROLE_KEY=eyJhbGc...
DATABASE_PASSWORD=tu-password-fuerte
```

---

### 1.2 Uploadcare (Subida de Archivos)

**URL:** https://uploadcare.com

```
1. Sign Up gratis
2. Crear nuevo proyecto: "Castingfy MVP"
3. ✅ GUARDAR:
   - Public Key: xxxxxxxxxxxxxxx
   - Secret Key: xxxxxxxxxxxxxxx (⚠️ SECRETO)
```

**Configuración recomendada:**
- Max file size: 10MB (fotos), 100MB (videos)
- Allowed formats: jpg, png, mp4, mov
- Storage: Uploadcare CDN (incluido gratis)

---

### 1.3 Webflow

**URL:** https://webflow.com

```
1. Sign Up (usa el plan Free para empezar)
2. No crear proyecto aún (lo haremos después)
```

**Plan recomendado para MVP:**
- Free: OK para desarrollo
- Basic ($14/mes): Cuando conectes dominio castingfy.com

---

### 1.4 Zapier

**URL:** https://zapier.com

```
1. Sign Up gratis
2. Plan Free: 100 tasks/mes (suficiente para empezar)
3. Cuando tengas >100 registros/mes → Starter ($20/mes)
```

---

### 1.5 Resend (Emails)

**URL:** https://resend.com

```
1. Sign Up gratis
2. Plan Free: 3,000 emails/mes (perfecto para MVP)
3. Verificar dominio (opcional para ahora, usa @resend.dev)
4. ✅ GUARDAR:
   - API Key: re_xxxxxx (⚠️ SECRETO)
```

---

### 1.6 Google Analytics 4

**URL:** https://analytics.google.com

```
1. Crear cuenta GA4
2. Crear propiedad "Castingfy"
3. ✅ GUARDAR:
   - Measurement ID: G-XXXXXXXXXX
```

---

## 2️⃣ CONFIGURAR SUPABASE (15 minutos)

### 2.1 Crear Schema de Base de Datos

```
1. Ir a Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Abrir el archivo: supabase-schema.sql
4. Copiar TODO el contenido
5. Pegar en SQL Editor
6. Click "Run" (botón verde abajo a la derecha)
7. Verificar que salga: "Success. No rows returned"
```

### 2.2 Verificar Tablas Creadas

```
1. Ir a "Table Editor" en el menú lateral
2. Deberías ver 4 tablas:
   ✅ users
   ✅ talent_profiles
   ✅ producer_profiles
   ✅ form_submissions
```

### 2.3 Probar Insert Manual (opcional)

```
1. En Table Editor → users
2. Click "Insert" → "Insert row"
3. Rellenar:
   - email: test@castingfy.com
   - role: talento
4. Click "Save"
5. Verificar que aparece en la tabla
6. Borrar el registro de prueba
```

### 2.4 Configurar API Settings

```
1. Settings → API
2. Verificar que "anon key" esté visible
3. Configuración de RLS (Row Level Security):
   - Por ahora está en modo permisivo (OK para MVP)
   - Cuando desarrolles backend, cambiar políticas
```

✅ **Supabase listo**

---

## 3️⃣ CONFIGURAR UPLOADCARE (10 minutos)

### 3.1 Settings del Proyecto

```
1. Uploadcare Dashboard → Settings
2. Security:
   - Allow uploads from: * (any domain) - para desarrollo
   - Signing: OFF (para MVP)
3. File handling:
   - Max file size: 10MB
   - Allowed formats: image/*, video/mp4, video/quicktime
4. Storage:
   - Keep files: Forever
   - CDN: Enabled (automático)
```

### 3.2 Configurar Widget Settings

```
1. Settings → Widget
2. Tabs habilitados:
   - [x] File
   - [x] Camera (para móvil)
   - [ ] URL (desactivar)
   - [ ] Facebook (desactivar)
3. Image editing:
   - [x] Enable crop
   - Aspect ratio: Free
4. Video:
   - Max duration: 5 minutes
```

### 3.3 Obtener Snippet de Código

```
1. Settings → Install
2. Copiar este snippet (lo usarás en Webflow):

<script>
  UPLOADCARE_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
  UPLOADCARE_LOCALE = 'es';
  UPLOADCARE_TABS = 'file camera';
  UPLOADCARE_IMAGES_ONLY = false;
</script>
<script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>
```

✅ **Uploadcare listo**

---

## 4️⃣ CREAR PROYECTO WEBFLOW (2 horas)

### 4.1 Crear Proyecto Nuevo

```
1. Webflow Dashboard → New Project
2. Seleccionar "Blank Site"
3. Nombre: "Castingfy MVP"
4. Click "Create Project"
```

### 4.2 Migrar Landing Page Existente

Tienes dos opciones:

**OPCIÓN A: Copia/Pega Manual (Recomendada - 1.5 horas)**
```
1. Abrir castingfy-landing/index.html en navegador
2. En Webflow, crear páginas:
   - Home (index)
   - /registro
   - /gracias (thank you page)

3. Replicar estructura:
   - Navbar
   - Hero
   - Beneficios
   - Cómo funciona
   - FAQ
   - Footer

4. Copiar estilos de styles.css como:
   - Clases en Webflow
   - Variables en Style Manager
```

**OPCIÓN B: Usar Template (Rápida - 30 min)**
```
1. Ir a Webflow Templates
2. Buscar "SaaS Landing Page" gratis
3. Clonar template
4. Customizar textos y colores de Castingfy
```

### 4.3 Configurar Variables CSS

```
1. Style Manager → Variables
2. Crear variables de color:
   - Primary: #6dcff6
   - Accent: #a78bfa
   - Background: #0b0b10
   - Surface: #11131a
   - Text: #e8eaf1
```

### 4.4 Crear Página de Registro

**Estructura de la página /registro:**

```
┌─────────────────────────────────────────┐
│  NAVBAR (igual que home)                │
├─────────────────────────────────────────┤
│                                          │
│  HERO SECTION                            │
│  - Título: "Únete a Castingfy"         │
│  - Subtítulo corto                      │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│  FORM SECTION                            │
│  [Aquí va el formulario - ver abajo]   │
│                                          │
├─────────────────────────────────────────┤
│  FOOTER (igual que home)                │
└─────────────────────────────────────────┘
```

### 4.5 Crear Formulario de Registro

**EN WEBFLOW:**

```
1. Añadir Form Block en la página /registro
2. Configurar Form Settings:
   - Name: "registro-castingfy"
   - Action: (dejarlo vacío, lo manejará Zapier)
   - Method: POST
3. Añadir campos (ver estructura abajo)
```

**ESTRUCTURA DEL FORMULARIO:**

```html
<!-- Paso 1: Información básica -->
<div class="form-section">
  <h3>Información básica</h3>

  <!-- Email -->
  <label>Email*</label>
  <input type="email" name="email" required placeholder="tu@email.com">

  <!-- Nombre -->
  <label>Nombre completo / Artístico*</label>
  <input type="text" name="nombre" required placeholder="Ana García">

  <!-- Rol -->
  <label>¿Qué eres?*</label>
  <div class="radio-group">
    <input type="radio" name="role" value="talento" id="role-talento" required>
    <label for="role-talento">Talento (Actor, Modelo, Creador)</label>

    <input type="radio" name="role" value="productor" id="role-productor">
    <label for="role-productor">Productor / Agencia / Director de casting</label>
  </div>
</div>

<!-- Paso 2: Campos condicionales (mostrar según rol) -->

<!-- SI TALENTO: -->
<div class="form-section conditional-talento" style="display: none;">
  <h3>Tu perfil de talento</h3>

  <!-- Ubicación -->
  <label>Ubicación*</label>
  <input type="text" name="ubicacion" placeholder="Madrid, España">

  <!-- Edad -->
  <label>Edad</label>
  <input type="number" name="edad" placeholder="25">

  <!-- Género -->
  <label>Género</label>
  <select name="genero">
    <option value="">Selecciona...</option>
    <option value="hombre">Hombre</option>
    <option value="mujer">Mujer</option>
    <option value="no-binario">No binario</option>
    <option value="prefiero-no-decir">Prefiero no decir</option>
  </select>

  <!-- Altura -->
  <label>Altura (cm)</label>
  <input type="number" name="altura" placeholder="170">

  <!-- Bio -->
  <label>Cuéntanos sobre ti</label>
  <textarea name="bio" rows="4" placeholder="Experiencia, habilidades, intereses..."></textarea>

  <!-- Headshot (Uploadcare) -->
  <label>Headshot / Foto de perfil*</label>
  <input type="hidden"
         role="uploadcare-uploader"
         name="headshot"
         data-public-key="TU_UPLOADCARE_PUBLIC_KEY"
         data-images-only="true"
         data-crop="free"
         data-tabs="file camera" />

  <!-- Reel (Uploadcare) -->
  <label>Video Reel (opcional)</label>
  <input type="hidden"
         role="uploadcare-uploader"
         name="reel"
         data-public-key="TU_UPLOADCARE_PUBLIC_KEY"
         data-accept="video/*"
         data-tabs="file" />
</div>

<!-- SI PRODUCTOR: -->
<div class="form-section conditional-productor" style="display: none;">
  <h3>Tu perfil de productor</h3>

  <!-- Empresa -->
  <label>Nombre de la empresa*</label>
  <input type="text" name="empresa" placeholder="Producciones Ejemplo S.L.">

  <!-- Tipo de proyectos -->
  <label>Tipo de proyectos</label>
  <select name="tipo_proyectos" multiple>
    <option value="cine">Cine</option>
    <option value="tv">TV</option>
    <option value="teatro">Teatro</option>
    <option value="publicidad">Publicidad</option>
    <option value="web">Web/Digital</option>
  </select>

  <!-- Website -->
  <label>Website (opcional)</label>
  <input type="url" name="website" placeholder="https://tuproducciones.com">

  <!-- Créditos -->
  <label>Créditos anteriores</label>
  <textarea name="creditos" rows="4" placeholder="Proyectos destacados..."></textarea>
</div>

<!-- Términos y Submit -->
<div class="form-section">
  <label class="checkbox-label">
    <input type="checkbox" name="acepto_terminos" required>
    Acepto los <a href="/terminos" target="_blank">términos y condiciones</a>
  </label>

  <button type="submit" class="btn-primary">
    Crear mi cuenta
  </button>
</div>
```

### 4.6 Añadir Código Custom (Uploadcare + Condicionales)

**EN WEBFLOW → Page Settings → Custom Code → Before </body>:**

```html
<!-- Uploadcare Widget -->
<script>
  UPLOADCARE_PUBLIC_KEY = 'TU_UPLOADCARE_PUBLIC_KEY_AQUI';
  UPLOADCARE_LOCALE = 'es';
  UPLOADCARE_TABS = 'file camera';
</script>
<script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>

<!-- Script para mostrar/ocultar campos según rol -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  const radioTalento = document.getElementById('role-talento');
  const radioProductor = document.getElementById('role-productor');
  const seccionTalento = document.querySelector('.conditional-talento');
  const seccionProductor = document.querySelector('.conditional-productor');

  function actualizarFormulario() {
    if (radioTalento.checked) {
      seccionTalento.style.display = 'block';
      seccionProductor.style.display = 'none';
      // Hacer campos de talento requeridos
      seccionTalento.querySelectorAll('input[name="ubicacion"], input[name="headshot"]').forEach(input => {
        input.required = true;
      });
      // Quitar required de productor
      seccionProductor.querySelectorAll('input[required]').forEach(input => {
        input.required = false;
      });
    } else if (radioProductor.checked) {
      seccionTalento.style.display = 'none';
      seccionProductor.style.display = 'block';
      // Hacer campos de productor requeridos
      seccionProductor.querySelectorAll('input[name="empresa"]').forEach(input => {
        input.required = true;
      });
      // Quitar required de talento
      seccionTalento.querySelectorAll('input[required]').forEach(input => {
        input.required = false;
      });
    }
  }

  radioTalento.addEventListener('change', actualizarFormulario);
  radioProductor.addEventListener('change', actualizarFormulario);
});
</script>
```

### 4.7 Configurar Form Settings

```
1. Seleccionar el Form Block
2. Settings panel (derecha):
   - Form Name: "registro-castingfy"
   - Redirect on success: /gracias
   - Enable reCAPTCHA: Sí (recomendado)
```

### 4.8 Crear Página "Gracias" (/gracias)

```html
┌─────────────────────────────────────────┐
│  NAVBAR                                  │
├─────────────────────────────────────────┤
│                                          │
│  CENTERED MESSAGE                        │
│  ✅                                      │
│  ¡Gracias por registrarte!              │
│                                          │
│  Hemos recibido tu solicitud.           │
│  Te enviaremos un email de              │
│  confirmación en breve.                 │
│                                          │
│  Mientras tanto, síguenos en:           │
│  [Instagram] [Twitter] [LinkedIn]       │
│                                          │
│  [Volver al inicio]                     │
│                                          │
└─────────────────────────────────────────┘
```

✅ **Webflow listo**

---

## 5️⃣ CONFIGURAR ZAPIER (1 hora)

### 5.1 Crear Nuevo Zap

```
1. Zapier Dashboard → Create Zap
2. Nombre: "Registro Castingfy → Supabase"
```

### 5.2 TRIGGER: Webflow Form Submission

```
1. Choose App: "Webflow"
2. Event: "Form Submission"
3. Connect Webflow account
4. Configure:
   - Site: Castingfy MVP
   - Form: registro-castingfy
5. Test trigger (necesitas hacer un registro de prueba en Webflow)
6. Debería aparecer el último registro con todos los campos
```

### 5.3 ACTION 1: Guardar en form_submissions (backup)

```
1. Choose App: "Supabase"
2. Event: "Create Row"
3. Connect Supabase:
   - URL: https://xxxxx.supabase.co
   - API Key: tu service_role key (la secreta)
4. Configure:
   - Table: form_submissions
   - form_name: "registro-castingfy"
   - form_data: (mapear todo el objeto del form)
5. Test
```

### 5.4 ACTION 2: Crear usuario en tabla users

```
1. Choose App: "Supabase"
2. Event: "Create Row"
3. Configure:
   - Table: users
   - email: {{step1.email}}
   - role: {{step1.role}}
   - status: "pending"
4. Test
5. ⚠️ IMPORTANTE: Guardar el ID generado para próximos pasos
```

### 5.5 ACTION 3: Filter (solo si es Talento)

```
1. Choose App: "Filter by Zapier"
2. Configure:
   - Only continue if...
   - {{step1.role}} = "talento"
```

### 5.6 ACTION 4: Crear perfil de talento

```
1. Choose App: "Supabase"
2. Event: "Create Row"
3. Configure:
   - Table: talent_profiles
   - user_id: {{step2.id}} (ID del usuario creado)
   - stage_name: {{step1.nombre}}
   - bio: {{step1.bio}}
   - location: {{step1.ubicacion}}
   - age: {{step1.edad}}
   - gender: {{step1.genero}}
   - height: {{step1.altura}}
   - headshot_url: {{step1.headshot}}
   - reel_url: {{step1.reel}}
4. Test
```

### 5.7 ACTION 5: Filter (solo si es Productor)

```
1. Añadir nuevo path paralelo
2. Filter:
   - Only continue if...
   - {{step1.role}} = "productor"
```

### 5.8 ACTION 6: Crear perfil de productor

```
1. Choose App: "Supabase"
2. Event: "Create Row"
3. Configure:
   - Table: producer_profiles
   - user_id: {{step2.id}}
   - company_name: {{step1.empresa}}
   - project_types: {{step1.tipo_proyectos}}
   - website: {{step1.website}}
   - previous_credits: {{step1.creditos}}
4. Test
```

### 5.9 ACTION 7: Enviar email de bienvenida

```
1. Choose App: "Resend"
2. Event: "Send Email"
3. Connect Resend (API key)
4. Configure:
   - From: hola@castingfy.com (o tudominio@resend.dev)
   - To: {{step1.email}}
   - Subject: "¡Bienvenido a Castingfy! 🎬"
   - HTML: (ver template abajo)
5. Test
```

**Template de Email:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #6dcff6, #a78bfa); padding: 30px; text-align: center; color: white; }
    .content { padding: 30px; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>¡Bienvenido a Castingfy! 🎬</h1>
  </div>
  <div class="content">
    <p>Hola <strong>{{step1.nombre}}</strong>,</p>

    <p>Gracias por registrarte en Castingfy. Estamos emocionados de tenerte en nuestra comunidad.</p>

    <p>Tu perfil está siendo revisado por nuestro equipo. Te notificaremos cuando esté listo y puedas empezar a explorar oportunidades.</p>

    <p><strong>Próximos pasos:</strong></p>
    <ul>
      <li>Recibirás un email de confirmación cuando tu perfil esté verificado</li>
      <li>Podrás completar información adicional desde tu dashboard</li>
      <li>Te notificaremos cuando haya castings que encajen con tu perfil</li>
    </ul>

    <p>Mientras tanto, síguenos en redes sociales para estar al día:</p>
    <p>
      <a href="https://instagram.com/castingfy">Instagram</a> |
      <a href="https://twitter.com/castingfy">Twitter</a> |
      <a href="https://linkedin.com/company/castingfy">LinkedIn</a>
    </p>

    <p>¡Nos vemos pronto!<br>El equipo de Castingfy</p>
  </div>
  <div class="footer">
    <p>Castingfy - Tu casting, sin fricción</p>
    <p>Si no solicitaste este registro, ignora este email.</p>
  </div>
</body>
</html>
```

### 5.10 ACTION 8: Notificarte (Slack o Email)

```
1. Choose App: "Email by Zapier" o "Slack"
2. Event: "Send Email" / "Send Message"
3. Configure:
   - To: tu@email.com / #canal-registros
   - Subject/Message:
     "🎉 Nuevo registro en Castingfy

      Nombre: {{step1.nombre}}
      Email: {{step1.email}}
      Rol: {{step1.role}}
      Ubicación: {{step1.ubicacion}}

      Ver en Supabase: https://app.supabase.com/project/[tu-proyecto]/editor/users"
4. Test
```

### 5.11 Activar Zap

```
1. Review all steps
2. Turn ON the Zap
3. ✅ Zapier listo y corriendo
```

---

## 6️⃣ TESTING COMPLETO (45 minutos)

### 6.1 Test 1: Registro como Talento

```
1. Ir a tu Webflow preview: castingfy.webflow.io/registro
2. Rellenar formulario como Talento:
   - Email: talento-test@gmail.com
   - Nombre: Test Actor
   - Rol: Talento
   - Ubicación: Madrid, España
   - Subir foto de prueba
   - Subir video de prueba (opcional)
3. Submit

VERIFICAR:
✅ Redirige a /gracias
✅ Email de bienvenida recibido
✅ Registro en Supabase tabla users (role=talento)
✅ Registro en Supabase tabla talent_profiles
✅ URLs de Uploadcare guardadas correctamente
✅ Notificación recibida (Slack/Email)
```

### 6.2 Test 2: Registro como Productor

```
1. Ir a /registro
2. Rellenar como Productor:
   - Email: productor-test@gmail.com
   - Nombre: Producciones Test
   - Rol: Productor
   - Empresa: Test Productions S.L.
3. Submit

VERIFICAR:
✅ Todo igual que Test 1
✅ Registro en producer_profiles
```

### 6.3 Test 3: Validaciones

```
PROBAR:
1. Enviar form sin email → Error
2. Enviar sin seleccionar rol → Error
3. Talento sin foto → Error
4. Email duplicado → Ver qué pasa en Supabase
   (debería fallar por unique constraint)
```

### 6.4 Test 4: Responsive

```
1. Abrir /registro en móvil (o DevTools responsive)
2. Verificar:
   ✅ Form se ve bien
   ✅ Uploadcare funciona en móvil
   ✅ Radio buttons se ven claros
   ✅ Todo clickeable
```

### 6.5 Revisar Datos en Supabase

```
1. Supabase → Table Editor → users
2. Ver registros de prueba
3. Tabla talent_profiles → verificar relación con users
4. Tabla producer_profiles → igual
5. Eliminar registros de prueba si quieres
```

✅ **Testing completo**

---

## 7️⃣ DEPLOY Y DOMINIO (30 minutos)

### 7.1 Publish en Webflow

```
1. Webflow Designer → Publish button (arriba derecha)
2. Seleccionar: "Publish to castingfy.webflow.io"
3. Click "Publish to Selected Domains"
4. Esperar ~1 minuto
5. Probar: https://castingfy.webflow.io
```

### 7.2 Conectar Dominio castingfy.com (si ya lo tienes)

```
1. Webflow → Project Settings → Hosting → Add Custom Domain
2. Introducir: castingfy.com
3. Seguir instrucciones para añadir DNS records:

   En tu proveedor de dominio (ej. GoDaddy, Namecheap):
   - A Record: @ → 75.2.70.75
   - CNAME: www → proxy-ssl.webflow.com

4. Esperar propagación DNS (5-60 minutos)
5. En Webflow, marcar como "Default domain"
6. SSL se activa automáticamente (gratis con Webflow)
```

### 7.3 Configurar Redirects

```
1. Webflow → Hosting → Redirects
2. Añadir:
   - /waitlist → /registro (301)
   - /join → /registro (301)
```

### 7.4 Google Analytics

```
1. Webflow → Project Settings → Integrations
2. Pegar tu Measurement ID: G-XXXXXXXXXX
3. Publish
4. Verificar en GA4 Real-Time que funciona
```

✅ **DEPLOY COMPLETO - CASTINGFY ESTÁ LIVE! 🚀**

---

## 🎯 RESUMEN FINAL

Si todo salió bien, ahora tienes:

✅ Landing page en Webflow (castingfy.com)
✅ Formulario de registro funcional
✅ Upload de fotos y videos (Uploadcare)
✅ Base de datos real (Supabase PostgreSQL)
✅ Automatización completa (Zapier)
✅ Emails automáticos (Resend)
✅ Analytics (Google Analytics 4)
✅ Todo responsive y profesional

---

## 📊 NEXT STEPS (Semana 1)

1. **Monitorear registros** en Supabase
2. **Responder emails** de nuevos usuarios manualmente
3. **Crear contenido** para redes sociales
4. **Anunciar lanzamiento** en LinkedIn, Twitter
5. **Recopilar feedback** de primeros usuarios
6. **Empezar desarrollo** de plataforma real en paralelo

---

## 🆘 TROUBLESHOOTING

### Problema: Zapier no se dispara

**Solución:**
- Verificar que el Zap esté ON
- Hacer un registro de prueba
- Check Zap History para ver errores
- Verificar que Webflow form esté conectado

### Problema: No llegan emails

**Solución:**
- Verificar API key de Resend
- Check spam folder
- Ver logs en Resend Dashboard

### Problema: Error en Supabase

**Solución:**
- Verificar que usaste service_role key (no anon key)
- Check SQL schema correcto
- Ver logs en Supabase

### Problema: Uploadcare no funciona

**Solución:**
- Verificar public key en el código
- Check browser console para errores
- Probar con otro navegador

---

## 📞 SOPORTE

Si tienes problemas, avísame y te ayudo a debuggear en tiempo real.

**¡VAMOS A LANZAR ESTO HOY! 🚀**
