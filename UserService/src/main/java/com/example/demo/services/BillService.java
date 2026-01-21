package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Bill;
import com.example.demo.repositories.BillRepository;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepo;

    public Bill save(Bill bill) {
        return billRepo.save(bill);
    }

    
}
