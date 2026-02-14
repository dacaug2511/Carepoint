package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.DoctorDTO;
import com.example.demo.entities.Patient;

public interface AdminService {
    List<DoctorDTO> getAllDoctors();
    void approveDoctor(Integer doctorId);
    List<Patient> getAllPatients();
}

