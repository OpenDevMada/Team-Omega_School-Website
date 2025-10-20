CREATE TABLE IF NOT EXISTS course(
    id UUID DEFAULT gen_random_uuid(),
    title VARCHAR(50) PRIMARY KEY, 
    teacher_id VARCHAR(50) REFERENCES teacher(matricule_number) ON DELETE SET NULL,
    description TEXT, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);