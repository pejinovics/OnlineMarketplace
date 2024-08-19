package com.onlineMarketplace.project.controller;

import com.onlineMarketplace.project.dto.AdvertisementCardDTO;
import com.onlineMarketplace.project.dto.AdvertisementDTO;
import com.onlineMarketplace.project.dto.AdvertisementFilterDTO;
import com.onlineMarketplace.project.model.Advertisement;
import com.onlineMarketplace.project.model.enums.Category;
import com.onlineMarketplace.project.service.interfaces.IAdvertisementService;
import com.onlineMarketplace.project.validation.IdentityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

@RestController
@Validated
@RequestMapping("/api/advertisements")
public class AdvertisementController {

    @Autowired
    private IAdvertisementService advertisementService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAdvertisements(){
        Collection<AdvertisementDTO> advertisementDTOS = advertisementService.findAll();
        return new ResponseEntity<Collection<AdvertisementDTO>>(advertisementDTOS, HttpStatus.OK);
    }

    @GetMapping(value = "/cards",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAdvertisementsCards() throws IOException {
        Collection<AdvertisementCardDTO> advertisementDTOS = advertisementService.findAllCards();
        return new ResponseEntity<Collection<AdvertisementCardDTO>>(advertisementDTOS, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAdvertisementDetails(@IdentityConstraint @PathVariable("id") Long id) throws IOException {
        AdvertisementDTO accommodationDTO = advertisementService.findAdvertisementDetails(id);
        if(accommodationDTO == null)    return new ResponseEntity<AdvertisementDTO>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<AdvertisementDTO>(accommodationDTO, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAdvertisement(@RequestBody AdvertisementDTO advertisementDTO) {
        AdvertisementDTO newAdvertisementDTO = advertisementService.create(advertisementDTO);
        return new ResponseEntity<AdvertisementDTO>(newAdvertisementDTO, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Advertisement> deleteAdvertisement(@IdentityConstraint @PathVariable("id") Long id){
        advertisementService.deleteById(id);
        return new ResponseEntity<Advertisement>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeAdvertisement(@RequestBody AdvertisementDTO advertisementDTO,
                                                 @IdentityConstraint @PathVariable Long id) {
        Optional<AdvertisementDTO> advertisement = advertisementService.change(advertisementDTO,id);
        if (advertisement.get() == null) return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<AdvertisementDTO>(advertisement.get(), HttpStatus.CREATED);
    }

    @GetMapping(value = "/cards/filter",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> filterAccommodations(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String titleContains,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String sortBy
    ) {
        AdvertisementFilterDTO filterDTO = new AdvertisementFilterDTO(category, titleContains, userId, sortBy);
        Collection<AdvertisementCardDTO> advertisementCardDTOS = advertisementService.filterAdvertisements(filterDTO);
        return new ResponseEntity<Collection<AdvertisementCardDTO>>(advertisementCardDTOS, HttpStatus.OK);
    }
}
