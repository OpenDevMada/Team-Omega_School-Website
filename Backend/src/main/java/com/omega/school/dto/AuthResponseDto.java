package com.omega.school.dto;

import com.omega.school.model.Role;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private String email;
    private Role role;
}
