package com.omega.school.mapper;

import com.omega.school.dto.StudentPartialUpdateDto;
import com.omega.school.dto.StudentRequestDto;
import com.omega.school.dto.StudentUpdateDto;
import com.omega.school.model.Group;
import com.omega.school.model.Level;
import com.omega.school.model.Role;
import com.omega.school.model.Student;

public class StudentMapper {

    public static Student toEntity(StudentRequestDto dto, Level level, Group group) {
        if (dto == null)
            return null;

        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setAddress(dto.getAddress());
        student.setBirthDate(dto.getBirthDate());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setGroup(group);
        student.setLevel(level);
        student.setSex(dto.getSex());
        student.setRole(Role.STUDENT);
        student.setEmergencyContact(dto.getEmergencyContact() == null || dto.getEmergencyContact().isBlank()
                ? dto.getPhoneNumber()
                : dto.getEmergencyContact());

        return student;
    }

    public static void updateEntityFromDto(StudentUpdateDto dto, Student student, Level level, Group group) {
        if (dto == null || student == null)
            return;

        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setAddress(dto.getAddress());
        student.setBirthDate(dto.getBirthDate());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setSex(dto.getSex());
        student.setGroup(group);
        student.setLevel(level);
        student.setEmergencyContact(dto.getEmergencyContact() == null || dto.getEmergencyContact().isBlank()
                ? dto.getPhoneNumber()
                : dto.getEmergencyContact());
    }

    public static void partialUpdate(StudentPartialUpdateDto dto, Student student, Level level, Group group) {

        // Mise à jour des champs hérités de User
        UserMapper.partialUpdate(dto, student);

        if (dto.getLevel() != null) {
            student.setLevel(level);
        }

        if (dto.getGroup() != null) {
            student.setGroup(group);
        }

        if (dto.getEmergencyContact() != null) {
            student.setEmergencyContact(
                    dto.getEmergencyContact().isBlank() ? student.getPhoneNumber() : dto.getEmergencyContact());
        }
    }

}
