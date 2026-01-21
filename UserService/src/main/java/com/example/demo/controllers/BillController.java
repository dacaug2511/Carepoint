package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Bill;
import com.example.demo.services.BillService;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/save")
    public Bill save(@RequestBody Bill bill) {
        return billService.save(bill);
    }
}
