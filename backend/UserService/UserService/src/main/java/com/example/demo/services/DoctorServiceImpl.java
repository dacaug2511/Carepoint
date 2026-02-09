package com.example.demo.services;

import com.example.demo.dto.DoctorRegisterRequest;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Role;
import com.example.demo.entities.Specialization;
import com.example.demo.entities.User;
import com.example.demo.repositories.DoctorRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.SpecializationRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private SpecializationRepository specializationRepository;


    @Override
    public Doctor registerDoctor(DoctorRegisterRequest request) {

        Role doctorRole = roleRepository.findByRoleName("Doctor")
                .orElseThrow(() -> new RuntimeException("Doctor role not found"));

        // 1️Save USER
        User user = new User();
        user.setUname(request.getUname());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setAadhaar(request.getAadhaar());
        user.setRole(doctorRole);

        User savedUser = userRepository.save(user);

        Specialization specialization = specializationRepository.findById(request.getSpecializationId())
                .orElseThrow(() -> new RuntimeException("Specialization not found"));
        // 2️ Save DOCTOR
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setSpecialization(specialization); 
        doctor.setBaseQualification(request.getBaseQualification());
        doctor.setPostQualification(request.getPostQualification());
        doctor.setExperience(request.getExperience());
        doctor.setConsultationFee(request.getConsultationFee());

        doctor.setStatus(Doctor.Status.INACTIVE); // Admin can activate later


        return doctorRepository.save(doctor);
    }
}