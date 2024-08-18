package com.onlineMarketplace.project.repository;

import com.onlineMarketplace.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Long> {
}
