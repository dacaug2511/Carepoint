package com.example.demo.controllers;

import com.example.demo.entities.PatientRegister;
import com.example.demo.entities.Patient;
import com.example.demo.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
//@CrossOrigin(origins = "*")
public class PatientRegistrationController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public Patient registerPatient(@RequestBody PatientRegister request) {
        return patientService.registerPatient(request);
    }
}