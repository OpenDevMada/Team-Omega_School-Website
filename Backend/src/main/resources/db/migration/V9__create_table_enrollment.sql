CREATE TABLE IF NOT EXISTS enrollment(
    student_id UUID REFERENCES student(user_id) ON DELETE CASCADE,
    course_id UUID REFERENCES course(course_id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (student_id, course_id) 
);