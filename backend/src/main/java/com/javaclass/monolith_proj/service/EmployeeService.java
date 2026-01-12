package com.javaclass.monolith_proj.service;

import com.javaclass.monolith_proj.dto.CreateEmployeeDTO;
import com.javaclass.monolith_proj.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee create(CreateEmployeeDTO data);
    Employee getById(Long id);
    List<Employee> getAll();
    List<Employee> getAllByDept(Long deptId);
    Employee update(Long id, CreateEmployeeDTO newEmp);
    void deleteById(Long id);
}
