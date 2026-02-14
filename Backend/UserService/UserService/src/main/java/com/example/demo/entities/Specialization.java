package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="specialization")
public class Specialization {
	@Id
	@Column(name="specialization_id")
	private int specializationId;
	
	@Column
	private String specializationName;

	public int getSpecializationId() {
		return specializationId;
	}

	public void setSpecializationId(int specializationId) {
		this.specializationId = specializationId;
	}

	public String getSpecializationName() {
		return specializationName;
	}

	public void setSpecialization_name(String specializationName) {
		this.specializationName = specializationName;
	}
	
}
