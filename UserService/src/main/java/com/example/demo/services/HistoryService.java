package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.History;
import com.example.demo.repositories.HistoryRepository;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepo;

    public List<History> getAll() {
        return historyRepo.findAll();
    }


    public History save(History history) {
        return historyRepo.save(history);
    }
}
