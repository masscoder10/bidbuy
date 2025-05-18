package com.bidbuy.service;

import com.bidbuy.dto.AuctionResponse;
import com.bidbuy.dto.BidDto;
import com.bidbuy.dto.BidRequest;
import com.bidbuy.entity.Auction;
import com.bidbuy.entity.Bid;
import com.bidbuy.entity.User;
import com.bidbuy.repository.AuctionRepository;
import com.bidbuy.repository.BidRepository;
import com.bidbuy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionService {
    
    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;
    private final UserRepository userRepository;
    
    public List<AuctionResponse> getAllAuctions() {
        return auctionRepository.findAll().stream()
            .map(this::mapToAuctionResponse)
            .collect(Collectors.toList());
    }
    
    public AuctionResponse getAuctionById(String id) {
        var auction = auctionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Auction not found"));
        return mapToAuctionResponse(auction);
    }
    
    @Transactional
    public AuctionResponse placeBid(String auctionId, BidRequest request) {
        var auction = auctionRepository.findById(auctionId)
            .orElseThrow(() -> new RuntimeException("Auction not found"));
            
        if (auction.getStatus() != AuctionStatus.ACTIVE) {
            throw new RuntimeException("Auction is not active");
        }
        
        var user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        if (user.getBidBalance() < 1) {
            throw new RuntimeException("Insufficient bid balance");
        }
        
        // Create and save bid
        var bid = Bid.builder()
            .auction(auction)
            .user(user)
            .amount(auction.getCurrentPrice() + auction.getBidIncrement())
            .timestamp(LocalDateTime.now())
            .build();
            
        bidRepository.save(bid);
        
        // Update auction
        auction.setCurrentPrice(bid.getAmount());
        auction.setEndTime(auction.getEndTime().plusSeconds(10));
        auction.getBidHistory().add(bid);
        
        // Update user's bid balance
        user.setBidBalance(user.getBidBalance() - 1);
        userRepository.save(user);
        
        var updatedAuction = auctionRepository.save(auction);
        return mapToAuctionResponse(updatedAuction);
    }
    
    private AuctionResponse mapToAuctionResponse(Auction auction) {
        return AuctionResponse.builder()
            .id(auction.getId())
            .product(mapToProductDto(auction.getProduct()))
            .startPrice(auction.getStartPrice())
            .currentPrice(auction.getCurrentPrice())
            .bidIncrement(auction.getBidIncrement())
            .startTime(auction.getStartTime())
            .endTime(auction.getEndTime())
            .status(auction.getStatus().toString())
            .bidHistory(auction.getBidHistory().stream()
                .map(this::mapToBidDto)
                .collect(Collectors.toList()))
            .winner(auction.getWinner() != null ? auction.getWinner().getUsername() : null)
            .build();
    }
    
    private BidDto mapToBidDto(Bid bid) {
        return BidDto.builder()
            .id(bid.getId())
            .auctionId(bid.getAuction().getId())
            .userId(bid.getUser().getId())
            .username(bid.getUser().getUsername())
            .timestamp(bid.getTimestamp())
            .amount(bid.getAmount())
            .build();
    }
}