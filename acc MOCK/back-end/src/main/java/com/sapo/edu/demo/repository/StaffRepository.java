package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff,String> {
}
