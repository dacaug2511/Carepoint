package com.example.demo.dto;


import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RescheduleRequest {

	@JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate newDate;
	
	@JsonFormat(pattern = "HH:mm")
    private LocalTime newSlot;

    public RescheduleRequest() {}

    public LocalDate getNewDate() {
        return newDate;
    }

    public void setNewDate(LocalDate newDate) {
        this.newDate = newDate;
    }

    public LocalTime getNewSlot() {
        return newSlot;
    }

    public void setNewSlot(LocalTime newSlot) {
        this.newSlot = newSlot;
    }
}
