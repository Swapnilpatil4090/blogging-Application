package com.app.services;

import java.util.List;

import com.app.pojos.Post;

import payloads.PostDto;
import payloads.PostResponse;

public interface PostService {
	
	PostDto createPost(PostDto postDto,Integer userId, Integer categoryId);
	
	PostDto updatePost(PostDto postDto,Integer PostId);
	
	void deletePost(Integer postId);
	
	PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);
	
	PostDto getPostById(Integer postId);
	
	List<PostDto> getPostsByCategory(Integer categoryId);
	
	List<PostDto> getPostsByUser(Integer UserId);
	
	List<PostDto> searchPost(String keyword);
	
	

}
