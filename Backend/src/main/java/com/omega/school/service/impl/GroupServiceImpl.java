package com.omega.school.service.impl;

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
    public Group createGroup(Group group) {
        if (groupRepository.existByGroupName(group.getGroupName())) {
            throw new IllegalArgumentException("Nom de groupe déjà utilisé");
        }
        return groupRepository.save(group);
    }

    @Override
    public Optional<Group> getGroupByName(String name) {
        return groupRepository.findByGroupName(name);
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public Group updateGroup(UUID id, Group newData) {
        return groupRepository.findById(id)
                .map(existing -> {
                    existing.setGroupName(newData.getGroupName());
                    return groupRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé"));
    }

    @Override
    public void deleteGroup(UUID id) {
        groupRepository.deleteById(id);
    }
}
