package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository

public interface SupplierRepository extends JpaRepository<SupplierEntity, String> {
    List<SupplierEntity> findByCodeContaining(String code);
    Optional<SupplierEntity> findByCode(String code);
    Optional<SupplierEntity> findByName(String name);
    List<SupplierEntity> findByNameContainingIgnoreCase(String name);
}
