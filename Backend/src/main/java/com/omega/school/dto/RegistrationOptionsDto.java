package com.omega.school.dto;

import com.omega.school.model.Level;
import com.omega.school.model.Group;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationOptionsDto {
    private List<Level> levels;
    private List<Group> groups;
}
