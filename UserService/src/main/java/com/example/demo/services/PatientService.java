package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Patient;
import com.example.demo.repositories.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepo;

    public List<Patient> getAll() {
        return patientRepo.findAll();
    }

    public Patient save(Patient patient) {
        return patientRepo.save(patient);
    }

    public Patient getById(int patientId) {
        return patientRepo.findById(patientId).orElse(null);
    }

    public void delete(int patientId) {
        patientRepo.deleteById(patientId);
    }
}

