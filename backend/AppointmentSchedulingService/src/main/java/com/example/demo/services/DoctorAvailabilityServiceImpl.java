package com.example.demo.services;


import com.example.demo.dto.DoctorAvailabilityRequest;
import com.example.demo.dto.DoctorAvailabilityResponse;
import com.example.demo.entities.DoctorAvailability;
import com.example.demo.entities.DoctorAvailabilityId;
import com.example.demo.repositories.DoctorAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DoctorAvailabilityServiceImpl
        implements DoctorAvailabilityService {

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    @Override
    public List<DoctorAvailabilityResponse> getAvailabilityByDoctor(int doctorId) {

        List<DoctorAvailability> availabilityList = availabilityRepository.findByIdDoctorId(doctorId);

        List<DoctorAvailabilityResponse> responseList = new ArrayList<>();

        for (DoctorAvailability availability : availabilityList) {

            DoctorAvailabilityResponse response =
                    new DoctorAvailabilityResponse();

            response.setDoctorId(
                    availability.getId().getDoctorId()
            );
            response.setDay(
                    availability.getId().getDay()
            );
            response.setAvailableFrom(
                    availability.getAvailableFrom()
            );
            response.setAvailableTo(
                    availability.getAvailableTo()
            );

            responseList.add(response);
        }

        return responseList;
    }
    
    @Override
    @Transactional
    public void saveAvailability(DoctorAvailabilityRequest request) {

        if (request.getDays().size() > 7) {
            throw new RuntimeException("Maximum 7 days allowed");
        }

        // Remove old availability
        availabilityRepository
                .findByIdDoctorId(request.getDoctorId())
                .forEach(availabilityRepository::delete);

        // Save new availability
        for (String day : request.getDays()) {

            DoctorAvailabilityId id = new DoctorAvailabilityId();
            id.setDoctorId(request.getDoctorId());
            id.setDay(day);

            DoctorAvailability availability = new DoctorAvailability();
            availability.setId(id);
            availability.setAvailableFrom(request.getAvailableFrom());
            availability.setAvailableTo(request.getAvailableTo());

            availabilityRepository.save(availability);
        }
    }

}

