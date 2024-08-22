package com.onlineMarketplace.project.service;

import com.onlineMarketplace.project.dto.AdvertisementCardDTO;
import com.onlineMarketplace.project.dto.AdvertisementDTO;
import com.onlineMarketplace.project.dto.AdvertisementFilterDTO;
import com.onlineMarketplace.project.dto.CreateAdvertisementDTO;
import com.onlineMarketplace.project.model.Advertisement;
import com.onlineMarketplace.project.model.User;
import com.onlineMarketplace.project.repository.IAdvertisementRepository;
import com.onlineMarketplace.project.repository.IUserRepository;
import com.onlineMarketplace.project.service.interfaces.IAdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class AdvertisementService implements IAdvertisementService {

    @Autowired
    private IAdvertisementRepository advertisementRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ImageService imageService;

    @Override
    public Collection<AdvertisementDTO> findAll() {
        Collection<Advertisement> advertisements = advertisementRepository.findAll();
        Collection<AdvertisementDTO> advertisementDTOS = new ArrayList<>();
        for(Advertisement ad: advertisements){
            AdvertisementDTO advertisementDTO = new AdvertisementDTO(ad);
            advertisementDTOS.add(advertisementDTO);
        }
        return advertisementDTOS;
    }

    @Override
    public Collection<AdvertisementCardDTO> findAllCards() {
        Collection<Advertisement> advertisements = advertisementRepository.findAll();
        Collection<AdvertisementCardDTO> advertisementCardDTOS = new ArrayList<>();
        for(Advertisement ad: advertisements){
            AdvertisementCardDTO advertisementCardDTO = new AdvertisementCardDTO(ad);
            advertisementCardDTOS.add(advertisementCardDTO);
        }
        return advertisementCardDTOS;
    }

    @Override
    public Optional<Advertisement> findById(Long id) {
        return advertisementRepository.findById(id);
    }

    @Override
    public Advertisement save(Advertisement advertisement) {
        return advertisementRepository.save(advertisement);
    }

    @Override
    public void deleteById(Long id) {
        advertisementRepository.deleteById(id);
    }

    @Override
    public AdvertisementDTO create(CreateAdvertisementDTO advertisementDTO) {
        Advertisement advertisement = new Advertisement();
        advertisement.setTitle(advertisementDTO.getTitle());
        advertisement.setDescription(advertisementDTO.getDescription());
        advertisement.setPrice(advertisementDTO.getPrice());
        advertisement.setCategories(advertisementDTO.getCategories());
        advertisement.setCity(advertisementDTO.getCity());
        advertisement.setPostedDate(advertisementDTO.getPostedDate());

        Optional<User> user = userRepository.findById(advertisementDTO.getUserId());
        if(user.isEmpty()) return null;
        advertisement.setUser(user.get());

        save(advertisement);
        return new AdvertisementDTO(advertisement);
    }

    @Override
    public Optional<AdvertisementDTO> change(AdvertisementDTO advertisementDTO, Long id) {
        Optional<Advertisement> advertisement = advertisementRepository.findById(id);
        if(advertisement.isEmpty()) return null;

        advertisement.get().setTitle(advertisementDTO.getTitle());
        advertisement.get().setDescription(advertisementDTO.getDescription());
        advertisement.get().setPrice(advertisementDTO.getPrice());
        advertisement.get().setCategories(advertisementDTO.getCategories());
        advertisement.get().setCity(advertisementDTO.getCity());
        advertisement.get().setPostedDate(advertisementDTO.getPostedDate());

        Optional<User> user = userRepository.findById(advertisementDTO.getUser().getId());
        if(user.isEmpty()) return null;
        advertisement.get().setUser(user.get());

        save(advertisement.get());
        return Optional.of(advertisementDTO);
    }

    @Override
    public AdvertisementDTO saveImage(String image, Long advertisementId) {
        Optional<Advertisement> advertisement = findById(advertisementId);

        if(advertisement.isEmpty()) return null;

        advertisement.get().setImage(image);
        save(advertisement.get());

        return new AdvertisementDTO(advertisement.get());
    }

    @Override
    public String getImage(Long advertisementId) {
        Optional<Advertisement> advertisement = findById(advertisementId);

        if(advertisement.isEmpty()) return null;

        return advertisement.get().getImage();
    }

    @Override
    public AdvertisementDTO findAdvertisementDetails(Long id) throws IOException {
        Optional<Advertisement> advertisement = findById(id);
        if (advertisement.isEmpty()) return null;

        AdvertisementDTO advertisementDTO = new AdvertisementDTO(advertisement.get());
        if (advertisement.get().getImage() != null) {
            advertisementDTO.setImage(imageService.getImage(advertisement.get().getImage()));
        }
        return advertisementDTO;
    }

    @Override
    public Collection<AdvertisementCardDTO> filterAdvertisements(AdvertisementFilterDTO advertisementFilterDTO) throws IOException {
        Collection<Advertisement> advertisements = advertisementRepository.filterAdvertisements(advertisementFilterDTO.getCategory(),
                advertisementFilterDTO.getTitleContains(), advertisementFilterDTO.getUserId(), advertisementFilterDTO.getMaxValue());
        Collection<AdvertisementCardDTO> advertisementCardDTOS = new ArrayList<>();
        for(Advertisement ad: advertisements){
            AdvertisementCardDTO advertisementCardDTO = new AdvertisementCardDTO(ad);
            if (ad.getImage() != null){    advertisementCardDTO.setImage(imageService.getImage(ad.getImage()));}
            advertisementCardDTOS.add(advertisementCardDTO);
        }
        return advertisementCardDTOS;
    }
}
