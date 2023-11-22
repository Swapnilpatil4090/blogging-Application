package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.services.CommentService;

import payloads.ApiResponse;
import payloads.CommentDto;

@RestController
@RequestMapping("/")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@PostMapping("posts/{postId}/comment")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto, @PathVariable Integer postId){
		
		CommentDto saved = this.commentService.createComment(commentDto,postId);
	
   return new ResponseEntity<>(saved,HttpStatus.CREATED);
	}
	
	@DeleteMapping("Comments/{commentId}")
	public ResponseEntity<ApiResponse> deleteComment( @PathVariable Integer commentId){
		
		
		this.commentService.deleteComment(commentId);
	
   return new ResponseEntity<>(new ApiResponse("Comment deleted Successfully",true),HttpStatus.OK);
	}
	
}
