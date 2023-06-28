package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByStaffCode(String staffCode);
    List<User> findByRole(String role);
}
