package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface StaffRepository extends JpaRepository<Staff,String> {

    Staff findByName(String name);

    List<Staff> findAllByRole(String role);
}
