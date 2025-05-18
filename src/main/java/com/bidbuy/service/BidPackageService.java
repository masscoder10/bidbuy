package com.bidbuy.service;

import com.bidbuy.dto.BidPackageResponse;
import com.bidbuy.dto.PurchaseResponse;
import com.bidbuy.entity.BidPackage;
import com.bidbuy.entity.Purchase;
import com.bidbuy.repository.BidPackageRepository;
import com.bidbuy.repository.PurchaseRepository;
import com.bidbuy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BidPackageService {
    
    private final BidPackageRepository bidPackageRepository;
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    
    public List<BidPackageResponse> getBidPackages() {
        return bidPackageRepository.findAll().stream()
            .map(this::mapToBidPackageResponse)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public PurchaseResponse purchasePackage(String packageId) {
        var bidPackage = bidPackageRepository.findById(packageId)
            .orElseThrow(() -> new RuntimeException("Bid package not found"));
            
        var user = SecurityUtils.getCurrentUser();
        
        // Create purchase record
        var purchase = Purchase.builder()
            .bidPackage(bidPackage)
            .user(user)
            .bidCount(bidPackage.getBidCount())
            .amount(bidPackage.getPrice())
            .purchaseDate(LocalDateTime.now())
            .build();
            
        var savedPurchase = purchaseRepository.save(purchase);
        
        // Update user's bid balance
        user.setBidBalance(user.getBidBalance() + bidPackage.getBidCount());
        userRepository.save(user);
        
        return mapToPurchaseResponse(savedPurchase);
    }
    
    private BidPackageResponse mapToBidPackageResponse(BidPackage bidPackage) {
        return BidPackageResponse.builder()
            .id(bidPackage.getId())
            .name(bidPackage.getName())
            .bidCount(bidPackage.getBidCount())
            .price(bidPackage.getPrice())
            .savings(bidPackage.getSavings())
            .isPopular(bidPackage.isPopular())
            .build();
    }
    
    private PurchaseResponse mapToPurchaseResponse(Purchase purchase) {
        return PurchaseResponse.builder()
            .id(purchase.getId())
            .packageId(purchase.getBidPackage().getId())
            .userId(purchase.getUser().getId())
            .bidCount(purchase.getBidCount())
            .amount(purchase.getAmount())
            .purchaseDate(purchase.getPurchaseDate())
            .build();
    }
}