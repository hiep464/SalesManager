package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.History;
import com.sapo.edu.demo.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    @Autowired
    HistoryRepository historyRepository;


    public List<History> findTop5ByHistoryDate(){
        return historyRepository.findTop5ByOrderByHistoryDateDesc();
    }

}
