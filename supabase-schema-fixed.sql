-- ============================================================================
-- CASTINGFY MVP - SUPABASE DATABASE SCHEMA (FIXED)
-- ============================================================================
-- Versión: 1.1 (Corregido)
-- Fecha: 2025-01-10
--
-- INSTRUCCIONES:
-- 1. Ir a Supabase Dashboard → SQL Editor
-- 2. Copiar y pegar TODO este archivo
-- 3. Hacer clic en "Run"
-- 4. Verificar en Table Editor que se crearon las tablas
--
-- ============================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLA: users
-- Tabla principal de usuarios (tanto Talento como Productores)
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('talento', 'productor')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas por email
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ============================================================================
-- TABLA: talent_profiles
-- Perfiles de talento (actores, modelos, creadores)
-- ============================================================================
CREATE TABLE talent_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,

  -- Información básica
  stage_name TEXT NOT NULL,
  bio TEXT,
  location TEXT, -- "Madrid, España"

  -- Información física
  age INTEGER,
  gender TEXT CHECK (gender IN ('hombre', 'mujer', 'no-binario', 'prefiero-no-decir')),
  height INTEGER, -- en centímetros
  weight INTEGER, -- en kilogramos

  -- Media
  headshot_url TEXT, -- URL de Uploadcare
  reel_url TEXT,     -- URL de Uploadcare (video)

  -- Habilidades (arrays de texto)
  languages TEXT[], -- ['Español', 'Inglés', 'Francés']
  special_skills TEXT, -- Texto libre: "Canto, baile, acrobacia, conducir moto..."

  -- Experiencia
  experience TEXT, -- Texto libre para el MVP

  -- Metadata
  is_minor BOOLEAN DEFAULT FALSE,
  parent_consent_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_talent_user_id ON talent_profiles(user_id);
CREATE INDEX idx_talent_location ON talent_profiles(location);
CREATE INDEX idx_talent_created_at ON talent_profiles(created_at DESC);

-- ============================================================================
-- TABLA: producer_profiles
-- Perfiles de productores, agencias y directores de casting
-- ============================================================================
CREATE TABLE producer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,

  -- Información de empresa
  company_name TEXT NOT NULL,
  description TEXT,
  website TEXT,

  -- Tipos de proyectos (array)
  project_types TEXT[], -- ['Cine', 'TV', 'Teatro', 'Publicidad']

  -- Créditos y experiencia
  previous_credits TEXT, -- Texto libre para el MVP

  -- Metadata
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_producer_user_id ON producer_profiles(user_id);
CREATE INDEX idx_producer_created_at ON producer_profiles(created_at DESC);

-- ============================================================================
-- TABLA: form_submissions (para debug y backup)
-- Guarda el payload crudo del formulario de Webflow
-- ============================================================================
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_name TEXT,
  form_data JSONB, -- Todo el payload del formulario
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX idx_submissions_processed ON form_submissions(processed);

-- ============================================================================
-- FUNCIONES ÚTILES
-- ============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_talent_profiles_updated_at
    BEFORE UPDATE ON talent_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_producer_profiles_updated_at
    BEFORE UPDATE ON producer_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Por ahora lo dejamos permisivo para el MVP
-- Cuando desarrolles el backend, activa políticas más estrictas
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE producer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para desarrollo (CAMBIAR EN PRODUCCIÓN)
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON talent_profiles FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON producer_profiles FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON form_submissions FOR ALL USING (true);

-- ============================================================================
-- VIEWS ÚTILES (para consultas rápidas)
-- ============================================================================

-- Vista: Todos los talentos con info de usuario
CREATE OR REPLACE VIEW v_talent_full AS
SELECT
  u.id as user_id,
  u.email,
  u.status as user_status,
  u.created_at as registered_at,
  tp.id as profile_id,
  tp.stage_name,
  tp.bio,
  tp.location,
  tp.age,
  tp.gender,
  tp.height,
  tp.weight,
  tp.headshot_url,
  tp.reel_url,
  tp.languages,
  tp.special_skills,
  tp.experience,
  tp.is_minor,
  tp.parent_consent_verified
FROM users u
INNER JOIN talent_profiles tp ON u.id = tp.user_id
WHERE u.role = 'talento';

-- Vista: Todos los productores con info de usuario
CREATE OR REPLACE VIEW v_producer_full AS
SELECT
  u.id as user_id,
  u.email,
  u.status as user_status,
  u.created_at as registered_at,
  pp.id as profile_id,
  pp.company_name,
  pp.description,
  pp.website,
  pp.project_types,
  pp.previous_credits,
  pp.is_verified
FROM users u
INNER JOIN producer_profiles pp ON u.id = pp.user_id
WHERE u.role = 'productor';

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================
