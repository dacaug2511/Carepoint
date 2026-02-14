package com.example.demo.services;


import com.example.demo.dto.DoctorAvailabilityRequest;
import com.example.demo.dto.DoctorAvailabilityResponse;
import java.util.List;

public interface DoctorAvailabilityService {

    List<DoctorAvailabilityResponse> getAvailabilityByDoctor(int doctorId);
    void saveAvailability(DoctorAvailabilityRequest request);
}

