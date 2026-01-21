package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Patient;
import com.example.demo.services.PatientService;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/getall")
    public List<Patient> getAll() {
        return patientService.getAll();
    }

    @PostMapping("/save")
    public Patient save(@RequestBody Patient patient) {
        return patientService.save(patient);
    }

    @GetMapping("/getbyid/{id}")
    public Patient getById(@PathVariable int id) {
        return patientService.getById(id);
    }

    

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        patientService.delete(id);
    }
}
