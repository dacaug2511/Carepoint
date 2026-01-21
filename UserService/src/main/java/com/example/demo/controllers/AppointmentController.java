package com.example.demo.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Appointment;
import com.example.demo.services.AppointmentService;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/getall")
    public List<Appointment> getAll() {
        return appointmentService.getAll();
    }

    @PostMapping("/save")
    public Appointment save(@RequestBody Appointment appointment) {
        return appointmentService.save(appointment);
    }

}
