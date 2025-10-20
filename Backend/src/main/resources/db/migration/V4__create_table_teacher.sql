CREATE TABLE IF NOT EXISTS teacher(
    matricule_number VARCHAR(50) PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    bio TEXT
);