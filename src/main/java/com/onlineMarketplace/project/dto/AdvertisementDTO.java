package com.onlineMarketplace.project.dto;

import com.onlineMarketplace.project.model.Advertisement;
import com.onlineMarketplace.project.model.User;
import com.onlineMarketplace.project.model.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdvertisementDTO {
    private Long id;
    private String title;
    private String description;
    private byte[] image;
    private double price;
    private List<Category> categories;
    private User user;
    private String city;
    private LocalDate postedDate;

    public AdvertisementDTO(Advertisement advertisement){
        this.id = advertisement.getId();
        this.title = advertisement.getTitle();
        this.description = advertisement.getDescription();
        this.price = advertisement.getPrice();
        this.categories = advertisement.getCategories();
        this.user = advertisement.getUser();
        this.city = advertisement.getCity();
        this.postedDate = advertisement.getPostedDate();
    }
}
