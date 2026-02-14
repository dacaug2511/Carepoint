package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Doctor;
import com.example.demo.repositories.DoctorRepository;

@RestController
@RequestMapping("/api/doctors")
//@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/by-specialization/{id}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable Long id) {
        List<Doctor> doctors = doctorRepository.findBySpecialization_SpecializationId(id);
        return ResponseEntity.ok(doctors);
    }
}
