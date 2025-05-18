package com.bidbuy.service;

import com.bidbuy.dto.AuthResponse;
import com.bidbuy.dto.LoginRequest;
import com.bidbuy.dto.RegisterRequest;
import com.bidbuy.dto.UserDto;
import com.bidbuy.entity.User;
import com.bidbuy.repository.UserRepository;
import com.bidbuy.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        var user = User.builder()
            .email(request.getEmail())
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .bidBalance(10) // Give 10 free bids on registration
            .build();
        
        var savedUser = userRepository.save(user);
        var token = jwtService.generateToken(user);
        
        return AuthResponse.builder()
            .token(token)
            .user(mapToUserDto(savedUser))
            .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        var token = jwtService.generateToken(user);
        
        return AuthResponse.builder()
            .token(token)
            .user(mapToUserDto(user))
            .build();
    }
    
    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
            .id(user.getId())
            .email(user.getEmail())
            .username(user.getUsername())
            .bidBalance(user.getBidBalance())
            .avatar(user.getAvatar())
            .build();
    }
}