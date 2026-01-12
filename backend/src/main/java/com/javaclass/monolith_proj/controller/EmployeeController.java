package com.javaclass.monolith_proj.controller;

import com.javaclass.monolith_proj.dto.CreateEmployeeDTO;
import com.javaclass.monolith_proj.entity.Employee;
import com.javaclass.monolith_proj.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emp/")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(this.employeeService.getAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.employeeService.getById(id));
    }

    @GetMapping("dept/{id}")
    public ResponseEntity<List<Employee>> getEmployeesByDept(@PathVariable("id") Long deptId) {
        return ResponseEntity.ok(this.employeeService.getAllByDept(deptId));
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody CreateEmployeeDTO employee) {
        return ResponseEntity.ok(this.employeeService.create(employee));
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id, @RequestBody CreateEmployeeDTO employee) {
        System.out.println("UPDATING " + employee);

        return ResponseEntity.ok(this.employeeService.update(id, employee));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id) {
        this.employeeService.deleteById(id);

        return ResponseEntity.ok("DELETED EMPLOYEE");
    }
}
