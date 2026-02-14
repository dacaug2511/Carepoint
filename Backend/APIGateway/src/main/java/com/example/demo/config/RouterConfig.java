package com.example.demo.config;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouterConfig {
	
	@Bean
	public RouteLocator createRoutes(RouteLocatorBuilder builder) {
		
		return builder.routes()
				.route("user-service", r -> r
		                .path(
		                    "/auth/**",
		                    "/users/**",
		                    "/doctor/**",
		                    "/patient/**",
		                    "/admin/**",
		                    "/api/doctors/**",
		                    "/api/specializations/**",
		                    "/api/validate/**"
		                )
		                .uri("lb://USERSERVICE")
		            )
		            .route("appointment-service", r -> r
		                    .path(
		                        "/api/appointments/**",
		                        "/api/doctor/appointments/**",
		                        "/api/availability/**"
		                    )
		                    .uri("lb://APPOINTMENTSCHEDULINGSERVICE")
		                )
		            .route("medical-records-service", r -> r
		            	    .path(
		            	        "/api/Doctor/**",
		            	        "/api/Patient/**",
		            	        "/api/history/**",
		            	        "/api/Report/**",
		            	        "/api/Admin/**"
		            	    )
		            	    .uri("http://localhost:5046")
		            	)

			   .build();
		
	}
	
	@Bean
	public CorsWebFilter corsWebFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
		config.setAllowedHeaders(Arrays.asList("Authorization","Content-Type"));
		config.setExposedHeaders(Arrays.asList("Authorization"));
		source.registerCorsConfiguration("/**", config);
		return new CorsWebFilter(source);
		
		
	}

}
