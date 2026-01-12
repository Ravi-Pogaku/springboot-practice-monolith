package com.javaclass.monolith_proj.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    String username;
    String errMsg;
}
