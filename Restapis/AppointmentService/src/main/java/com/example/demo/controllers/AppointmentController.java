package com.example.demo.controllers;

import com.example.demo.dto.AppointmentRequest;
import com.example.demo.dto.AppointmentResponse;
import com.example.demo.entities.Appointment;
import com.example.demo.services.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Book appointment
    @PostMapping
    public ResponseEntity<AppointmentResponse> bookAppointment(
            @RequestBody AppointmentRequest request) {

        Appointment appointment = new Appointment(
                request.getPatientId(),
                request.getDoctorId(),
                request.getAppointmentDate(),
                request.getSlotTime(),
                null
        );

        Appointment saved = appointmentService.bookAppointment(appointment);

        return new ResponseEntity<>(mapToResponse(saved), HttpStatus.CREATED);
    }

    // Cancel appointment
    @PutMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancelAppointment(
            @PathVariable Integer id) {

        Appointment cancelled = appointmentService.cancelAppointment(id);
        return ResponseEntity.ok(mapToResponse(cancelled));
    }

    // Patient appointment history
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatient(
            @PathVariable Integer patientId) {

        List<AppointmentResponse> response = appointmentService
                .getAppointmentsByPatient(patientId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // Doctor appointments
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDoctor(
            @PathVariable Integer doctorId) {

        List<AppointmentResponse> response = appointmentService
                .getAppointmentsByDoctor(doctorId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // Utility mapper
    private AppointmentResponse mapToResponse(Appointment appointment) {
        AppointmentResponse response = new AppointmentResponse();
        response.setAppointmentId(appointment.getAppointmentId());
        response.setPatientId(appointment.getPatientId());
        response.setDoctorId(appointment.getDoctorId());
        response.setAppointmentDate(appointment.getAppointmentDate());
        response.setSlotTime(appointment.getSlotTime());
        response.setStatus(appointment.getStatus());
        return response;
    }
}