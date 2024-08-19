package com.onlineMarketplace.project.dto;

import com.onlineMarketplace.project.model.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdvertisementFilterDTO {
    private Category category;
    private String titleContains;
    private Long userId;
    private String sortBy;
}
