package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.services.UserService;

import payloads.ApiResponse;
import payloads.UserDto;

@RestController
@RequestMapping("/users")
public class UserController {
	    @Autowired
		private UserService userService;
	    
	    //Create User
	    @PostMapping("/")
	    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){
			UserDto createUserDto= this.userService.createUser(userDto);
	    	
	    	return new ResponseEntity<>(createUserDto,HttpStatus.CREATED);
	    }
	    
	    // Update User
	    @PutMapping("/{userId}")
	    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto,@PathVariable Integer userId){
	    	UserDto updatedUser = this.userService.updateUser(userDto,userId);
	    	return ResponseEntity.ok(updatedUser);
	    }
	    
	    // Delete User
	    @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("/{userId}")
	    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId){
	    	this.userService.deleteUser(userId);
	    	return new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted Successfully", true),HttpStatus.OK);
	    	
	    }
	    
	    // Get All Users
	    @GetMapping("/")
	    public ResponseEntity<List<UserDto>> getAllUser(){
	    	List<UserDto> userDtos= this.userService.getAllUsers();
	    	return new ResponseEntity<>(userDtos,HttpStatus.OK);
	    }
	    
	    //Get Single User
	    @GetMapping("/{userId}")
	    public ResponseEntity<UserDto> getUser(@PathVariable Integer userId){
	    	UserDto userDto = this.userService.getUserById(userId);
	    	return new ResponseEntity<>(userDto, HttpStatus.OK);
	    }
	    
}


