package com.javaclass.monolith_proj.repository;
import com.javaclass.monolith_proj.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDeptId(Long id);
}
