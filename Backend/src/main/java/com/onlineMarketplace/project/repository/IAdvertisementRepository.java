package com.onlineMarketplace.project.repository;

import com.onlineMarketplace.project.model.Advertisement;
import com.onlineMarketplace.project.model.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface IAdvertisementRepository extends JpaRepository<Advertisement, Long> {
    @Query("SELECT a FROM Advertisement a " +
            "JOIN a.categories c " +
            "WHERE (:category IS NULL OR c = :category) " +
            "AND (:titleContains IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :titleContains, '%'))) " +
            "AND (:userId = 0 OR a.user.id = :userId) " +
            "AND (:maxValue IS NULL OR a.price < :maxValue) " +
            "ORDER BY a.postedDate DESC"
    )
    Collection<Advertisement> filterAdvertisements(@Param("category") Category category,
                                                   @Param("titleContains") String titleContains,
                                                   @Param("userId") Long userId,
                                                   @Param("maxValue") Integer maxValue);

}
