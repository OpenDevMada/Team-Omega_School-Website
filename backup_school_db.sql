--
-- PostgreSQL database dump
--

\restrict ekNiqg0pQxZLhmjIGilzXRbfkogS7GiwStv8gI0ajJzcuT0lDuyuwF8JZNLc8Yp

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: check_user_role(); Type: FUNCTION; Schema: public; Owner: flyway_user
--

CREATE FUNCTION public.check_user_role() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF (SELECT role FROM users WHERE id = NEW.user_id) <> TG_ARGV[0] THEN
    RAISE EXCEPTION 'User % must have role % to be linked to % table',
                    NEW.user_id, TG_ARGV[0], TG_TABLE_NAME;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_user_role() OWNER TO flyway_user;

--
-- Name: prevent_role_change_if_linked(); Type: FUNCTION; Schema: public; Owner: flyway_user
--

CREATE FUNCTION public.prevent_role_change_if_linked() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.prevent_role_change_if_linked() OWNER TO flyway_user;

--
-- Name: refresh_monthly_statistics_trigger(); Type: FUNCTION; Schema: public; Owner: flyway_user
--

CREATE FUNCTION public.refresh_monthly_statistics_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  PERFORM update_monthly_statistics();
  RETURN NULL;
END;
$$;


ALTER FUNCTION public.refresh_monthly_statistics_trigger() OWNER TO flyway_user;

--
-- Name: update_monthly_statistics(); Type: FUNCTION; Schema: public; Owner: flyway_user
--

CREATE FUNCTION public.update_monthly_statistics() RETURNS void
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.update_monthly_statistics() OWNER TO flyway_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.admin (
    id character varying(50) NOT NULL,
    user_id uuid,
    permission character varying(10),
    CONSTRAINT admin_permission_check CHECK (((permission)::text = ANY ((ARRAY['FULL'::character varying, 'LIMITED'::character varying, 'READ-ONLY'::character varying])::text[])))
);


ALTER TABLE public.admin OWNER TO flyway_user;

--
-- Name: course; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.course (
    id uuid DEFAULT gen_random_uuid(),
    title character varying(50) NOT NULL,
    teacher_id character varying(50),
    description text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.course OWNER TO flyway_user;

--
-- Name: enrollment; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.enrollment (
    student_id character varying(50) NOT NULL,
    course_id character varying(50) NOT NULL,
    enrolled_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.enrollment OWNER TO flyway_user;

--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO flyway_user;

--
-- Name: grade; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.grade (
    student_id character varying(50) NOT NULL,
    course_id character varying(50) NOT NULL,
    value double precision,
    comment text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    CONSTRAINT grade_value_check CHECK ((value >= (0)::double precision))
);


ALTER TABLE public.grade OWNER TO flyway_user;

--
-- Name: level; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.level (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(10) NOT NULL
);


ALTER TABLE public.level OWNER TO flyway_user;

--
-- Name: statistic; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.statistic (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    period_label character varying(7) NOT NULL,
    period_start date NOT NULL,
    period_end date NOT NULL,
    total_students integer DEFAULT 0,
    total_teachers integer DEFAULT 0,
    total_courses integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.statistic OWNER TO flyway_user;

--
-- Name: student; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.student (
    registration_number character varying(50) NOT NULL,
    user_id uuid,
    level_id uuid,
    group_id uuid
);


ALTER TABLE public.student OWNER TO flyway_user;

--
-- Name: student_group; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.student_group (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(10) NOT NULL
);


ALTER TABLE public.student_group OWNER TO flyway_user;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.teacher (
    matricule_number character varying(50) NOT NULL,
    user_id uuid,
    bio text
);


ALTER TABLE public.teacher OWNER TO flyway_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: flyway_user
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    phone_number character varying(20),
    role character varying(10) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    address character varying(255) NOT NULL,
    CONSTRAINT users_email_check CHECK (((email)::text ~~* '%_@__%.__%'::text)),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['ADMIN'::character varying, 'TEACHER'::character varying, 'STUDENT'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO flyway_user;

--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.admin (id, user_id, permission) FROM stdin;
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.course (id, title, teacher_id, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.enrollment (student_id, course_id, enrolled_at) FROM stdin;
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	create table user	SQL	V1__create_table_user.sql	-1578125792	flyway_user	2025-10-18 22:00:39.982326	51	t
2	2	create table student	SQL	V2__create_table_student.sql	1023475485	flyway_user	2025-10-20 06:13:04.925995	60	t
3	3	add column address for all users	SQL	V3__add_column_address_for_all_users.sql	-338783952	flyway_user	2025-10-20 06:13:05.041422	11	t
4	4	create table teacher	SQL	V4__create_table_teacher.sql	213469196	flyway_user	2025-10-20 07:36:51.715436	34	t
5	5	create table admin	SQL	V5__create_table_admin.sql	-580152922	flyway_user	2025-10-20 07:36:51.78918	10	t
6	6	create fonction for checking user role	SQL	V6__create_fonction_for_checking_user_role.sql	1105226181	flyway_user	2025-10-20 07:36:51.817878	11	t
7	7	create fonction for preventing role change if linked	SQL	V7__create_fonction_for_preventing_role_change_if_linked.sql	1788058624	flyway_user	2025-10-20 07:36:51.857068	7	t
8	8	create table course	SQL	V8__create_table_course.sql	-992333982	flyway_user	2025-10-20 22:28:48.302202	67	t
9	9	create table enrollment	SQL	V9__create_table_enrollment.sql	-331981662	flyway_user	2025-10-20 22:35:03.795354	49	t
10	10	create table grade	SQL	V10__create_table_grade.sql	-977007861	flyway_user	2025-10-20 22:38:40.458667	55	t
11	11	create table statistics	SQL	V11__create_table_statistics.sql	-1186135645	flyway_user	2025-10-20 22:38:40.580891	11	t
12	12	 create fonction for statistic update	SQL	V12__ create_fonction_for_statistic_update.sql	223572838	flyway_user	2025-10-20 22:38:40.62081	22	t
13	13	fix student level and group	SQL	V13__fix_student_level_and_group.sql	587459936	flyway_user	2025-10-22 00:00:01.069416	86	t
\.


--
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.grade (student_id, course_id, value, comment, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: level; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.level (id, name) FROM stdin;
\.


--
-- Data for Name: statistic; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.statistic (id, period_label, period_start, period_end, total_students, total_teachers, total_courses, created_at) FROM stdin;
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.student (registration_number, user_id, level_id, group_id) FROM stdin;
\.


--
-- Data for Name: student_group; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.student_group (id, name) FROM stdin;
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.teacher (matricule_number, user_id, bio) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: flyway_user
--

COPY public.users (id, first_name, last_name, email, phone_number, role, created_at, updated_at, address) FROM stdin;
\.


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (title);


--
-- Name: enrollment enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_pkey PRIMARY KEY (student_id, course_id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: grade grade_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_pkey PRIMARY KEY (student_id, course_id);


--
-- Name: level level_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.level
    ADD CONSTRAINT level_pkey PRIMARY KEY (id);


--
-- Name: statistic statistic_period_label_key; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.statistic
    ADD CONSTRAINT statistic_period_label_key UNIQUE (period_label);


--
-- Name: statistic statistic_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.statistic
    ADD CONSTRAINT statistic_pkey PRIMARY KEY (id);


--
-- Name: student_group student_group_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.student_group
    ADD CONSTRAINT student_group_pkey PRIMARY KEY (id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (registration_number);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (matricule_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: flyway_user
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: admin admin_role_check; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER admin_role_check BEFORE INSERT OR UPDATE ON public.admin FOR EACH ROW EXECUTE FUNCTION public.check_user_role('ADMIN');


--
-- Name: course course_monthly_update; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER course_monthly_update AFTER INSERT OR DELETE ON public.course FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_monthly_statistics_trigger();


--
-- Name: users prevent_invalid_role_change; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER prevent_invalid_role_change BEFORE UPDATE OF role ON public.users FOR EACH ROW EXECUTE FUNCTION public.prevent_role_change_if_linked();


--
-- Name: student student_monthly_update; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER student_monthly_update AFTER INSERT OR DELETE ON public.student FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_monthly_statistics_trigger();


--
-- Name: student student_role_check; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER student_role_check BEFORE INSERT OR UPDATE ON public.student FOR EACH ROW EXECUTE FUNCTION public.check_user_role('STUDENT');


--
-- Name: teacher teacher_monthly_update; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER teacher_monthly_update AFTER INSERT OR DELETE ON public.teacher FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_monthly_statistics_trigger();


--
-- Name: teacher teacher_role_check; Type: TRIGGER; Schema: public; Owner: flyway_user
--

CREATE TRIGGER teacher_role_check BEFORE INSERT OR UPDATE ON public.teacher FOR EACH ROW EXECUTE FUNCTION public.check_user_role('TEACHER');


--
-- Name: admin admin_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: course course_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(matricule_number) ON DELETE SET NULL;


--
-- Name: enrollment enrollment_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(title) ON DELETE CASCADE;


--
-- Name: enrollment enrollment_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(registration_number) ON DELETE CASCADE;


--
-- Name: student fk_group; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.student_group(id) ON DELETE SET NULL;


--
-- Name: student fk_level; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT fk_level FOREIGN KEY (level_id) REFERENCES public.level(id) ON DELETE SET NULL;


--
-- Name: grade grade_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(title) ON DELETE CASCADE;


--
-- Name: grade grade_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(registration_number) ON DELETE CASCADE;


--
-- Name: student student_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: teacher teacher_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: flyway_user
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict ekNiqg0pQxZLhmjIGilzXRbfkogS7GiwStv8gI0ajJzcuT0lDuyuwF8JZNLc8Yp

