package com.example.demo.controllers;

import com.example.demo.entities.DoctorRegister;
import com.example.demo.entities.Doctor;
import com.example.demo.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
//@CrossOrigin(origins = "*"/)
public class DoctorRegistrationController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/register")
    public Doctor registerDoctor(@RequestBody DoctorRegister request) {
        return doctorService.registerDoctor(request);
    }
}