CREATE TABLE IF NOT EXISTS level (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS student_group (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

ALTER TABLE student RENAME COLUMN level to level_id;
ALTER TABLE student RENAME COLUMN "group" to group_id;

ALTER TABLE student ALTER COLUMN level_id TYPE UUID USING level_id::uuid;
ALTER TABLE student ALTER COLUMN group_id TYPE UUID USING group_id::uuid;

ALTER TABLE student ADD CONSTRAINT fk_level FOREIGN KEY (level_id) REFERENCES level(id) ON DELETE SET NULL;
ALTER TABLE student ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES student_group(id) ON DELETE SET NULL;