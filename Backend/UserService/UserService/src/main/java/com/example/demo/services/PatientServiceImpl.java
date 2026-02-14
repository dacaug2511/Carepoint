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
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

@Service
@Transactional
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
        user.setUname(request.getUname());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setAadhaar(request.getAadhaar());
        user.setRole(patientRole);

        User savedUser = userRepository.save(user);

        // 2. Save PATIENT
        Patient patient = new Patient();
        patient.setUser(savedUser);
        patient.setGender(request.getGender());
        patient.setDob(request.getDob());
        patient.setEmergencyContact(request.getEmergencyContact());
        patient.setAllergy(request.getAllergy());
        patient.setDisease(request.getDisease());
        patient.setBloodGroup(request.getBloodGroup());

        //system current date
        patient.setRegistrationDate(new Date(System.currentTimeMillis()));

        return patientRepository.save(patient);
    }
}