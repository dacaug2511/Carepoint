package com.example.demo.services;

import com.example.demo.entities.PatientRegister;
import com.example.demo.entities.Patient;

public interface PatientService {
    Patient registerPatient(PatientRegister request);
}