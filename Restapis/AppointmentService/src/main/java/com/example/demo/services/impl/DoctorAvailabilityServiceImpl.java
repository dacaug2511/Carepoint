package com.example.demo.services.impl;

import com.example.demo.entities.DoctorAvailability;
import com.example.demo.repositories.DoctorAvailabilityRepository;
import com.example.demo.services.DoctorAvailabilityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorAvailabilityServiceImpl implements DoctorAvailabilityService {

    private final DoctorAvailabilityRepository availabilityRepository;

    public DoctorAvailabilityServiceImpl(DoctorAvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }

    @Override
    public DoctorAvailability addAvailability(DoctorAvailability availability) {
        return availabilityRepository.save(availability);
    }

    @Override
    public List<DoctorAvailability> getAvailabilityByDoctor(Integer doctorId) {
        return availabilityRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<DoctorAvailability> getAvailabilityByDoctorAndDay(Integer doctorId, String day) {
        return availabilityRepository.findByDoctorIdAndDay(doctorId, day);
    }

}
