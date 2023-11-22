package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.pojos.User;
import com.app.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {
	 @Autowired 
	 private UserRepository userRepo;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	
		User user = this.userRepo.findByEmail(username).orElseThrow(()-> new ResourceNotFoundException("User","Email : "+username,0));
		return user;
	}

}
