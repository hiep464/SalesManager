package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.ProductDto;
import com.sapo.edu.demo.entities.Order;
import com.sapo.edu.demo.entities.Report;
import com.sapo.edu.demo.entities.Staff;
import com.sapo.edu.demo.service.OrderService;
import com.sapo.edu.demo.service.ReportService;
import com.sapo.edu.demo.service.StaffServicce;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/admin/sales")
@CrossOrigin("*")
public class ReportController {
    ReportService reportService;
    OrderService orderService;
    StaffServicce staffServicce;

    public ReportController(ReportService reportService,OrderService orderService,StaffServicce staffServicce) {
        this.reportService = reportService;
        this.orderService = orderService;
        this.staffServicce = staffServicce;
    }

    @GetMapping("/reports")
    public Map<String, Object> createReportData(@RequestParam(name = "staff code") String staffCode, @RequestParam(name = "start date") String start, @RequestParam(name = "end date") String end){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dateS = LocalDate.parse(start,formatter);
        LocalDate dateE = LocalDate.parse(end,formatter);
        Map<String, Object> newReportData = orderService.getReportInfo(staffCode,dateS,dateE);
        return newReportData;
    }

    @GetMapping("/reports/orders")
    public List<Order> getReportOrders(@RequestParam(name = "staff code") String staffCode, @RequestParam(name = "start date") String start, @RequestParam(name = "end date") String end){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dateS = LocalDate.parse(start,formatter);
        LocalDate dateE = LocalDate.parse(end,formatter);
        return orderService.getDetailOrderOnReport(staffCode,dateS,dateE);
    }
    
    @GetMapping("/reports/staff")
    public List<Map<String, Object>> getReportforAllSalesStaff( @RequestParam(name = "start date") String start, @RequestParam(name = "end date") String end){
        List<Staff>  staffs = staffServicce.getAllbyRole();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dateS = LocalDate.parse(start,formatter);
        LocalDate dateE = LocalDate.parse(end,formatter);
        List<Map<String, Object>> Reports = new ArrayList<Map<String, Object>>();
        for(Staff staff : staffs){
            Map<String, Object> report = orderService.getReportInfo(staff.getCode(),dateS,dateE);
            Map<String, Object> staffReport = new HashMap<>();
            Map<String, Object> staffMap = staff.toMap();
            staffReport.putAll(staffMap);
            staffReport.putAll(report);
            Reports.add(staffReport);
        }
        return Reports;
    }
}
