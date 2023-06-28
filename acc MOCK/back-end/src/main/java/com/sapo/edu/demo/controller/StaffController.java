package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Staff;
import com.sapo.edu.demo.service.StaffServicce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Validated
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {
    @Autowired
    StaffServicce staffServicce;

    @GetMapping("/staff")
    public List<Staff> getAllStaff(){
        return staffServicce.getAll();
    }
    @GetMapping("/staffs/inventory")
    public List<Staff> getInventoryStaff(){
        return staffServicce.getInventoryStaff();
    }
}
