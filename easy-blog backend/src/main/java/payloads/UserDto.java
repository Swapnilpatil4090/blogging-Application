package payloads;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@NoArgsConstructor
@Setter
@Getter
public class UserDto {
	
	private int UserId;
	@NotNull
	@NotEmpty(message= "User name is required")
	@Size(min=4,message = "Username must be minimum of 4 characters")
	private String name;
	
	@NotNull
	@Email(message = " Email Address is not valid !! ")
	@NotEmpty(message=" Email is Required ")
	private String email;
	
	@NotNull
	@NotEmpty(message= "password is required")
	@Size(min = 3, max = 10, message = " password must me min of 3 characters and max of 10 characters !!")
	private String password;
	
	
	@NotNull
	@NotEmpty(message= "about is required")
	private String about;
	
	private Set<RoleDto> roles = new HashSet<>(); 
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

}
