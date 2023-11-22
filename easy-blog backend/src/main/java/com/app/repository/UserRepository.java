package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer>{
	
	Optional<User> findByEmail(String email);

}
