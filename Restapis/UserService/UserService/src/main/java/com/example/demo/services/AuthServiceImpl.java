package com.example.demo.services;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Patient;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.DoctorRepository;
import com.example.demo.repositories.PatientRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public User register(User user, String roleName) {

        if (userRepository.existsByUname(user.getUname()))
            throw new RuntimeException("Username already exists");

        if (userRepository.existsByEmail(user.getEmail()))
            throw new RuntimeException("Email already exists");

        if (userRepository.existsByPhone(user.getPhone()))
            throw new RuntimeException("Phone already exists");

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        // No password encoding as requested
        return userRepository.save(user);
    }

//    @Override
//    public User login(String username, String password) {
//
//        User user = userRepository.findByUname(username)
//                .orElseThrow(() -> new RuntimeException("Invalid username"));
//
//        if (!user.getPassword().equals(password))
//            throw new RuntimeException("Invalid password");
//
//        return user;
//    }

    @Override
    public void changePassword(Integer uid, String oldPassword, String newPassword) {

        User user = userRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(oldPassword))
            throw new RuntimeException("Old password incorrect");

        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public void resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not registered"));

        user.setPassword(newPassword);
        userRepository.save(user);
    }
    
    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByUnameAndPassword(
                        request.getUname(),
                        request.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        LoginResponse response = new LoginResponse();
        response.setUserId(user.getUid());
        response.setUsername(user.getUname());
        response.setRole(user.getRole().getRoleName());

        // ROLE-BASED ID RESOLUTION
        if ("PATIENT".equals(user.getRole().getRoleName())) {

            Patient patient = patientRepository
                    .findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            response.setPatientId(patient.getPatientId());
        }

        if ("DOCTOR".equals(user.getRole().getRoleName())) {

            Doctor doctor = doctorRepository
                    .findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            response.setDoctorId(doctor.getDoctorId());
        }

        return response;
    }
}