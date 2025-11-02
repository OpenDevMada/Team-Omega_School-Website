/*
 * package com.omega.school;
 * 
 * import java.time.LocalDateTime;
 * import java.util.List;
 * import java.util.Optional;
 * import org.junit.jupiter.api.Test;
 * import org.springframework.beans.factory.annotation.Autowired;
 * import
 * org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
 * import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
 * import com.omega.school.model.Course;
 * import com.omega.school.model.Grade;
 * import com.omega.school.model.GradeId;
 * import com.omega.school.model.Role;
 * import com.omega.school.model.Student;
 * import com.omega.school.model.Teacher;
 * import com.omega.school.repository.CourseRepository;
 * import com.omega.school.repository.GradeRepository;
 * import com.omega.school.repository.StudentRepository;
 * import com.omega.school.repository.TeacherRepository;
 * import static org.assertj.core.api.Assertions.assertThat;
 * 
 * @DataJpaTest
 * 
 * @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
 * // ← pour utiliser ta base Postgres réelle
 * public class GradeTest {
 * 
 * @Autowired
 * private StudentRepository studentRepository;
 * 
 * @Autowired
 * private TeacherRepository teacherRepository;
 * 
 * @Autowired
 * private CourseRepository courseRepository;
 * 
 * @Autowired
 * private GradeRepository gradeRepository;
 * 
 * @Test
 * void testSaveAndReadGrade_withCompositeId() {
 * // 1️⃣ Créer un enseignant
 * Teacher teacher = new Teacher();
 * teacher.setFirstName("John");
 * teacher.setLastName("Doe");
 * teacher.setEmail("john.doe@school.com");
 * teacher.setPasswordHash("password123");
 * teacher.setAddress("Antananarivo 101");
 * teacher.setRole(Role.TEACHER);
 * teacher.setCreatedAt(LocalDateTime.now());
 * teacher.setMatriculeNumber("T-001");
 * teacherRepository.save(teacher);
 * 
 * // 2️⃣ Créer un étudiant
 * Student student = new Student();
 * student.setFirstName("Jane");
 * student.setLastName("Smith");
 * student.setEmail("jane.smith@student.com");
 * student.setPasswordHash("password456");
 * student.setAddress("Antananarivo 101");
 * student.setRole(Role.STUDENT);
 * student.setCreatedAt(LocalDateTime.now());
 * student.setRegistrationNumber("S-001");
 * studentRepository.save(student);
 * 
 * // 3️⃣ Créer un cours lié à l’enseignant
 * Course course = new Course();
 * course.setTitle("Mathematics");
 * course.setDescription("Intro to Math");
 * course.setTeacher(teacher);
 * course.setCreatedAt(LocalDateTime.now());
 * courseRepository.save(course);
 * 
 * // 4️⃣ Créer un grade avec une clé composite
 * GradeId gradeId = new GradeId();
 * gradeId.setStudentId(student.getUserId());
 * gradeId.setCourseId(course.getCourseId());
 * 
 * Grade grade = new Grade();
 * grade.setId(gradeId);
 * grade.setStudent(student);
 * grade.setCourse(course);
 * grade.setValue(16.5);
 * grade.setComment("Excellent");
 * grade.setCreatedAt(LocalDateTime.now());
 * gradeRepository.save(grade);
 * 
 * // 5️⃣ Vérifier les résultats
 * Optional<Grade> savedGrade = gradeRepository.findById(gradeId);
 * assertThat(savedGrade).isPresent();
 * assertThat(savedGrade.get().getValue()).isEqualTo(16.5);
 * assertThat(savedGrade.get().getComment()).isEqualTo("Excellent");
 * 
 * // Vérifie la recherche par étudiant
 * List<Grade> byStudent =
 * gradeRepository.findByStudent_UserId(student.getUserId());
 * assertThat(byStudent).hasSize(1);
 * assertThat(byStudent.get(0).getCourse().getTitle()).isEqualTo("Mathematics");
 * 
 * // Vérifie la recherche par cours
 * List<Grade> byCourse =
 * gradeRepository.findByCourse_CourseId(course.getCourseId());
 * assertThat(byCourse).hasSize(1);
 * assertThat(byCourse.get(0).getStudent().getFirstName()).isEqualTo("Jane");
 * }
 * }
 */