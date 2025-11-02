CREATE OR REPLACE FUNCTION prevent_role_change_if_linked()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.role = 'STUDENT' AND NEW.role <> 'STUDENT' AND
     EXISTS (SELECT 1 FROM student WHERE user_id = OLD.id) THEN
    RAISE EXCEPTION 'Cannot change role of user % because they are linked to a student record', OLD.id;
  END IF;

  IF OLD.role = 'TEACHER' AND NEW.role <> 'TEACHER' AND
     EXISTS (SELECT 1 FROM teacher WHERE user_id = OLD.id) THEN
    RAISE EXCEPTION 'Cannot change role of user % because they are linked to a teacher record', OLD.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_invalid_role_change
BEFORE UPDATE OF role ON users
FOR EACH ROW
EXECUTE FUNCTION prevent_role_change_if_linked();
