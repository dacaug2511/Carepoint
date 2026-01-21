package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Doctor;
import com.example.demo.repositories.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepo;

    public List<Doctor> getAll() {
        return doctorRepo.findAll();
    }

    public Doctor save(Doctor doctor) {
        return doctorRepo.save(doctor);
    }

    public Doctor getById(int doctorId) {
        return doctorRepo.findById(doctorId).orElse(null);
    }

    
}
