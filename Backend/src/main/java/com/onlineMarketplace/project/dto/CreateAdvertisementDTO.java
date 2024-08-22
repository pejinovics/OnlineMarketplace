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
public class CreateAdvertisementDTO {
    private String title;
    private String description;
    private double price;
    private List<Category> categories;
    private Long userId;
    private String city;
    private LocalDate postedDate;

    public CreateAdvertisementDTO(Advertisement advertisement){
        this.title = advertisement.getTitle();
        this.description = advertisement.getDescription();
        this.price = advertisement.getPrice();
        this.categories = advertisement.getCategories();
        this.userId = advertisement.getUser().getId();
        this.city = advertisement.getCity();
        this.postedDate = advertisement.getPostedDate();
    }
}
