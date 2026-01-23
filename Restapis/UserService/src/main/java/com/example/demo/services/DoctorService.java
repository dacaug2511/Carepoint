package com.example.demo.services;

import com.example.demo.entities.DoctorRegister;
import com.example.demo.entities.Doctor;

public interface DoctorService {
    Doctor registerDoctor(DoctorRegister request);
}