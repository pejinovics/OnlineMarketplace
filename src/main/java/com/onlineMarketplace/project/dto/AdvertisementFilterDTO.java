package com.onlineMarketplace.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdvertisementFilterDTO {
    private String category;
    private String titleContains;
    private Long userId; 
    private String sortBy;
}
