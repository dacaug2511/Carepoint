package com.example.demo.controllers;

import com.example.demo.dto.AvailableSlotResponse;
import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.dto.RescheduleRequest;
import com.example.demo.entities.Appointment;
import com.example.demo.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
//@CrossOrigin
public class PatientAppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/available-slots")
    public List<AvailableSlotResponse> getAvailableSlots(
            @RequestParam int doctorId,
            @RequestParam String date
    ) {
        LocalDate appointmentDate =
                LocalDate.parse(date);

        return appointmentService
                .getAvailableSlots(doctorId, appointmentDate);
    }
    
//    @PostMapping("/book")
//    public Appointment bookAppointment(
//            @RequestBody BookAppointmentRequest request
//    ) {
//        return appointmentService.bookAppointment(request);
//    }
//    
    
    @PutMapping("/cancel/{appointmentId}")
    public Appointment cancelAppointment(
            @PathVariable int appointmentId
    ) {
        return appointmentService.cancelAppointment(appointmentId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(
            @PathVariable int patientId
    ) {
        return appointmentService.getPatientAppointments(patientId);
    }
    
    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(
            @RequestBody BookAppointmentRequest request) {

        appointmentService
                .confirmAppointmentAfterPayment(request);
        System.out.println("Patient ID from request: " + request.getPatientId());/////debug 


        return ResponseEntity.ok("Appointment booked successfully");
    }

    @PutMapping("/reschedule/{id}")
    public ResponseEntity<Appointment> reschedule(
            @PathVariable int id,
            @RequestBody RescheduleRequest req) {

        return ResponseEntity.ok(
            appointmentService.rescheduleAppointment(
                id,req
            )
        );
    }
    
    @GetMapping("/available-dates/{doctorId}")
    public List<LocalDate> getAvailableDatesForReschedule(
            @PathVariable int doctorId) {
        return appointmentService.getAvailableDatesForReschedule(doctorId);
    }



}

