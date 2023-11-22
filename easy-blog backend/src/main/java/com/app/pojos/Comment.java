package com.app.pojos;

import javax.persistence.*;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="comments")
public class Comment {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String content;
	
	@ManyToOne
	private Post post;
}
