package com.javaclass.monolith_proj.service;

import com.javaclass.monolith_proj.dto.CreateDepartmentDTO;
import com.javaclass.monolith_proj.entity.Department;
import com.javaclass.monolith_proj.exception.DepartmentNotFound;
import com.javaclass.monolith_proj.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;

@Service
public class DepartmentServiceImp implements DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public Department create(CreateDepartmentDTO data) {
        Department dept = Department.builder()
                .name(data.getName())
                .build();

        return this.departmentRepository.save(dept);
    }

    @Override
    public Department getById(Long id) {
        return this.departmentRepository.findById(id).orElseThrow(DeptNotFoundException());
    }

    @Override
    public List<Department> getAll() {
        return this.departmentRepository.findAll();
    }

    @Override
    public Department update(Long id, Department newDept) {
        Department updated = this.departmentRepository.findById(id).orElseThrow(DeptNotFoundException());

        updated.setName(newDept.getName());

        return this.departmentRepository.save(updated);
    }

    @Override
    public void deleteById(Long id) {
        this.departmentRepository.deleteById(id);
    }

    Supplier<DepartmentNotFound> DeptNotFoundException() {
        return () -> {
            return new DepartmentNotFound("Department Not Found");
        };
    }
}
