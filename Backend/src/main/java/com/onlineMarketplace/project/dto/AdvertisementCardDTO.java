package com.onlineMarketplace.project.dto;

import com.onlineMarketplace.project.model.Advertisement;
import com.onlineMarketplace.project.model.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdvertisementCardDTO {
    private Long id;
    private String title;
    private byte[] image;
    private double price;
    private List<Category> categories;
    private String city;

    public AdvertisementCardDTO(Advertisement advertisement){
        this.id = advertisement.getId();
        this.title = advertisement.getTitle();
        this.price = advertisement.getPrice();
        this.categories = advertisement.getCategories();
        this.city = advertisement.getCity();
    }
}
