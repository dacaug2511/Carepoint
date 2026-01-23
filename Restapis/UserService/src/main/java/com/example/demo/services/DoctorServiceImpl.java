package com.example.demo.services;

import com.example.demo.entities.DoctorRegister;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.DoctorRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Doctor registerDoctor(DoctorRegister request) {

        Role doctorRole = roleRepository.findByRoleName("Doctor")
                .orElseThrow(() -> new RuntimeException("Doctor role not found"));

        // 1️Save USER
        User user = new User();
        user.setUname(request.uname);
        user.setFirstname(request.firstname);
        user.setLastname(request.lastname);
        user.setPassword(request.password);
        user.setPhone(request.phone);
        user.setEmail(request.email);
        user.setAddress(request.address);
        user.setAadhaar(request.aadhaar);
        user.setRole(doctorRole);

        User savedUser = userRepository.save(user);

        // 2️ Save DOCTOR
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setSpecializationId(request.specializationId);
        doctor.setBaseQualification(request.baseQualification);
        doctor.setPostQualification(request.postQualification);
        doctor.setExperience(request.experience);
        doctor.setConsultationFee(request.consultationFee);

        doctor.setStatus(Doctor.Status.Inactive); // Admin can activate later


        return doctorRepository.save(doctor);
    }
}