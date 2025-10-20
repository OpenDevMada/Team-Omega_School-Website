CREATE TABLE IF NOT EXISTS grade(
    student_id VARCHAR(50) REFERENCES student(registration_number) ON DELETE CASCADE,
    course_id VARCHAR(50) REFERENCES course(title) ON DELETE CASCADE,
    value float CHECK( value >= 0),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    PRIMARY KEY (student_id, course_id)
);