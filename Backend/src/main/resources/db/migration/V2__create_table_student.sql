CREATE TABLE IF NOT EXISTS student(
    registration_number VARCHAR(50) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    level VARCHAR(10),
    "group" VARCHAR(10)
);

