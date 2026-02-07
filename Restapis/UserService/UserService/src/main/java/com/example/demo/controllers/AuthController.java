package com.example.demo.controllers;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.entities.User;
import com.example.demo.services.AuthService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register user (Patient / Doctor / Admin)
    @PostMapping("/register/{role}")
    public Map<String, Object> register(@RequestBody User user,
                                        @PathVariable String role) {

        Map<String, Object> response = new HashMap<>();

        try {
            User savedUser = authService.register(user, role);
            response.put("success", true);
            response.put("message", "Registration successful. Please login.");
            response.put("data", savedUser);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
        }

        return response;
    }

//    // Login
//    @PostMapping("/login")
//    public Map<String, Object> login(
//            @RequestBody LoginRequest request) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            User user = authService.login(
//                    request.getUname(),
//                    request.getPassword()
//            );
//            response.put("success", true);
//            response.put("message", "Login successful");
//            response.put("data", user);
//        } catch (RuntimeException e) {
//            response.put("success", false);
//            response.put("message", e.getMessage());
//        }
//
//        return response;
//    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(
//            @RequestBody LoginRequest request) {
//
//        return ResponseEntity.ok(authService.login(request));
//    }
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {

        Map<String, Object> response = new HashMap<>();

        try {
            LoginResponse loginResponse = authService.login(request);
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("data", loginResponse);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
        }

        return response;
    }



    // Change password
    @PutMapping("/change-password/{uid}")
    public Map<String, Object> changePassword(@PathVariable Integer uid,
                                              @RequestParam String oldPassword,
                                              @RequestParam String newPassword) {

        Map<String, Object> response = new HashMap<>();

        try {
            authService.changePassword(uid, oldPassword, newPassword);
            response.put("success", true);
            response.put("message", "Password changed successfully");
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
        }

        return response;
    }

    // Forgot / reset password
    @PutMapping("/reset-password")
    public Map<String, Object> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        Map<String, Object> response = new HashMap<>();

        try {
            authService.resetPassword(
                request.getEmail(),
                request.getNewPassword()
            );
            response.put("success", true);
            response.put("message", "Password reset successfully");
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
        }

        return response;
    }

}