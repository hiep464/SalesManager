package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Staff;
import com.sapo.edu.demo.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServicce {
    @Autowired
    StaffRepository staffRepository;

    public List<Staff> getAll() {
        return staffRepository.findAll();
    }

    public List<Staff> getAllbyRole() {
        String role = "sales";
        return staffRepository.findAllByRole(role);
    }

}
