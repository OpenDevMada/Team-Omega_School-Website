-- 1. Créer le rôle
CREATE ROLE flyway_user WITH LOGIN PASSWORD 'School_user!Password';

-- 2. Créer la base et assigner la propriété
CREATE DATABASE school_db OWNER flyway_user;

-- 3. Connexion et droits
\c school_db postgres  -- se connecter à la base

-- Droits sur le schéma public
GRANT USAGE, CREATE ON SCHEMA public TO flyway_user;

-- Droits sur les tables et séquences existantes
GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON ALL TABLES IN SCHEMA public TO flyway_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO flyway_user;

-- Droits par défaut pour les futures tables et séquences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO flyway_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO flyway_user;
