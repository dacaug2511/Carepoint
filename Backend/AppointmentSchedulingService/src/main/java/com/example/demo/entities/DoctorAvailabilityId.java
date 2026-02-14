package com.example.demo.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class DoctorAvailabilityId implements Serializable {

    @Column(name = "doctor_id")
    private int doctorId;

    @Column(name = "day")
    private String day;

    public DoctorAvailabilityId() {
    }

    public DoctorAvailabilityId(int doctorId, String day) {
        this.doctorId = doctorId;
        this.day = day;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DoctorAvailabilityId)) return false;
        DoctorAvailabilityId that = (DoctorAvailabilityId) o;
        return doctorId == that.doctorId &&
                Objects.equals(day, that.day);
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorId, day);
    }
}
