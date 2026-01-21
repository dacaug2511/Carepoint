package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "specialization")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer specialization_id;

    @Column(name = "specialization_name", unique = true, nullable = false)
    private String specialization_name;

    // getters & setters
	public Integer getSpecialization_id() {
		return specialization_id;
	}

	public void setSpecialization_id(Integer specialization_id) {
		this.specialization_id = specialization_id;
	}

	public String getSpecialization_name() {
		return specialization_name;
	}

	public void setSpecialization_name(String specialization_name) {
		this.specialization_name = specialization_name;
	}

   
    
}
