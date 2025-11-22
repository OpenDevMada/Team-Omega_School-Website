package com.omega.school.service.impl;

import java.time.LocalDateTime;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import com.omega.school.dto.GroupRequestDto;
import com.omega.school.model.Group;
import com.omega.school.repository.GroupRepository;
import com.omega.school.service.GroupService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    @Override
    public Group createGroup(GroupRequestDto dto) {
        if (groupRepository.existsByName(dto.getGroupName())) {
            throw new IllegalArgumentException("Nom de groupe déjà utilisé");
        }
        if (dto.getGroupName() == null || dto.getGroupName().isBlank()) {
            throw new IllegalArgumentException("Le nom du groupe ne peut pas être vide");
        }

        Group group = new Group();
        group.setName(dto.getGroupName());
        group.setCreatedAt(LocalDateTime.now());
        group.setUpdatedAt(LocalDateTime.now());

        return groupRepository.save(group);
    }

    @Override
    public Optional<Group> getGroupByName(String name) {
        return groupRepository.findByName(name);
    }

    @Override
    public Page<Group> getAllGroups(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return groupRepository.findAll(pageable);
    }

    @Override
    public Group updateGroup(UUID id, GroupRequestDto dto) {
        return groupRepository.findById(id)
                .map(existing -> {
                    existing.setName(dto.getGroupName());
                    existing.setUpdatedAt(LocalDateTime.now());
                    return groupRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé"));
    }

    @Override
    public void deleteGroup(UUID id) {
        if (!groupRepository.existsById(id)) {
            throw new EntityNotFoundException("Groupe non trouvé");
        }
        groupRepository.deleteById(id);
    }
}
