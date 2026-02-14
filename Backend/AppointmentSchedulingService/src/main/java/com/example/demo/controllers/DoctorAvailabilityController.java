package com.example.demo.controllers;


import com.example.demo.dto.DoctorAvailabilityRequest;
import com.example.demo.dto.DoctorAvailabilityResponse;
import com.example.demo.services.DoctorAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
//@CrossOrigin
public class DoctorAvailabilityController {

    @Autowired
    private DoctorAvailabilityService service;

    @GetMapping("/doctor/{doctorId}")
    public List<DoctorAvailabilityResponse>
    getDoctorAvailability(@PathVariable int doctorId) {

        return service.getAvailabilityByDoctor(doctorId);
    }
    
    @PostMapping("/availability")
    public void setAvailability(
            @RequestBody DoctorAvailabilityRequest request
    ) {
        service.saveAvailability(request);
    }

}

