package com.example.demo.entities;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "doctor_availability")
@IdClass(DoctorAvailabilityId.class)
public class DoctorAvailability {

    @Id
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Id
    @Column(name = "day")
    private String day;  

    @Column(name = "available_from", nullable = false)
    private LocalTime availableFrom;

    @Column(name = "available_to", nullable = false)
    private LocalTime availableTo;

    public DoctorAvailability() {}

    public DoctorAvailability(Integer doctorId, String day,
                              LocalTime availableFrom, LocalTime availableTo) {
        this.doctorId = doctorId;
        this.day = day;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
    }

    // Getters and Setters

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public LocalTime getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalTime availableFrom) {
        this.availableFrom = availableFrom;
    }

    public LocalTime getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(LocalTime availableTo) {
        this.availableTo = availableTo;
    }
}
