package payloads;

import javax.validation.constraints.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDto {
	
	private Integer categoryId;
	@NotBlank
	@Size(min=4,message="min size of title is 4")
	private String categoryTitle;
	
	@NotBlank
	@Size(min=10,message="min size of description is 10")
	private String categoryDescription;

}
