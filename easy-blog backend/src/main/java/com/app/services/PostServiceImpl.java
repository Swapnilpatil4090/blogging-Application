package com.app.services;

import java.util.Date;
import java.util.List;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.pojos.Category;
import com.app.pojos.Post;
import com.app.pojos.User;
import com.app.repository.CategoryRepo;
import com.app.repository.PostRepository;
import com.app.repository.UserRepository;

import payloads.PostDto;
import payloads.PostResponse;
@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	PostRepository postRepo;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	CategoryRepo categoryRepo;

	@Override
	public PostDto createPost(PostDto postDto,Integer userId,Integer categoryId) {
    User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","userId",userId));
	Category category = this.categoryRepo.findById(categoryId)
			.orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
	
	Post post = this.modelMapper.map(postDto,Post.class);
    post.setImageName("default.png");
    post.setAddedDate(new Date());
    post.setUser(user);
    post.setCategory(category);
    
    Post newPost = this.postRepo.save(post);
		return this.modelMapper.map(newPost,PostDto.class);
	}

	
	
	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		 Post post = this.postRepo.findById(postId)
	    		 .orElseThrow(()-> new ResourceNotFoundException("Post","postId",postId));
		      post.setTitle(postDto.getTitle());
		      post.setContent(postDto.getContent());
		      post.setImageName(postDto.getImageName());
		   Post updatedPost= this.postRepo.save(post);
 		return this.modelMapper.map(updatedPost,PostDto.class);
	}

	@Override
	public void deletePost(Integer postId) {
     Post post = this.postRepo.findById(postId)
    		 .orElseThrow(()-> new ResourceNotFoundException("Post","postId",postId));
     this.postRepo.delete(post);
     
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc"))?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
		
		Pageable p = PageRequest.of(pageNumber,pageSize,sort);
		
		Page<Post> pagePost= this.postRepo.findAll(p) ;
		 List<Post> posts=pagePost.getContent();
		List<PostDto> postDtos = posts.stream()
				.map((post)->this.modelMapper.map(post,PostDto.class)).collect(Collectors.toList());
		
		PostResponse postRes = new PostResponse();
		postRes.setContent(postDtos);
		postRes.setPageNumber(pagePost.getNumber());
		postRes.setPageSize(pagePost.getSize());
		postRes.setTotalElements(pagePost.getTotalElements());
		postRes.setTotalPages(pagePost.getTotalPages());
		postRes.setLastPage(pagePost.isLast());
		
		return postRes;
	}
	

	@Override
	public PostDto getPostById(Integer postId) {
		Post post = this.postRepo.findById(postId)
				.orElseThrow(()-> new ResourceNotFoundException("Post","PostId", postId));
          return this.modelMapper.map(post,PostDto.class);
	}
	

	@Override
	public List<PostDto> getPostsByCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
		List<Post> posts = this.postRepo.findByCategory(cat);
		List<PostDto> postDtos = posts.stream()
				.map(post->this.modelMapper.map(post,PostDto.class))
				.collect(Collectors.toList());
		return postDtos;
	}

	
	@Override
	public List<PostDto> getPostsByUser(Integer userId) {
     User user = this.userRepo.findById(userId)
    		 .orElseThrow(()->new ResourceNotFoundException("User","UserId",userId));
     List<Post> posts = this.postRepo.findByUser(user);
     List<PostDto> postDtos = posts.stream()
    		 .map(post->this.modelMapper.map(post,PostDto.class))
    		 .collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> searchPost(String keyword) {
		List<Post> posts = this.postRepo.findByTitleContaining(keyword);
		List<PostDto> postDtos = posts.stream()
				.map((post)->this.modelMapper.map(post,PostDto.class))
				.collect(Collectors.toList());
		return postDtos;
	}

}
