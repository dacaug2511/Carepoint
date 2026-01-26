package com.example.demo.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class DoctorAvailabilityId implements Serializable {

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "day")
    private DayOfWeekEnum day;

    public DoctorAvailabilityId() {}

    public DoctorAvailabilityId(Integer doctorId, DayOfWeekEnum day) {
        this.doctorId = doctorId;
        this.day = day;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public DayOfWeekEnum getDay() {
        return day;
    }

    public void setDay(DayOfWeekEnum day) {
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DoctorAvailabilityId)) return false;
        DoctorAvailabilityId that = (DoctorAvailabilityId) o;
        return Objects.equals(doctorId, that.doctorId) && day == that.day;
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorId, day);
    }
}
