package com.example.demo.services;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.entities.User;

public interface AuthService {

    User register(User user, String roleName);

//    User login(String username, String password);

    void changePassword(Integer uid, String oldPassword, String newPassword);

    void resetPassword(String email, String newPassword);
    LoginResponse login(LoginRequest request);
}
