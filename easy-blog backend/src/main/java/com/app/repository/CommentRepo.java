package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
