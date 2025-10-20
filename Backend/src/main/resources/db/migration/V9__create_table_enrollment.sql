CREATE TABLE IF NOT EXISTS enrollment(
    student_id VARCHAR(50) REFERENCES student(registration_number) ON DELETE CASCADE,
    course_id VARCHAR(50) REFERENCES course(title) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (student_id, course_id) 
);