

-- Renommer les colonnes id métier si nécessaire
ALTER TABLE admin RENAME COLUMN id TO admin_id;

-- Supprimer temporairement les FK qui dépendent des PK
ALTER TABLE enrollment DROP CONSTRAINT IF EXISTS enrollment_student_id_fkey;
ALTER TABLE grade DROP CONSTRAINT IF EXISTS grade_student_id_fkey;
ALTER TABLE course DROP CONSTRAINT IF EXISTS course_teacher_id_fkey;

-- Modifier les PK et ajouter UNIQUE

-- Admin
ALTER TABLE admin DROP CONSTRAINT IF EXISTS admin_pkey;
ALTER TABLE admin ADD CONSTRAINT admin_user_id_pk PRIMARY KEY (user_id);
ALTER TABLE admin ADD CONSTRAINT admin_id_unique UNIQUE (admin_id);

-- Student
ALTER TABLE student DROP CONSTRAINT IF EXISTS student_pkey;
ALTER TABLE student ADD CONSTRAINT student_user_id_pk PRIMARY KEY (user_id);
ALTER TABLE student ADD CONSTRAINT student_registration_unique UNIQUE (registration_number);

-- Teacher
ALTER TABLE teacher DROP CONSTRAINT IF EXISTS teacher_pkey;
ALTER TABLE teacher ADD CONSTRAINT teacher_user_id_pk PRIMARY KEY (user_id);
ALTER TABLE teacher ADD CONSTRAINT teacher_matricule_unique UNIQUE (matricule_number);

-- Recréer les FK avec les bonnes colonnes

-- Enrollment
ALTER TABLE enrollment
    ADD CONSTRAINT enrollment_student_id_fkey
    FOREIGN KEY (student_id)
    REFERENCES student(registration_number)
    ON DELETE CASCADE;

-- Grade
ALTER TABLE grade
    ADD CONSTRAINT grade_student_id_fkey
    FOREIGN KEY (student_id)
    REFERENCES student(registration_number)
    ON DELETE CASCADE;

-- Course
ALTER TABLE course
    ADD CONSTRAINT course_teacher_id_fkey
    FOREIGN KEY (teacher_id)
    REFERENCES teacher(matricule_number)
    ON DELETE SET NULL;
