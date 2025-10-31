package com.omega.school.mapper;

import com.omega.school.dto.StudentRequestDto;
import com.omega.school.model.Group;
import com.omega.school.model.Level;
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
        student.setRole(dto.getRole());
        student.setGroup(group);
        student.setLevel(level);
        student.setRegistrationNumber(dto.getRegistrationNumber());
        student.setSex(dto.getSex());
        student.setPasswordHash(dto.getPassword());

        return student;
    }
}
