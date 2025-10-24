CREATE TABLE IF NOT EXISTS teacher(
    matricule_number VARCHAR(50) UNIQUE,
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT
);