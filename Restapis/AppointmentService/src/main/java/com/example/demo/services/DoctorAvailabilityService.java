package com.example.demo.services;

import com.example.demo.entities.DoctorAvailability;


import java.util.List;

public interface DoctorAvailabilityService {

    DoctorAvailability addAvailability(DoctorAvailability availability);

    List<DoctorAvailability> getAvailabilityByDoctor(Integer doctorId);

    List<DoctorAvailability> getAvailabilityByDoctorAndDay(Integer doctorId, String day);
}
