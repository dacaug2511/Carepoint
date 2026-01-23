package com.example.demo.entities;

import java.math.BigDecimal;

public class DoctorRegister {

    // USER fields
    public String uname;
    public String firstname;
    public String lastname;
    public String password;
    public String phone;
    public String email;
    public String address;
    public String aadhaar;

    // DOCTOR fields
    public Integer specializationId;
    public String baseQualification;
    public String postQualification;
    public Integer experience;
    public BigDecimal consultationFee;
}