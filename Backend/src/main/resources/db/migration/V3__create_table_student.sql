CREATE TABLE IF NOT EXISTS student(
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    registration_number VARCHAR(50) UNIQUE,
    level_id UUID REFERENCES level(id) ON DELETE SET NULL,
    group_id UUID REFERENCES student_group(id) ON DELETE SET NULL
);

