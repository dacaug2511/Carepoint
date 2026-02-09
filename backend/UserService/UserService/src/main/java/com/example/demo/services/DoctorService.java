package com.example.demo.services;

import com.example.demo.dto.DoctorRegisterRequest;
import com.example.demo.entities.Doctor;

public interface DoctorService {
    Doctor registerDoctor(DoctorRegisterRequest request);
}