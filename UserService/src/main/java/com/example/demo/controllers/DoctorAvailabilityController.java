package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.DoctorAvailability;
import com.example.demo.services.DoctorAvailabilityService;

@RestController
@RequestMapping("/availability")
public class DoctorAvailabilityController {

    @Autowired
    private DoctorAvailabilityService availabilityService;

    @GetMapping("/getall")
    public List<DoctorAvailability> getAll() {
        return availabilityService.getAll();
    }

    @PostMapping("/save")
    public DoctorAvailability save(@RequestBody DoctorAvailability availability) {
        return availabilityService.save(availability);
    }
}
