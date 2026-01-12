package com.javaclass.monolith_proj.dto;

import lombok.Data;

@Data
public class CreateEmployeeDTO {
    private String name;
    private double salary;
    private Long deptId;
}
