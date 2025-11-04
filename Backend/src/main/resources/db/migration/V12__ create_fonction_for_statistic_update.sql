CREATE OR REPLACE FUNCTION update_monthly_statistics()
RETURNS VOID AS $$
DECLARE
  month_label TEXT := TO_CHAR(NOW(), 'YYYY-MM');
  month_start DATE := DATE_TRUNC('month', NOW());
  month_end DATE := (DATE_TRUNC('month', NOW()) + INTERVAL '1 month - 1 day')::DATE;
BEGIN
  INSERT INTO statistic (
    period_label, period_start, period_end,
    total_students, total_teachers, total_courses
  )
  VALUES (
    month_label, month_start, month_end,
    (SELECT COUNT(*) FROM student),
    (SELECT COUNT(*) FROM teacher),
    (SELECT COUNT(*) FROM course)
  )
  ON CONFLICT (period_label)
  DO UPDATE SET
    total_students = EXCLUDED.total_students,
    total_teachers = EXCLUDED.total_teachers,
    total_courses  = EXCLUDED.total_courses,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_monthly_statistics_trigger()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_monthly_statistics();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER student_monthly_update
AFTER INSERT OR DELETE ON student
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_monthly_statistics_trigger();

CREATE TRIGGER teacher_monthly_update
AFTER INSERT OR DELETE ON teacher
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_monthly_statistics_trigger();

CREATE TRIGGER course_monthly_update
AFTER INSERT OR DELETE ON course
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_monthly_statistics_trigger();