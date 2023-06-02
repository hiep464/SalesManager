package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<SupplierEntity, String> {
}
