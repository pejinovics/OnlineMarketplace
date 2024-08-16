package com.onlineMarketplace.project.repository;

import com.onlineMarketplace.project.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdvertisementRepository extends JpaRepository<Advertisement, Long> {
}
