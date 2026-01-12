package com.javaclass.monolith_proj.service;

import com.javaclass.monolith_proj.dto.CreateEmployeeDTO;
import com.javaclass.monolith_proj.entity.Department;
import com.javaclass.monolith_proj.entity.Employee;
import com.javaclass.monolith_proj.exception.EmployeeNotFound;
import com.javaclass.monolith_proj.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;

@Service
public class EmployeeServiceImp implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    DepartmentService departmentService;

    @Override
    public Employee create(CreateEmployeeDTO data) {
        Department dept = this.departmentService.getById(data.getDeptId());

        Employee emp = Employee.builder()
                .name(data.getName())
                .salary(data.getSalary())
                .dept(dept)
                .build();

        return this.employeeRepository.save(emp);
    }

    @Override
    public Employee getById(Long id) {
        return this.employeeRepository.findById(id).orElseThrow(EmpNotFoundException());
    }

    @Override
    public List<Employee> getAll() {
        return this.employeeRepository.findAll();
    }

    @Override
    public List<Employee> getAllByDept(Long deptId) {
        return this.employeeRepository.findByDeptId(deptId);
    }

    @Override
    public Employee update(Long id, CreateEmployeeDTO newEmp) {
        Employee updated = this.employeeRepository.findById(id).orElseThrow(EmpNotFoundException());
        System.out.println("DEPATMENT: " + newEmp.getDeptId());
        Department newDept = this.departmentService.getById(newEmp.getDeptId());

        updated.setName(newEmp.getName());
        updated.setSalary(newEmp.getSalary());
        updated.setDept(newDept);

        return this.employeeRepository.save(updated);
    }

    @Override
    public void deleteById(Long id) {
        this.employeeRepository.deleteById(id);
    }

    Supplier<EmployeeNotFound> EmpNotFoundException() {
        return () -> {
            return new EmployeeNotFound("Employee Not Found");
        };
    }
}
