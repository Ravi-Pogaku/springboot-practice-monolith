package com.javaclass.monolith_proj.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFound.class)
    public ResponseEntity<ErrorResponse> handleEmployeeNotFound(EmployeeNotFound e, WebRequest w) {
        ErrorResponse err =ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("NOT FOUND")
                .message(e.getMessage())
                .path(w.getDescription(false))
                .build();

        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DepartmentNotFound.class)
    public ResponseEntity<ErrorResponse> handleDepartmentNotFound(DepartmentNotFound d, WebRequest w) {
        ErrorResponse err =ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("NOT FOUND")
                .message(d.getMessage())
                .path(w.getDescription(false))
                .build();

        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }
}
