package com.example.demo.controllers;

import com.example.demo.dto.DoctorDTO;
//import com.example.demo.entities.Doctor;
import com.example.demo.entities.Patient;
import com.example.demo.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // 🔹 Get all doctors
    @GetMapping("/doctors")
    public List<DoctorDTO> getAllDoctors() {
        return adminService.getAllDoctors();
    }

    // 🔹 Approve doctor
    @PutMapping("/doctor/{id}/approve")
    public void approveDoctor(@PathVariable Integer id) {
         adminService.approveDoctor(id);
    }

    // 🔹 Get all patients
    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return adminService.getAllPatients();
    }
}
