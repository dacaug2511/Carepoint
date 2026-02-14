package com.example.demo.dto;


import java.time.LocalDate;
import java.time.LocalTime;

public class AvailableSlotResponse {

    private LocalDate date;
    private LocalTime slotTime;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getSlotTime() {
        return slotTime;
    }

    public void setSlotTime(LocalTime slotTime) {
        this.slotTime = slotTime;
    }
}

