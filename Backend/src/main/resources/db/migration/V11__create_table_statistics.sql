CREATE TABLE IF NOT EXISTS statistic (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    period_label VARCHAR(7) NOT NULL,               -- ex: '2025-10'
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_students INTEGER DEFAULT 0,
    total_teachers INTEGER DEFAULT 0,
    total_courses INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (period_label)
);