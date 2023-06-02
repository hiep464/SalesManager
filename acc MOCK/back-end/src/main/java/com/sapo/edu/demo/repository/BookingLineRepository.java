package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.BookingLineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingLineRepository extends JpaRepository<BookingLineEntity,Long> {
}
