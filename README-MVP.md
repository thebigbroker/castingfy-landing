# 🎬 Castingfy MVP - Resumen Ejecutivo

**Versión:** 1.0 MVP
**Fecha:** 10 Enero 2025
**Objetivo:** Validar el mercado con registro de usuarios funcional

---

## 📦 ¿Qué tienes en esta carpeta?

```
/castingfy-landing/
│
├── index.html              # Landing page estática (base)
├── styles.css              # Estilos de la landing
├── script.js               # Scripts de la landing
│
├── supabase-schema.sql     # Schema de base de datos (copiar/pegar en Supabase)
├── SETUP-GUIDE.md          # 📘 GUÍA COMPLETA paso a paso
├── ZAPIER-FLOW.md          # 🔄 Diagrama y configuración de Zapier
└── README-MVP.md           # 📄 Este archivo
```

---

## 🎯 Objetivo del MVP

**Lanzar HOY** una landing page funcional donde:

✅ Usuarios pueden **registrarse** como Talento o Productor
✅ Subir **fotos** (headshots) y **videos** (reels)
✅ Datos se guardan en **base de datos real** (PostgreSQL)
✅ Reciben **email de bienvenida** automático
✅ Tú recibes **notificación** de cada registro
✅ Todo **sin escribir código backend**

---

## 🏗️ Arquitectura Técnica

```
┌─────────────┐
│   USUARIO   │
└──────┬──────┘
       │
       ↓
┌──────────────────────────────────────┐
│  WEBFLOW                              │
│  - Landing page profesional          │
│  - Formulario de registro multi-paso │
│  - Responsive y SEO optimizado       │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│  UPLOADCARE                           │
│  - Upload de fotos/videos            │
│  - CDN global                        │
│  - Crop de imágenes                  │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│  ZAPIER                               │
│  - Automatización sin código         │
│  - Lógica condicional                │
│  - 6 pasos configurados              │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│  SUPABASE (PostgreSQL)                │
│  - Base de datos real                │
│  - 4 tablas estructuradas            │
│  - API automática                    │
│  - Auth integrado (para después)     │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│  RESEND                               │
│  - Emails transaccionales            │
│  - Templates HTML                    │
│  - Tracking de apertura              │
└──────────────────────────────────────┘
```

---

## 💰 Costos Mensuales

### Plan Free (MVP - 0-100 usuarios/mes)

| Servicio | Costo | Límites |
|----------|-------|---------|
| **Webflow** | €0 | Dominio .webflow.io |
| **Supabase** | €0 | 500MB DB, 1GB storage |
| **Uploadcare** | €0 | 3,000 uploads/mes |
| **Zapier** | €0 | 100 tasks/mes |
| **Resend** | €0 | 3,000 emails/mes |
| **Google Analytics** | €0 | Ilimitado |
| **TOTAL** | **€0/mes** | ✅ Perfecto para validar |

### Plan Growth (100-500 usuarios/mes)

| Servicio | Costo | Límites |
|----------|-------|---------|
| **Webflow** | €14/mes | Dominio custom |
| **Supabase** | €0 | Aún dentro del free tier |
| **Uploadcare** | €25/mes | 10,000 uploads/mes |
| **Zapier** | €20/mes | 750 tasks/mes |
| **Resend** | €0 | Aún dentro del free tier |
| **TOTAL** | **€59/mes** | Para primeros clientes |

---

## 📊 Base de Datos (Supabase)

### Tablas Creadas

#### 1. `users`
Tabla principal de usuarios

```sql
- id (UUID, PK)
- email (unique)
- role ('talento' | 'productor')
- status ('pending' | 'verified' | 'rejected')
- created_at, updated_at
```

#### 2. `talent_profiles`
Perfiles de talento (actores, modelos)

```sql
- id (UUID, PK)
- user_id (FK → users)
- stage_name, bio, location
- age, gender, height, weight
- headshot_url, reel_url
- languages[], special_skills
- is_minor, parent_consent_verified
```

#### 3. `producer_profiles`
Perfiles de productores/agencias

```sql
- id (UUID, PK)
- user_id (FK → users)
- company_name, description
- website, project_types[]
- previous_credits
- is_verified
```

#### 4. `form_submissions`
Backup de formularios

```sql
- id (UUID, PK)
- form_name
- form_data (JSONB)
- processed
```

---

## 🚀 Proceso de Lanzamiento

### Tiempo estimado: **6-8 horas**

#### Fase 1: Setup de Cuentas (30 min)
- [ ] Crear cuenta Supabase
- [ ] Crear cuenta Uploadcare
- [ ] Crear cuenta Webflow
- [ ] Crear cuenta Zapier
- [ ] Crear cuenta Resend

#### Fase 2: Base de Datos (15 min)
- [ ] Copiar `supabase-schema.sql`
- [ ] Pegar en Supabase SQL Editor
- [ ] Ejecutar y verificar tablas

#### Fase 3: Webflow (3 horas)
- [ ] Crear proyecto
- [ ] Migrar landing page
- [ ] Crear formulario de registro
- [ ] Integrar Uploadcare
- [ ] Testing responsive

#### Fase 4: Zapier (1 hora)
- [ ] Configurar trigger (Webflow)
- [ ] Configurar actions (Supabase + Email)
- [ ] Testing con datos reales

#### Fase 5: Testing (45 min)
- [ ] Registro como Talento
- [ ] Registro como Productor
- [ ] Verificar emails
- [ ] Verificar datos en Supabase

#### Fase 6: Deploy (30 min)
- [ ] Publicar en Webflow
- [ ] Conectar dominio (opcional)
- [ ] Google Analytics
- [ ] ✅ **LIVE!**

---

## 📖 Guías Disponibles

### 1. `SETUP-GUIDE.md` (PRINCIPAL)
📘 **Guía completa paso a paso** de todo el proceso.

**Contenido:**
- Checklist completo
- Instrucciones detalladas de cada servicio
- Screenshots y ejemplos
- Troubleshooting

**Empieza aquí** → Sigue cada sección en orden

---

### 2. `ZAPIER-FLOW.md`
🔄 **Diagrama visual del flujo de Zapier**

**Contenido:**
- Diagrama ASCII del flujo completo
- Configuración de cada step
- Template de email
- Testing y debugging

**Úsalo cuando** → Estés configurando Zapier

---

### 3. `supabase-schema.sql`
💾 **Schema de base de datos**

**Contenido:**
- CREATE TABLE statements
- Índices
- Triggers
- Políticas RLS
- Comentarios explicativos

**Úsalo cuando** → Estés en Supabase SQL Editor

---

## ✅ Checklist de Lanzamiento

### Pre-lanzamiento

- [ ] Todas las cuentas creadas
- [ ] Base de datos configurada
- [ ] Webflow publicado
- [ ] Zapier activado y testeado
- [ ] Emails funcionando
- [ ] Analytics configurado

### Post-lanzamiento (Día 1)

- [ ] Anunciar en redes sociales
- [ ] Post en LinkedIn personal
- [ ] Email a contactos relevantes
- [ ] Registrar en Product Hunt (opcional)
- [ ] Monitorear Zapier History
- [ ] Responder a primeros registros

### Semana 1

- [ ] Revisar analytics diarios
- [ ] Contactar primeros 10 usuarios
- [ ] Recopilar feedback
- [ ] Ajustar copy si es necesario
- [ ] Empezar desarrollo plataforma real

---

## 📊 Métricas de Éxito (MVP)

### Objetivos Semana 1
- 20-50 registros
- 60%+ talentos, 40%- productores
- 70%+ completan upload de foto
- <30% bounce rate en landing

### Objetivos Mes 1
- 100-200 registros
- 10+ productores verificados
- 5+ talentos con reel subido
- Feedback positivo de usuarios

---

## 🔄 Roadmap Post-MVP

### Semana 2-4: Backend Real

```
1. Montar Next.js + PostgreSQL
2. Migrar usuarios de Supabase → DB final
3. Sistema de autenticación (NextAuth)
4. Dashboard básico (ver perfil)
```

### Mes 2: Features Core

```
1. Publicación de castings (productores)
2. Búsqueda de castings (talentos)
3. Sistema de aplicaciones
4. Mensajería básica
```

### Mes 3: Suscripciones

```
1. Integración Stripe
2. Planes Free/Pro
3. Paywall para talentos
```

### Mes 4+: Plataforma Completa

```
1. Búsqueda avanzada + filtros
2. Application Manager
3. Talent Database
4. Self-tapes
5. Pagos P2P
```

---

## 🆘 Soporte y Recursos

### Documentación Oficial

- **Webflow:** https://university.webflow.com
- **Supabase:** https://supabase.com/docs
- **Uploadcare:** https://uploadcare.com/docs
- **Zapier:** https://zapier.com/help
- **Resend:** https://resend.com/docs

### Comunidades

- **Webflow:** https://forum.webflow.com
- **Supabase:** https://github.com/supabase/supabase/discussions
- **r/nocode:** https://reddit.com/r/nocode

---

## 💡 Tips y Best Practices

### Durante el MVP

1. **No pierdas tiempo en detalles** - La perfección es enemiga del lanzamiento
2. **Responde rápido a usuarios** - La atención personalizada es tu ventaja
3. **Documenta feedback** - Usa Notion/Airtable para trackear sugerencias
4. **Itera rápido** - Webflow te permite cambiar cosas en minutos

### Optimización

1. **SEO básico** - Títulos, meta descriptions, headings correctos
2. **Loading speed** - Comprime imágenes, usa CDN de Uploadcare
3. **Mobile first** - 70% del tráfico será móvil
4. **Analytics** - Configura eventos custom (no solo pageviews)

### Seguridad

1. **No compartir service_role key** - Nunca en frontend
2. **Validar emails** - Evita spam con reCAPTCHA
3. **Backups** - Supabase hace backups automáticos
4. **GDPR** - Añade política de privacidad y términos

---

## 🎉 ¡Estás Listo!

Tienes todo lo necesario para lanzar tu MVP **HOY**.

### Próximo Paso

```bash
1. Abrir SETUP-GUIDE.md
2. Empezar por "1️⃣ CREAR CUENTAS"
3. Seguir cada paso en orden
4. En 6-8 horas → Castingfy está LIVE ✅
```

### Cuando estés live

1. **Tweet:** "🎬 Acabamos de lanzar Castingfy, la plataforma de castings pensada para el mercado español. Únete a la beta: castingfy.com"

2. **LinkedIn Post:** [Más elaborado, storytelling de por qué creaste esto]

3. **Email a tu red:** Contactos de la industria audiovisual

4. **Avísame:** Para celebrar 🎉

---

## 📞 Contacto

¿Dudas durante el setup? Avísame y te ayudo en tiempo real.

**¡A lanzar! 🚀**
