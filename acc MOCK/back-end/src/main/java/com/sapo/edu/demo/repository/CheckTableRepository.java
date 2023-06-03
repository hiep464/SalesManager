package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.CheckTableEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckTableRepository extends JpaRepository<CheckTableEntity, String> {
}
