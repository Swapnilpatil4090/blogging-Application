package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Follower;
import com.app.pojos.User;

public interface FollowerRepository extends JpaRepository<Follower, Long> {
	
	Follower findByFollowerAndFollowing(User follower, User following);

}
