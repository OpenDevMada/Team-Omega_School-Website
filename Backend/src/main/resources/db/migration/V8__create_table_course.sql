CREATE TABLE IF NOT EXISTS course(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) UNIQUE, 
    teacher_id UUID REFERENCES teacher(user_id) ON DELETE SET NULL,
    description TEXT, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);