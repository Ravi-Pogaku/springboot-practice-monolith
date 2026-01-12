package com.javaclass.monolith_proj.service;

import com.javaclass.monolith_proj.dto.CreateDepartmentDTO;
import com.javaclass.monolith_proj.entity.Department;

import java.util.List;

public interface DepartmentService {
    Department create(CreateDepartmentDTO data);
    Department getById(Long id);
    List<Department> getAll();
    Department update(Long id, Department newDept);
    void deleteById(Long id);
}
