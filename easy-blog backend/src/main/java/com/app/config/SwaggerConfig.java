package com.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {
	@Bean	
	public Docket api() {
	 return new Docket(DocumentationType.SWAGGER_2)
			 .apiInfo(getInfo()).select()
			 .apis(RequestHandlerSelectors.any())
			 .paths(PathSelectors.any()).build();	
	}

	@SuppressWarnings("deprecation")
	private ApiInfo getInfo() {
		return new ApiInfo("Blogging Aplication","Developed by Swapnil patil","1.0","Terms of service","Swapnil","swappatil7844@gmail.com","CDAC certified");
	};
	
	
}
