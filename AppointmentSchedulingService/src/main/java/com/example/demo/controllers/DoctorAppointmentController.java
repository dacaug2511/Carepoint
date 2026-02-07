package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Appointment;
import com.example.demo.services.AppointmentService;

@RestController
@RequestMapping("/api/doctor/appointments")
public class DoctorAppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/{doctorId}/{date}")
    public List<Appointment> getDoctorAppointments(
            @PathVariable int doctorId,
            @PathVariable String date
    ) {
        return appointmentService.getDoctorAppointmentsByDate(
                doctorId,
                LocalDate.parse(date)
        );
    }
}

