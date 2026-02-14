package com.example.demo.controllers;

import com.example.demo.entities.Specialization;
import com.example.demo.repositories.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specializations")
//@CrossOrigin(origins = "http://localhost:3000")
public class SpecializationController {

    @Autowired
    private SpecializationRepository specializationRepository;

    @GetMapping
    public List<Specialization> getAllSpecializations() {
        return specializationRepository.findAll();
    }
}

