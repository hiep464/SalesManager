package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Staff;
import com.sapo.edu.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    @Query("select s.name as name , s.code as code from Staff s "
            +"join User u on u.staffCode = s.code "
            +"where u.id = :id"
    )
    public Map<String, Object> getUserInfoById(Integer id);
    User findByStaffCode(String staffCode);
    List<User> findByRole(String role);
}
