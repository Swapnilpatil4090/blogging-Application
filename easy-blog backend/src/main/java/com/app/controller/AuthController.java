package com.app.controller;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

import javax.validation.Valid;

import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.app.Exceptions.ApiException;
import com.app.pojos.User;
import com.app.security.JwtTokenHelper;
import com.app.services.UserService;

import payloads.JwtAuthRequest;
import payloads.JwtAuthResponse;
import payloads.UserDto;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired 
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@Valid@RequestBody JwtAuthRequest request) throws Exception{
		this.authenticate(request.getUsername(),request.getPassword());
		UserDetails userDetail=this.userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.jwtTokenHelper.generateToken(userDetail);
		JwtAuthResponse res = new JwtAuthResponse();
		res.setToken(token);
		res.setUser(this.mapper.map((User)userDetail,UserDto.class));
		return new ResponseEntity<>(res,HttpStatus.OK);
	}

	private void authenticate(String username, String password) throws Exception {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
		try {
		this.authenticationManager.authenticate(authenticationToken);
		}catch(BadCredentialsException e) {
			throw new ApiException("Invalid username or Password");
		}
	
	}
	
	@PostMapping("/register")
	private ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto )throws SQLException {
		
		UserDto registeredUser =this.userService.registerNewUser(userDto);
	
		return new ResponseEntity<>(registeredUser,HttpStatus.CREATED);
	}
}
