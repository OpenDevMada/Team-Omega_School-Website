package com.omega.school.mapper;

import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.dto.TeacherUpdateDto;
import com.omega.school.model.Role;
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
        teacher.setRole(Role.TEACHER);
        teacher.setBio(dto.getBio());
        return teacher;
    }

    public static void updateEntityFromDto(TeacherUpdateDto dto, Teacher teacher) {
        if (dto == null || teacher == null)
            return;

        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setBirthDate(dto.getBirthDate());
        teacher.setSex(dto.getSex());
        teacher.setAddress(dto.getAddress());
        teacher.setPhoneNumber(dto.getPhoneNumber());
        teacher.setBio(dto.getBio());
    }
}
