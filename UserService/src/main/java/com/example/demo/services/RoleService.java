package com.example.demo.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepo;

    public List<Role> getAll() {
        return roleRepo.findAll();
    }

    public Role save(Role role) {
        return roleRepo.save(role);
    }


}

