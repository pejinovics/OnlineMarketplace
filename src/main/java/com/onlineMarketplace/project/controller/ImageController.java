package com.onlineMarketplace.project.controller;


import com.onlineMarketplace.project.service.AdvertisementService;
import com.onlineMarketplace.project.service.ImageService;
import com.onlineMarketplace.project.validation.IdentityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Validated
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private AdvertisementService advertisementService;
    @PostMapping("/{advertisementId}")
    public ResponseEntity<?> addAccommodationImage(@RequestParam("image") MultipartFile imageFile,
                                                      @IdentityConstraint @PathVariable Long advertisementId) throws Exception {
        String uploadDirectory = "src/main/resources/static/images/advertisements";
        String imageName = imageService.saveImageToStorage(uploadDirectory, imageFile);
        advertisementService.saveImage(imageName, advertisementId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/{advertisementId}")
    public ResponseEntity<byte[]> getImage(@IdentityConstraint @PathVariable Long advertisementId) throws IOException {
        try {
            String imageName = advertisementService.getImage(advertisementId);
            byte[] imageBytes = imageService.getImageByDirectory("src/main/resources/static/images/advertisements", imageName);
            return ResponseEntity.ok().body(imageBytes);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
