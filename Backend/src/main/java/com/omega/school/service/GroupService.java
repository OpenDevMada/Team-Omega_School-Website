package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.omega.school.dto.GroupRequestDto;
import com.omega.school.model.Group;

public interface GroupService {
    Group createGroup(GroupRequestDto dto);

    Optional<Group> getGroupByName(String name);

    Page<Group> getAllGroups(int page, int size);

    Group updateGroup(UUID id, GroupRequestDto dto);

    void deleteGroup(UUID id);

    List<Group> getAllGroupsNoPagination();

}
