package com.javaclass.monolith_proj.controller;

import com.javaclass.monolith_proj.dto.LoginResponseDTO;
import com.javaclass.monolith_proj.entity.MyUser;
import com.javaclass.monolith_proj.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/")
public class AuthController {
    @Autowired
    RegistrationService registrationService;

    @PostMapping("register")
    public String registerUser(@RequestBody MyUser user) {
        return this.registrationService.registerUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody MyUser user) {
        return this.registrationService.verify(user);
    }

    @PostMapping("logout")
    public ResponseEntity<String> logoutUser() {
        // httpOnly cookie so we should delete that manually.
        ResponseCookie clearCookie = ResponseCookie.from("access_token", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, String.valueOf(clearCookie)).body("LOGGED OUT");
    }
}
