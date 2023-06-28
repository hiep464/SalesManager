package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Staff;
import com.sapo.edu.demo.entities.User;
import com.sapo.edu.demo.repository.StaffRepository;
import com.sapo.edu.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffServicce {
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    UserRepository userRepository;

    public List<Staff> getAll() {
        return staffRepository.findAll();
    }
    public List<Staff> getInventoryStaff() {
        List<User> users = userRepository.findByRole("INVENTORY");
        List<User> admins = userRepository.findByRole("ADMIN");

        List<Staff> staffs = new ArrayList<Staff>();
        for(User user : users) {
            Staff staff = staffRepository.findById(user.getStaffCode()).get();
            staffs.add(staff);

        }
        for(User user : admins) {
            Staff staff = staffRepository.findById(user.getStaffCode()).get();
            staffs.add(staff);
        }
        return staffs;
    }
}
