package com.onlineMarketplace.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable).authorizeRequests()
//                .requestMatchers("/*").permitAll().requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/api/users**").permitAll()
//                .requestMatchers("/api/register/userExists/{email}").permitAll()
//                .requestMatchers("api/register/confirm**").permitAll()
                .requestMatchers("/api/images/{advertisementId}").permitAll()
//                .requestMatchers("/api/accommodations/minMaxPrice").permitAll()
                .requestMatchers("/api/advertisements**").permitAll()
                .requestMatchers("/api/advertisements/{id}").permitAll()
                .requestMatchers("/api/advertisements/cards").permitAll()
                .requestMatchers("/api/advertisements/cards/filter").permitAll()
//                .requestMatchers("/socket/**").permitAll()
//                .requestMatchers("/api/accommodation**").authenticated() // sav pristup API-ju mora da bude autentikovan
                .anyRequest().authenticated()
                .and()
                .cors();
//                .and()
//                .oauth2ResourceServer(auth ->
//                        auth.jwt(token -> token.jwtAuthenticationConverter(new KeycloakJwtAuthenticationConverter())));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();// PasswordEncoderFactories.createDelegatingPasswordEncoder();
        //System.out.println(encoder.encode("admin"));
        return encoder;
//        return NoOpPasswordEncoder.getInstance();
    }
}
