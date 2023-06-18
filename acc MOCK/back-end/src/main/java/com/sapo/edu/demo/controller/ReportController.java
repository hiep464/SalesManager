package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Report;
import com.sapo.edu.demo.service.OrderService;
import com.sapo.edu.demo.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class ReportController {
    ReportService reportService;
    OrderService orderService;

    public ReportController(ReportService reportService,OrderService orderService) {
        this.reportService = reportService;
        this.orderService = orderService;
    }

    @GetMapping("/reports")
    public Map<String, Object> createReportData(@RequestParam(name = "staff code") String staffCode, @RequestParam(name = "start date") String start, @RequestParam(name = "end date") String end){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dateS = LocalDate.parse(start,formatter);
        LocalDate dateE = LocalDate.parse(end,formatter);
        Map<String, Object> newReportData = orderService.getReportInfo(staffCode,dateS,dateE);
        return newReportData;
    }
}
