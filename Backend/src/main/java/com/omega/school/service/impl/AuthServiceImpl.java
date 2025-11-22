package com.omega.school.service.impl;

import org.springframework.stereotype.Service;

import com.omega.school.dto.AuthResponseDto;
import com.omega.school.dto.LoginRequestDto;
import com.omega.school.dto.RegisterRequestDto;
import com.omega.school.dto.StudentRequestDto;

import com.omega.school.model.Student;
import com.omega.school.model.User;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final StudentServiceImpl studentServiceImpl;
    private final JwtServiceImpl jwtService;
    private final PasswordEncoder passwordEncoder;

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

        return studentServiceImpl.createStudent(studentRequestDto);

    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }

        // Génération du token JWT
        String token = jwtService.generateToken(user);

        return new AuthResponseDto(
                token,
                user.getEmail(),
                user.getRole());
    }

}
