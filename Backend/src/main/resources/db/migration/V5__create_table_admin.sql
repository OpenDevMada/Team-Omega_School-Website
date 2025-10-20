CREATE TABLE IF NOT EXISTS admin(
    id VARCHAR(50) PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    permission VARCHAR(10) CHECK (permission IN ('FULL', 'LIMITED', 'READ-ONLY'))
);