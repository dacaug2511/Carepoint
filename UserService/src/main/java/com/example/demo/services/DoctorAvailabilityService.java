package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DoctorAvailability;
import com.example.demo.repositories.DoctorAvailabilityRepository;

@Service
public class DoctorAvailabilityService {

    @Autowired
    private DoctorAvailabilityRepository availabilityRepo;

    public List<DoctorAvailability> getAll() {
        return availabilityRepo.findAll();
    }

    public DoctorAvailability save(DoctorAvailability availability) {
        return availabilityRepo.save(availability);
    }

}
