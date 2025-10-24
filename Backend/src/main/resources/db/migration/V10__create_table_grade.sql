CREATE TABLE IF NOT EXISTS grade(
    student_id UUID REFERENCES student(user_id) ON DELETE CASCADE,
    course_id UUID REFERENCES course(id) ON DELETE CASCADE,
    value float CHECK( value >= 0),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    PRIMARY KEY (student_id, course_id)
);