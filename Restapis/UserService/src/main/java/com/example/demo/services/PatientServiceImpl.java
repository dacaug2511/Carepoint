package com.example.demo.services;

import com.example.demo.entities.PatientRegister;

import com.example.demo.entities.Patient;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.PatientRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Patient registerPatient(PatientRegister request) {

        Role patientRole = roleRepository.findByRoleName("Patient")
                .orElseThrow(() -> new RuntimeException("Patient role not found"));

        // 1. Save USER
        User user = new User();
        user.setUname(request.uname);
        user.setFirstname(request.firstname);
        user.setLastname(request.lastname);
        user.setPassword(request.password);
        user.setPhone(request.phone);
        user.setEmail(request.email);
        user.setAddress(request.address);
        user.setAadhaar(request.aadhaar);
        user.setRole(patientRole);

        User savedUser = userRepository.save(user);

        // 2. Save PATIENT
        Patient patient = new Patient();
        patient.setUser(savedUser);
        patient.setGender(request.gender);
        patient.setDob(request.dob);
        patient.setEmergencyContact(request.emergencyContact);
        patient.setAllergy(request.allergy);
        patient.setDisease(request.disease);
        patient.setBloodGroup(request.bloodGroup);

        //system current date
        patient.setRegistrationDate(new Date(System.currentTimeMillis()));

        return patientRepository.save(patient);
    }
}