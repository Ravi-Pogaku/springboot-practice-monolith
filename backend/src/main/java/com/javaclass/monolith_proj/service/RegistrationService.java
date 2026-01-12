package com.javaclass.monolith_proj.service;

import com.javaclass.monolith_proj.dto.LoginResponseDTO;
import com.javaclass.monolith_proj.entity.Employee;
import com.javaclass.monolith_proj.entity.MyUser;
import com.javaclass.monolith_proj.repository.EmployeeRepository;
import com.javaclass.monolith_proj.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    @Autowired
    JWTService jwtService;

    @Autowired
    MyUserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    BCryptPasswordEncoder bCrypt;

    public String registerUser(MyUser user) {
        user.setPassword(this.bCrypt.encode(user.getPassword()));
        MyUser u = this.userRepository.save(user);

        if (u == null) {
            return "REGISTRATION FAILURE";
        }

        return "REGISTRATION SUCCESS";
    }

    public ResponseEntity<LoginResponseDTO> verify(MyUser user) {
        try {
            Authentication auth = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            if (auth.isAuthenticated()) {
                String token = this.jwtService.generateToken(user.getUsername());
                ResponseCookie cookie = ResponseCookie.from("access_token", token)
                        .httpOnly(true)
                        .secure(true)
                        .sameSite("None")
                        .path("/")
                        .maxAge(60*60)
                        .build();

                return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, String.valueOf(cookie)).body(new LoginResponseDTO(user.getUsername(), null));
            }
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(new LoginResponseDTO(null, "AUTH FAILURE"), HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(new LoginResponseDTO(null, "VERIFY FAILURE"), HttpStatus.UNAUTHORIZED);
    }
}
