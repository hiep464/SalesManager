package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.CheckTableEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CheckTableRepository extends JpaRepository<CheckTableEntity, String> {



    CheckTableEntity findByCode(String code);
}
