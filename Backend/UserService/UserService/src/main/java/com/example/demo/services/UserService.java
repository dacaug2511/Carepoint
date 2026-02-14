package com.example.demo.services;

import com.example.demo.entities.User;
import java.util.List;

public interface UserService {

    User getUserById(Integer uid);

    List<User> getAllUsers();

    User updateProfile(Integer uid, User updatedUser);

    void deleteUser(Integer uid);
}