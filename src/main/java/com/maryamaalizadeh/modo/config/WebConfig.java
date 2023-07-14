package com.maryamaalizadeh.modo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("DELETE", "POST", "PATCH", "GET");
//        registry.addMapping("/app/v1/**")
//                .allowedMethods("DELETE", "POST", "PATCH", "GET");
//        registry.addMapping("/app/v1/todos/**")
//                .allowedMethods("DELETE", "POST", "PATCH", "GET");
    }
}
