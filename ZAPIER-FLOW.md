# 🔄 Flujo de Zapier - Castingfy MVP

## Diagrama Visual del Flujo

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  TRIGGER: Webflow Form Submission (registro-castingfy)              │
│                                                                       │
│  Datos capturados:                                                   │
│  - email                                                             │
│  - nombre                                                            │
│  - role (talento/productor)                                         │
│  - ubicacion, edad, genero, altura, bio (si talento)                │
│  - empresa, tipo_proyectos, website, creditos (si productor)       │
│  - headshot (URL Uploadcare)                                        │
│  - reel (URL Uploadcare)                                            │
│                                                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1: Supabase - Insert Row                                      │
│  Table: form_submissions                                             │
│                                                                       │
│  ┌─────────────────────────────────────┐                            │
│  │ form_name: "registro-castingfy"     │                            │
│  │ form_data: {{trigger.all_fields}}   │ ← Todo el payload JSON    │
│  │ processed: false                    │                            │
│  └─────────────────────────────────────┘                            │
│                                                                       │
│  💡 Propósito: Backup de todos los datos por si falla algo          │
│                                                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: Supabase - Insert Row                                      │
│  Table: users                                                        │
│                                                                       │
│  ┌─────────────────────────────────────┐                            │
│  │ email: {{trigger.email}}            │                            │
│  │ role: {{trigger.role}}              │                            │
│  │ status: "pending"                   │                            │
│  └─────────────────────────────────────┘                            │
│                                                                       │
│  ⚠️ IMPORTANTE: Guardar el ID generado → Lo usaremos después        │
│  Output: id = 123e4567-e89b-12d3-a456-426614174000                  │
│                                                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                ↓
                    ┌───────────┴──────────┐
                    ↓                      ↓
      ┌─────────────────────┐    ┌─────────────────────┐
      │  PATH A: TALENTO    │    │  PATH B: PRODUCTOR  │
      └─────────────────────┘    └─────────────────────┘
                    ↓                      ↓

┌──────────────────────────────────┐ ┌──────────────────────────────────┐
│ STEP 3A: Filter by Zapier        │ │ STEP 3B: Filter by Zapier        │
│                                   │ │                                   │
│ Only continue if:                 │ │ Only continue if:                 │
│ {{step2.role}} = "talento"       │ │ {{step2.role}} = "productor"     │
└────────────┬─────────────────────┘ └────────────┬─────────────────────┘
             ↓                                     ↓

┌──────────────────────────────────┐ ┌──────────────────────────────────┐
│ STEP 4A: Supabase - Insert Row   │ │ STEP 4B: Supabase - Insert Row   │
│ Table: talent_profiles            │ │ Table: producer_profiles          │
│                                   │ │                                   │
│ ┌───────────────────────────────┐│ │ ┌───────────────────────────────┐│
│ │ user_id: {{step2.id}}         ││ │ │ user_id: {{step2.id}}         ││
│ │ stage_name: {{trigger.nombre}}││ │ │ company_name: {{trigger.      ││
│ │ bio: {{trigger.bio}}          ││ │ │                empresa}}      ││
│ │ location: {{trigger.ubicacion││ │ │ project_types: {{trigger.     ││
│ │               }}               ││ │ │              tipo_proyectos}} ││
│ │ age: {{trigger.edad}}         ││ │ │ website: {{trigger.website}}  ││
│ │ gender: {{trigger.genero}}    ││ │ │ previous_credits:             ││
│ │ height: {{trigger.altura}}    ││ │ │   {{trigger.creditos}}        ││
│ │ headshot_url: {{trigger.      ││ │ └───────────────────────────────┘│
│ │                headshot}}     ││ │                                   │
│ │ reel_url: {{trigger.reel}}    ││ │                                   │
│ └───────────────────────────────┘│ │                                   │
└────────────┬─────────────────────┘ └────────────┬─────────────────────┘
             └──────────┬────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 5: Resend - Send Email                                        │
│                                                                       │
│  ┌─────────────────────────────────────┐                            │
│  │ From: hola@castingfy.com            │                            │
│  │       (o tudominio@resend.dev)      │                            │
│  │ To: {{trigger.email}}               │                            │
│  │ Subject: "¡Bienvenido a Castingfy! │                            │
│  │           🎬"                        │                            │
│  │ HTML: [Ver template abajo]          │                            │
│  └─────────────────────────────────────┘                            │
│                                                                       │
│  Variables personalizadas:                                           │
│  - {{trigger.nombre}} → Nombre del usuario                          │
│  - {{trigger.role}} → Para mensaje personalizado                    │
│                                                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 6: Email by Zapier / Slack - Notificarte                      │
│                                                                       │
│  ┌─────────────────────────────────────┐                            │
│  │ To: tu@email.com                    │                            │
│  │ Subject: "🎉 Nuevo registro"        │                            │
│  │                                      │                            │
│  │ Body:                                │                            │
│  │ Nuevo registro en Castingfy         │                            │
│  │                                      │                            │
│  │ Nombre: {{trigger.nombre}}          │                            │
│  │ Email: {{trigger.email}}            │                            │
│  │ Rol: {{trigger.role}}               │                            │
│  │ Ubicación: {{trigger.ubicacion}}    │                            │
│  │                                      │                            │
│  │ Ver perfil en Supabase:              │                            │
│  │ https://app.supabase.com/...        │                            │
│  └─────────────────────────────────────┘                            │
│                                                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                ↓
                              ✅ FIN
```

---

## 📋 Configuración Paso a Paso en Zapier

### PASO 1: Crear el Zap

```
1. Login en Zapier
2. Click "Create Zap"
3. Nombre: "Registro Castingfy → Supabase + Email"
```

---

### TRIGGER: Webflow Form Submission

**App:** Webflow
**Event:** Form Submission

**Configuración:**
1. Connect your Webflow account
2. Site: Selecciona "Castingfy MVP"
3. Form: Selecciona "registro-castingfy"

**Test Trigger:**
- Necesitas hacer un registro de prueba en Webflow primero
- Click "Test trigger"
- Deberías ver todos los campos del formulario

**Ejemplo de datos que recibirás:**
```json
{
  "email": "actor@test.com",
  "nombre": "Ana García",
  "role": "talento",
  "ubicacion": "Madrid, España",
  "edad": "28",
  "genero": "mujer",
  "altura": "165",
  "bio": "Actriz profesional con 5 años de experiencia",
  "headshot": "https://ucarecdn.com/xxx/photo.jpg",
  "reel": "https://ucarecdn.com/yyy/video.mp4"
}
```

---

### STEP 1: Backup en form_submissions

**App:** Supabase
**Action:** Create Row

**Configuración:**
1. Connect Supabase:
   - URL: `https://xxxxx.supabase.co`
   - API Key: Tu **service_role** key (⚠️ la secreta, no la anon)

2. Table: `form_submissions`

3. Row Data:
   ```
   form_name: registro-castingfy
   form_data: {{trigger.all_fields}} ← Esto captura TODO el payload
   processed: false
   ```

4. Test Step
   - Debería crear una fila en Supabase
   - Ve a Supabase → Table Editor → form_submissions para verificar

---

### STEP 2: Crear usuario

**App:** Supabase
**Action:** Create Row

**Configuración:**
1. Same Supabase connection

2. Table: `users`

3. Row Data:
   ```
   email: {{1. trigger.email}}
   role: {{1. trigger.role}}
   status: pending
   ```

   ⚠️ **No incluir created_at ni updated_at** (se generan automáticamente)

4. Test Step
   - Crear fila de prueba
   - ✅ **IMPORTANTE:** Copiar el `id` generado (UUID)
   - Lo necesitarás para los siguientes pasos

**Ejemplo de output:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "actor@test.com",
  "role": "talento",
  "status": "pending",
  "created_at": "2025-01-10T12:00:00Z"
}
```

---

### PATH A: Para Talentos

#### STEP 3A: Filter

**App:** Filter by Zapier

**Configuración:**
```
Only continue if...
  {{2. Create Row in Supabase.role}} = talento
```

**Test:**
- Si tu test data es talento → continúa
- Si es productor → se detiene aquí (esto es correcto)

---

#### STEP 4A: Crear perfil de talento

**App:** Supabase
**Action:** Create Row

**Configuración:**
1. Table: `talent_profiles`

2. Row Data:
   ```
   user_id: {{2. Create Row in Supabase.id}}
   stage_name: {{1. trigger.nombre}}
   bio: {{1. trigger.bio}}
   location: {{1. trigger.ubicacion}}
   age: {{1. trigger.edad}}
   gender: {{1. trigger.genero}}
   height: {{1. trigger.altura}}
   headshot_url: {{1. trigger.headshot}}
   reel_url: {{1. trigger.reel}}
   ```

   💡 **Campos opcionales:** Si algún campo está vacío, Zapier enviará `null` (está bien)

3. Test Step
   - Verificar en Supabase → talent_profiles
   - Debe estar relacionado con el user_id correcto

---

### PATH B: Para Productores

(En paralelo al Path A, crea estos steps)

#### STEP 3B: Filter

**App:** Filter by Zapier

**Configuración:**
```
Only continue if...
  {{2. Create Row in Supabase.role}} = productor
```

---

#### STEP 4B: Crear perfil de productor

**App:** Supabase
**Action:** Create Row

**Configuración:**
1. Table: `producer_profiles`

2. Row Data:
   ```
   user_id: {{2. Create Row in Supabase.id}}
   company_name: {{1. trigger.empresa}}
   description: {{1. trigger.bio}}  ← Si tienes este campo
   website: {{1. trigger.website}}
   project_types: {{1. trigger.tipo_proyectos}}
   previous_credits: {{1. trigger.creditos}}
   ```

3. Test Step

---

### STEP 5: Enviar Email (se ejecuta para ambos paths)

**App:** Resend
**Action:** Send Email

**Configuración:**
1. Connect Resend:
   - API Key: `re_xxxxxxxxxx` (de tu dashboard Resend)

2. Email Data:
   ```
   From: hola@castingfy.com
         (o si no tienes dominio: tudominio@resend.dev)

   To: {{1. trigger.email}}

   Subject: ¡Bienvenido a Castingfy! 🎬

   HTML: [ver abajo]
   ```

**Template HTML completo:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      margin: 20px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #6dcff6 0%, #a78bfa 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: white;
      font-size: 28px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #6dcff6;
      font-size: 20px;
      margin-top: 0;
    }
    .content p {
      margin: 16px 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #6dcff6 0%, #a78bfa 100%);
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      color: #6dcff6;
      text-decoration: none;
      margin: 0 10px;
    }
    ul {
      padding-left: 20px;
    }
    ul li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Bienvenido a Castingfy! 🎬</h1>
    </div>

    <div class="content">
      <p>Hola <strong>{{1. trigger.nombre}}</strong>,</p>

      <p>¡Gracias por unirte a Castingfy! Estamos emocionados de tenerte en nuestra comunidad de profesionales del casting.</p>

      <h2>✅ Tu registro se ha completado correctamente</h2>

      <p>Tu perfil está siendo revisado por nuestro equipo. Te notificaremos cuando esté verificado y listo para usar.</p>

      <p><strong>Próximos pasos:</strong></p>
      <ul>
        <li>Recibirás un email cuando tu perfil esté verificado (1-2 días hábiles)</li>
        <li>Podrás acceder a tu dashboard para completar información adicional</li>
        <li>Te notificaremos cuando haya oportunidades que encajen contigo</li>
      </ul>

      <div style="text-align: center;">
        <a href="https://castingfy.com" class="cta-button">Volver a Castingfy</a>
      </div>

      <p><strong>Mientras tanto:</strong></p>
      <p>Síguenos en redes sociales para estar al día de todas las novedades:</p>

      <div class="social-links">
        <a href="https://instagram.com/castingfy" target="_blank">Instagram</a> •
        <a href="https://twitter.com/castingfy" target="_blank">Twitter</a> •
        <a href="https://linkedin.com/company/castingfy" target="_blank">LinkedIn</a>
      </div>

      <p>Si tienes alguna pregunta, responde a este email y te ayudaremos encantados.</p>

      <p>¡Nos vemos pronto! 🚀<br>
      <strong>El equipo de Castingfy</strong></p>
    </div>

    <div class="footer">
      <p><strong>Castingfy</strong> - Tu casting, sin fricción</p>
      <p>Madrid, España</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        Si no solicitaste este registro, puedes ignorar este email.
      </p>
    </div>
  </div>
</body>
</html>
```

3. Test Step
   - Check tu email
   - Debería llegar en ~10 segundos

---

### STEP 6: Notificarte a ti

**App:** Email by Zapier (o Slack si prefieres)

**Configuración con Email:**

```
To: tu@email.com
Subject: 🎉 Nuevo registro en Castingfy

Body:
¡Nuevo registro recibido!

👤 Nombre: {{1. trigger.nombre}}
📧 Email: {{1. trigger.email}}
🎭 Rol: {{1. trigger.role}}
📍 Ubicación: {{1. trigger.ubicacion}}
📅 Fecha: {{2. Create Row in Supabase.created_at}}

Ver perfil completo:
https://app.supabase.com/project/[TU-PROJECT-ID]/editor/users?filter=email%3Deq%3D{{1. trigger.email}}

---
Datos completos del formulario:
{{1. trigger.all_fields}}
```

**Configuración con Slack:**

```
Channel: #registros-castingfy
Message:
🎉 *Nuevo registro en Castingfy*

*Nombre:* {{1. trigger.nombre}}
*Email:* {{1. trigger.email}}
*Rol:* {{1. trigger.role}}
*Ubicación:* {{1. trigger.ubicacion}}

<https://app.supabase.com/project/xxx/editor/users|Ver en Supabase>
```

---

## ✅ Checklist de Activación

Antes de activar el Zap:

- [ ] Todos los steps configurados correctamente
- [ ] Testeado cada step con datos reales
- [ ] Email de bienvenida se ve bien (sin errores de formato)
- [ ] Verificado en Supabase que los datos se guardan correctamente
- [ ] Relaciones user → talent_profile / producer_profile funcionan
- [ ] Notificación a ti llega correctamente

**Activar Zap:**
```
1. Review all steps
2. Click "Publish" (botón arriba a la derecha)
3. Turn ON
```

---

## 🧪 Testing del Zap Completo

### Test 1: Talento

```
1. Ir a tu Webflow preview
2. Ir a /registro
3. Rellenar como Talento:
   - Email: test-actor-1@gmail.com
   - Nombre: Test Actor
   - Rol: Talento
   - Ubicación: Barcelona, España
   - Edad: 25
   - Género: Mujer
   - Altura: 168
   - Bio: "Actriz con experiencia en teatro"
   - Subir foto de prueba
   - Subir video de prueba
4. Submit

VERIFICAR:
✅ Redirige a /gracias
✅ Email recibido en test-actor-1@gmail.com
✅ Notificación recibida en tu email/Slack
✅ En Supabase:
   - users: 1 fila con email test-actor-1@gmail.com, role=talento
   - talent_profiles: 1 fila con todos los datos
   - form_submissions: 1 fila con payload completo
✅ En Zapier:
   - Zap History muestra ejecución exitosa (todos los steps verdes)
```

### Test 2: Productor

```
Mismo proceso pero con:
- Email: test-producer-1@gmail.com
- Rol: Productor
- Empresa: Test Productions
- Tipo proyectos: Cine, Publicidad

VERIFICAR:
✅ Todo igual
✅ producer_profiles tiene la fila
✅ talent_profiles NO tiene fila (correcto)
```

### Test 3: Email duplicado

```
Intentar registrar mismo email dos veces

ESPERADO:
❌ Zapier falla en Step 2 (users)
   Error: duplicate key value violates unique constraint "users_email_key"

ACCIÓN:
- Está bien que falle (protección contra duplicados)
- En el futuro, añadir validación en Webflow
```

---

## 📊 Monitoreo del Zap

### Ver ejecuciones:

```
1. Zapier Dashboard → Zaps
2. Click en "Registro Castingfy..."
3. Tab "Zap History"
4. Ver todas las ejecuciones:
   - ✅ Verde = Success
   - ⚠️ Amarillo = Filtered (normal si el path no aplica)
   - ❌ Rojo = Error (revisar logs)
```

### Errores comunes y soluciones:

| Error | Causa | Solución |
|-------|-------|----------|
| `401 Unauthorized` | API key incorrecta | Verificar service_role key en Supabase |
| `duplicate key` | Email ya existe | Normal, el usuario ya se registró |
| `null value in column` | Campo required vacío | Verificar que Webflow envía todos los campos |
| `relation does not exist` | Tabla no existe | Verificar SQL schema ejecutado correctamente |
| `Task limit exceeded` | >100 tasks en plan Free | Upgrade a Zapier Starter |

---

## 🚀 ¡Listo para Producción!

Con esto configurado, tu MVP está completamente funcional y automatizado.

**Flujo completo:**
Usuario registra → Zapier procesa → Datos en Supabase → Email enviado → Tú notificado

**Todo en tiempo real, sin tocar código backend** ✨

---

## 📈 Próximos Pasos

Cuando tengas los primeros registros:

1. **Exportar datos de Supabase** (si necesitas Excel/CSV)
2. **Crear vistas personalizadas** en Supabase para análisis
3. **Configurar Retool** para dashboard de admin visual
4. **Añadir más automatizaciones** (ej: enviar recordatorios a usuarios pending)

¡Cualquier duda, avísame! 🚀
