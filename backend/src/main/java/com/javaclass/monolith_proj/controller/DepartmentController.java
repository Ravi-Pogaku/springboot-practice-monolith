package com.javaclass.monolith_proj.controller;

import com.javaclass.monolith_proj.dto.CreateDepartmentDTO;
import com.javaclass.monolith_proj.entity.Department;
import com.javaclass.monolith_proj.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dept/")
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(this.departmentService.getAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Department> getDepartment(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.departmentService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody CreateDepartmentDTO data) {
        return ResponseEntity.ok(this.departmentService.create(data));
    }

    @PutMapping("{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable("id") Long id, @RequestBody Department data) {
        return ResponseEntity.ok(this.departmentService.update(id, data));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long id) {
        this.departmentService.deleteById(id);

        return ResponseEntity.ok("DELETED DEPARTMENT");
    }
}
