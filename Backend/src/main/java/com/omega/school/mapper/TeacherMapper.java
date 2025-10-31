package com.omega.school.mapper;

import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.model.Teacher;

public class TeacherMapper {

    public static Teacher toEntity(TeacherRequestDto dto) {
        if (dto == null)
            return null;

        Teacher teacher = new Teacher();
        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setBirthDate(dto.getBirthDate());
        teacher.setSex(dto.getSex());
        teacher.setAddress(dto.getAddress());
        teacher.setPhoneNumber(dto.getPhoneNumber());
        teacher.setPasswordHash(dto.getPassword());
        teacher.setRole(dto.getRole());
        teacher.setMatriculeNumber(dto.getMatriculeNumber());
        teacher.setBio(dto.getBio());
        return teacher;
    }
}
