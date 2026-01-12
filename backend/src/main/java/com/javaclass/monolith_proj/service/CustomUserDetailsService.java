package com.javaclass.monolith_proj.service;

import com.javaclass.monolith_proj.entity.Employee;
import com.javaclass.monolith_proj.entity.MyUser;
import com.javaclass.monolith_proj.repository.EmployeeRepository;
import com.javaclass.monolith_proj.repository.MyUserRepository;
import com.javaclass.monolith_proj.repository.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    MyUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MyUser user = this.userRepository.findByUsername(username);

        System.out.println("user:"+user);

        if (user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }

        UserDetails userDetails = new UserPrinciple(user);

        return  userDetails;
    }
}
