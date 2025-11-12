package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

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
    public Group createGroup(String groupName) {
        if (groupRepository.existsByName(groupName)) {
            throw new IllegalArgumentException("Nom de groupe déjà utilisé");
        }
        if (groupName == null || groupName.isBlank()) {
            throw new IllegalArgumentException("Le nom du groupe ne peut pas être vide");
        }

        Group group = new Group();
        group.setName(groupName);
        group.setCreatedAt(LocalDateTime.now());
        group.setUpdatedAt(LocalDateTime.now());

        return groupRepository.save(group);
    }

    @Override
    public Optional<Group> getGroupByName(String name) {
        return groupRepository.findByName(name);
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public Group updateGroup(UUID id, String newGroupName) {
        return groupRepository.findById(id)
                .map(existing -> {
                    existing.setName(newGroupName);
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
