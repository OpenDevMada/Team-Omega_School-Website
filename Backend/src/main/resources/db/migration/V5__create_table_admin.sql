CREATE TABLE IF NOT EXISTS admin(
    admin_id VARCHAR(50) UNIQUE,
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    permission VARCHAR(10) CHECK (permission IN ('FULL'))
);