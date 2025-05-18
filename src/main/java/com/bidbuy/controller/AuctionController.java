package com.bidbuy.controller;

import com.bidbuy.dto.AuctionResponse;
import com.bidbuy.dto.BidRequest;
import com.bidbuy.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuctionController {
    
    private final AuctionService auctionService;
    
    @GetMapping
    public ResponseEntity<List<AuctionResponse>> getAllAuctions() {
        return ResponseEntity.ok(auctionService.getAllAuctions());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AuctionResponse> getAuctionById(@PathVariable String id) {
        return ResponseEntity.ok(auctionService.getAuctionById(id));
    }
    
    @PostMapping("/{id}/bid")
    public ResponseEntity<AuctionResponse> placeBid(
        @PathVariable String id,
        @RequestBody BidRequest request
    ) {
        return ResponseEntity.ok(auctionService.placeBid(id, request));
    }
}