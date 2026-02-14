package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

public class LoginResponse {

    private Integer userId;
    private String uname;
    private String role;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer patientId; // only for PATIENT
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer doctorId;  // only for DOCTOR

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUname() {
        return uname;
    }

    public void setUsername(String uname) {
        this.uname = uname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }
}
