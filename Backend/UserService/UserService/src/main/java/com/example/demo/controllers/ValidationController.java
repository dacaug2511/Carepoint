package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Doctor;
import com.example.demo.repositories.DoctorRepository;
import com.example.demo.repositories.PatientRepository;

@RestController
@RequestMapping("/api/validate")
public class ValidationController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Boolean> patientExists(@PathVariable int patientId) {
        return ResponseEntity.ok(
                patientRepository.existsById(patientId)
        );
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<Boolean> doctorExistsAndActive(@PathVariable int doctorId) {
        return ResponseEntity.ok(
                doctorRepository.existsByDoctorIdAndStatus(doctorId, Doctor.Status.ACTIVE)
        );
    }
}

