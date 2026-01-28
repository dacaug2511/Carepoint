package com.example.demo.controllers;

import com.example.demo.dto.AvailabilityRequest;
import com.example.demo.entities.DoctorAvailability;
import com.example.demo.services.DoctorAvailabilityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class DoctorAvailabilityController {

    private final DoctorAvailabilityService availabilityService;

    public DoctorAvailabilityController(DoctorAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    // Add doctor availability
    @PostMapping
    public ResponseEntity<DoctorAvailability> addAvailability(
            @RequestBody AvailabilityRequest request) {

        DoctorAvailability availability = new DoctorAvailability(
                request.getDoctorId(),
                request.getDay(),
                request.getAvailableFrom(),
                request.getAvailableTo()
        );

        return new ResponseEntity<>(
                availabilityService.addAvailability(availability),
                HttpStatus.CREATED
        );
    }

    // Get availability by doctor
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<DoctorAvailability>> getAvailability(
            @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                availabilityService.getAvailabilityByDoctor(doctorId)
        );
    }
}
