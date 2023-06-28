package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.History;
import com.sapo.edu.demo.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @GetMapping("/history")
    List<History> findTop5ByHistoryDate(){
        return historyService.findTop5ByHistoryDate();
    }
}
