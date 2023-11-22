package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.config.AppConstants;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.repository.RoleRepo;
import com.app.repository.UserRepository;

import payloads.UserDto;
@Service
public class userServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Override
	public UserDto createUser(UserDto userDto) {
		User user = this.dtoToUser(userDto);
		User savedUser =this.userRepo.save(user);
		return this.userToDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
      User user = this.userRepo.findById(userId)
    		  .orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
       
      user.setName(userDto.getName());
      user.setEmail(userDto.getEmail());
      user.setPassword(userDto.getPassword());
      user.setAbout(userDto.getAbout());
      
      User updatedUser = this.userRepo.save(user);
      return this.userToDto(updatedUser);
      
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user= this.userRepo.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("User","Id",userId));
		return this.userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = this.userRepo.findAll();
		List<UserDto> userDtos = users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
        User user=this.userRepo.findById(userId)
        		.orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
        this.userRepo.delete(user);
	}
	
	
	public User dtoToUser(UserDto userDto) {
		
//		ModelMapper will map userDto to User class
		User user = this.modelMapper.map(userDto, User.class);
		
//		user.setUserId(userDto.getUserId());
//		user.setName(userDto.getName());
//		user.setEmail(userDto.getEmail());
//		user.setPassword(userDto.getPassword());
//		user.setAbout(userDto.getAbout());
		return user;
		
	}
	
	public UserDto userToDto (User user) {
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		
				
//		userDto.setUserId(user.getUserId());
//		userDto.setName(user.getName());
//		userDto.setEmail(user.getEmail());
//		userDto.setPassword(user.getPassword());
//		userDto.setAbout(user.getAbout());
		return userDto;
		
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user =this.modelMapper.map(userDto,User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		Role role= this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		user.getRoles().add(role);
		User newUser = this.userRepo.save(user);
		return this.modelMapper.map(newUser,UserDto.class);
	}

}
