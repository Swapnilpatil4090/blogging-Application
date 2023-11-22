package com.app.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.config.AppConstants;
import com.app.services.FileService;
import com.app.services.PostService;


import payloads.ApiResponse;
import payloads.PostDto;
import payloads.PostResponse;

@RestController
@RequestMapping("/")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	 private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	
	@PostMapping("user/{userId}/category/{categoryId}/posts")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto,@PathVariable Integer userId, @PathVariable Integer categoryId){
		PostDto newPost = this.postService.createPost(postDto, userId, categoryId);
		return new ResponseEntity<PostDto>(newPost,HttpStatus.CREATED);
	}
	
	
	@GetMapping("user/{userId}/posts")
	public ResponseEntity<List<PostDto>> getPostByUser(@PathVariable Integer userId){
		List<PostDto> postDtos = this.postService.getPostsByUser(userId);
		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
	}
	
	@GetMapping("category/{categoryId}/posts")
	public ResponseEntity<List<PostDto>> getPostByCategory(@PathVariable Integer categoryId){
		List<PostDto> postDtos = this.postService.getPostsByCategory(categoryId);
		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
	}
	
	
	@GetMapping("posts")
	public ResponseEntity<PostResponse> getAllPost(
			@RequestParam(value="pageNumber",defaultValue=AppConstants.PAGE_NUMBER,required = false)Integer pageNumber,
			@RequestParam(value="pageSize",defaultValue=AppConstants.PAGE_SIZE,required=false)Integer pageSize,
			@RequestParam(value="sortBy",defaultValue=AppConstants.SORT_BY,required=false)String sortBy,
			@RequestParam(value="sortDir",defaultValue=AppConstants.SORT_DIR,required=false)String sortDir){
		PostResponse postRes = this.postService.getAllPost(pageNumber,pageSize,sortBy,sortDir);
		return new ResponseEntity<PostResponse>(postRes,HttpStatus.OK);
	}
	
	@GetMapping("posts/{postId}")
	public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId){
		PostDto post = this.postService.getPostById(postId);
		return new ResponseEntity<PostDto>(post,HttpStatus.OK);
	}
	
	
	@PutMapping("posts/{postId}")
	public ResponseEntity<PostDto>updatePost(@RequestBody PostDto postDto,@PathVariable Integer postId){
		PostDto updatedPost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updatedPost,HttpStatus.OK);
	}
	
	
	@DeleteMapping("posts/{postId}")
	public ApiResponse deletePost(@PathVariable Integer postId) {
		this.postService.deletePost(postId);
		return new ApiResponse("post Successfully Deleted",true);
	}
	
	
	@GetMapping("posts/search/{keyWords}")
	public ResponseEntity<List<PostDto>> searchPostByTitle(@PathVariable String keyWords){
		
		List<PostDto> postDto =this.postService.searchPost(keyWords);
		
		return new ResponseEntity<List<PostDto>>(postDto,HttpStatus.OK);
		
	}
	
	@PostMapping("posts/image/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostImage(@RequestParam("image") MultipartFile image,
			@PathVariable Integer postId) throws IOException{
		PostDto post = this.postService.getPostById(postId);
		String fileName=this.fileService.uploadImage(path,image);
		
		post.setImageName(fileName);
		PostDto postDto = this.postService.updatePost(post,postId);
		return  new ResponseEntity<PostDto> (postDto,HttpStatus.OK);
		
	}
	
	@GetMapping(value="posts/image/{imageName}",produces= MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable String imageName,HttpServletResponse response)throws IOException{
		InputStream resource = this.fileService.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource,response.getOutputStream());
	}
}
