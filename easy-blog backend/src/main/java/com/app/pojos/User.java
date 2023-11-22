package com.app.pojos;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@Table(name="users")
@Entity
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int userId;
	
	@Column(length=100,nullable=false)
	private String name;
	
	
	@Column(unique = true)
	private String email;
	
	
	@Column(nullable=false)
	private String password;
	
	private String about;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch= FetchType.LAZY)
	private List<Post> posts= new ArrayList<>();
	
	@ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@JoinTable(name="user_role",
	joinColumns=@JoinColumn(name="user",referencedColumnName="userId"),
	inverseJoinColumns=@JoinColumn(name="role",referencedColumnName="id"))
	private Set<Role> roles= new HashSet<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = this.roles.stream().map(role->new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
			return authorities;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
