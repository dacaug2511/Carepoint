package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Bill;

import org.springframework.stereotype.Repository;
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {

}
