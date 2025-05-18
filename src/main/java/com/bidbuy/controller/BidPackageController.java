package com.bidbuy.controller;

import com.bidbuy.dto.BidPackageResponse;
import com.bidbuy.dto.PurchaseResponse;
import com.bidbuy.service.BidPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bid-packages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BidPackageController {
    
    private final BidPackageService bidPackageService;
    
    @GetMapping
    public ResponseEntity<List<BidPackageResponse>> getBidPackages() {
        return ResponseEntity.ok(bidPackageService.getBidPackages());
    }
    
    @PostMapping("/{id}/purchase")
    public ResponseEntity<PurchaseResponse> purchasePackage(@PathVariable String id) {
        return ResponseEntity.ok(bidPackageService.purchasePackage(id));
    }
}