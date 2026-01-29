package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register user (Patient / Doctor / Admin)
    @PostMapping("/register/{role}")
    public User register(@RequestBody User user,
                          @PathVariable String role) {
        return authService.register(user, role);
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestParam String username,
                      @RequestParam String password) {
        return authService.login(username, password);
    }

    // Change password
    @PutMapping("/change-password/{uid}")
    public String changePassword(@PathVariable Integer uid,
                                 @RequestParam String oldPassword,
                                 @RequestParam String newPassword) {
        authService.changePassword(uid, oldPassword, newPassword);
        return "Password changed successfully";
    }

    // Forgot / reset password
    @PutMapping("/reset-password")
    public String resetPassword(@RequestParam String email,
                                @RequestParam String newPassword) {
        authService.resetPassword(email, newPassword);
        return "Password reset successfully";
    }
}