package com.onlineMarketplace.project.model;

import com.onlineMarketplace.project.model.enums.Category;
import jakarta.persistence.*;
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
@Entity
@Table(name = "advertisements")
public class Advertisement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false,length = 3000)
    private String description;

    @Column(columnDefinition="text", length=10485760)
    private String image;

    @Column(nullable = false)
    private double price;

    @ElementCollection(targetClass = Category.class)
    @JoinTable(name = "categories", joinColumns = @JoinColumn(name = "advertisementId"))
    @Enumerated(EnumType.STRING)
    private List<Category> categories;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate postedDate;

}
