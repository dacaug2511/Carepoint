package com.example.demo.entities;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "doctor_availability")
public class DoctorAvailability {

    @EmbeddedId
    private DoctorAvailabilityId id;

    @Column(name = "available_from", nullable = false)
    private LocalTime availableFrom;

    @Column(name = "available_to", nullable = false)
    private LocalTime availableTo;

    public DoctorAvailability() {}

    public DoctorAvailability(DoctorAvailabilityId id) {
        this.id = id;
    }

    public DoctorAvailabilityId getId() {
        return id;
    }
    
    public void setId(DoctorAvailabilityId id) {
        this.id = id;
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
