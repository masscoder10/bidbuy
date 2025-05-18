package com.bidbuy.repository;

import com.bidbuy.entity.Auction;
import com.bidbuy.entity.AuctionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, String> {
    List<Auction> findByStatus(AuctionStatus status);
    List<Auction> findByProductFeaturedTrueAndStatus(AuctionStatus status);
}