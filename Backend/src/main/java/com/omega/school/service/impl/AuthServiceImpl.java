package com.omega.school.service.impl;

import org.springframework.stereotype.Service;

import com.omega.school.dto.RegisterRequestDto;
import com.omega.school.dto.StudentRequestDto;
import com.omega.school.model.Role;
import com.omega.school.model.Student;

import com.omega.school.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final StudentServiceImpl studentServiceImpl;

    @Override
    public Student register(RegisterRequestDto request) {
        StudentRequestDto studentRequestDto = new StudentRequestDto();
        studentRequestDto.setAddress(request.getAddress());
        studentRequestDto.setBirthDate(request.getBirthDate());
        studentRequestDto.setEmail(request.getEmail());
        studentRequestDto.setEmergencyContact(request.getEmergencyContact());
        studentRequestDto.setFirstName(request.getFirstName());
        studentRequestDto.setLastName(request.getLastName());
        studentRequestDto.setGroup(request.getGroup());
        studentRequestDto.setLevel(request.getLevel());
        studentRequestDto.setSex(request.getSex());
        studentRequestDto.setPhoneNumber(request.getPhoneNumber());
        studentRequestDto.setPassword(request.getPassword());
        studentRequestDto.setRole(Role.STUDENT);

        return studentServiceImpl.createStudent(studentRequestDto);

    }

}
