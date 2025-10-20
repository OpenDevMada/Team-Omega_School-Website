CREATE OR REPLACE FUNCTION check_user_role()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT role FROM users WHERE id = NEW.user_id) <> TG_ARGV[0] THEN
    RAISE EXCEPTION 'User % must have role % to be linked to % table',
                    NEW.user_id, TG_ARGV[0], TG_TABLE_NAME;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- pour la table STUDENT
CREATE TRIGGER student_role_check
BEFORE INSERT OR UPDATE ON student
FOR EACH ROW
EXECUTE FUNCTION check_user_role('STUDENT');

-- pour la table TEACHER
CREATE TRIGGER teacher_role_check
BEFORE INSERT OR UPDATE ON teacher
FOR EACH ROW
EXECUTE FUNCTION check_user_role('TEACHER');

-- pour la table ADMIN
CREATE TRIGGER admin_role_check
BEFORE INSERT OR UPDATE ON admin
FOR EACH ROW
EXECUTE FUNCTION check_user_role('ADMIN');

