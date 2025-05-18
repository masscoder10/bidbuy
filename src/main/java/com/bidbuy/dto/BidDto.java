package com.bidbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BidDto {
    private String id;
    private String auctionId;
    private String userId;
    private String username;
    private LocalDateTime timestamp;
    private double amount;
}