package com.omega.school.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

import java.util.Arrays;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Omega School API")
                        .version("1.0.0")
                        .description("API pour gérer une école"))
                .servers(Arrays.asList(
                        new Server().url("http://localhost:8080").description("Serveur local"),
                        new Server().url("https://api-spring-boot-uweb.onrender.com")
                                .description("Serveur en production")));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("v1")
                .pathsToMatch("/**")
                .build();
    }
}
