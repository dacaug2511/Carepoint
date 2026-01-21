package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Doctor;
import com.example.demo.services.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAll() {
        return doctorService.getAll();
    }

    @PostMapping("/save")
    public Doctor save(@RequestBody Doctor doctor) {
        return doctorService.save(doctor);
    }

    @GetMapping("/getall/{id}")
    public Doctor getById(@PathVariable int id) {
        return doctorService.getById(id);
    }

    
}
