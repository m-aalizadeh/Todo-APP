package com.maryamaalizadeh.modo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ModoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModoApplication.class, args);
	}

}
