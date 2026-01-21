package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Specialization;
import com.example.demo.services.SpecializationService;

@RestController
@RequestMapping("/specializations")
public class SpecializationController {

    @Autowired
    private SpecializationService specializationService;

    @GetMapping("/getall")
    public List<Specialization> getAll() {
        return specializationService.getAll();
    }

    @PostMapping("/save")
    public Specialization save(@RequestBody Specialization specialization) {
        return specializationService.save(specialization);
    }
}
