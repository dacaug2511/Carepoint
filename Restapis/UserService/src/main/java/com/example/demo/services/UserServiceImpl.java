package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserById(Integer uid) {
        return userRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateProfile(Integer uid, User updatedUser) {

        User existingUser = getUserById(uid);

        existingUser.setFirstname(updatedUser.getFirstname());
        existingUser.setLastname(updatedUser.getLastname());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setAddress(updatedUser.getAddress());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Integer uid) {

        if (!userRepository.existsById(uid))
            throw new RuntimeException("User not found");

        userRepository.deleteById(uid);
    }
}