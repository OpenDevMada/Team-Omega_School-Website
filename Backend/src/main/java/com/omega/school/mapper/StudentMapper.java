package com.omega.school.mapper;

import java.time.LocalDateTime;

import com.omega.school.dto.StudentRequestDto;
import com.omega.school.model.Student;

public class StudentMapper {
    public static Student toEntity(StudentRequestDto dto) {
        if (dto == null) {
            return null;
        }

        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setAddress(dto.getAddress());
        student.setBirthDate(dto.getBirthDate());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setRole(dto.getRole());
        student.setGroup(dto.getGroup());
        student.setLevel(dto.getLevel());
        student.setRegistrationNumber(dto.getRegistrationNumber());
        student.setSex(dto.getSex());
        student.setPasswordHash(dto.getPassword());
        student.setCreatedAt(LocalDateTime.now());
        student.setUpdatedAt(LocalDateTime.now());

        return student;

    }
}
