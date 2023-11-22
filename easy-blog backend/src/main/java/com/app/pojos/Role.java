package com.app.pojos;

import javax.persistence.*;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Role {
	@Id
	
	private int id;
	
	private String name;
}
