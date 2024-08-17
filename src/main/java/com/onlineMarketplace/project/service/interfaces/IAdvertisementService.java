package com.onlineMarketplace.project.service.interfaces;

import com.onlineMarketplace.project.dto.AdvertisementCardDTO;
import com.onlineMarketplace.project.dto.AdvertisementDTO;
import com.onlineMarketplace.project.model.Advertisement;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

public interface IAdvertisementService {

    Collection<AdvertisementDTO> findAll();
    Collection<AdvertisementCardDTO> findAllCards();
    Optional<Advertisement> findById(Long id);
    Advertisement save(Advertisement advertisement) ;
    void deleteById(Long id);
    AdvertisementDTO create(AdvertisementDTO advertisementDTO);
    Optional<AdvertisementDTO> change(AdvertisementDTO advertisementDTO, Long id);
    AdvertisementDTO saveImage(String image, Long advertisementId);
    String getImage(Long advertisementId);
    AdvertisementDTO findAdvertisementDetails(Long id) throws IOException;
}
