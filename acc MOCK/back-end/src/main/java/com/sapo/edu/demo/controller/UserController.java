package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.authentication.CustomUserDetails;
import com.sapo.edu.demo.authentication.JwtTokenProvider;
import com.sapo.edu.demo.request.LoginRequest;
import com.sapo.edu.demo.response.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController("UserController")
@RequestMapping("/admin/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("login")
    public LoginResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        System.out.println(authentication.getAuthorities());

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return new LoginResponse(jwt);
    }

    @GetMapping("/profile")
    public Long getInfo(@RequestParam(name = "Authorization", required = true) String Authorization){
        return tokenProvider.getUserIdFromJWT(Authorization);
    }
}
