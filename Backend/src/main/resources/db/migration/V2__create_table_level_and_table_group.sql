CREATE TABLE IF NOT EXISTS level (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS student_group (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);
