package com.app.Exceptions;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ResourceNotFoundException extends RuntimeException {
		String resourceName;
		String feildName;
		long fieldValue;
		
		public ResourceNotFoundException(String resourceName, String feildName, long fieldValue) {
			super(String.format("%s not found with %s : %s",resourceName, feildName, fieldValue));
			this.resourceName = resourceName;
			this.feildName = feildName;
			this.fieldValue = fieldValue;
		}
		
		
}
