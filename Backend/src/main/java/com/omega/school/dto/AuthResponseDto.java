package com.omega.school.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.omega.school.model.Role;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
    private String email;
    private Role role;
}
