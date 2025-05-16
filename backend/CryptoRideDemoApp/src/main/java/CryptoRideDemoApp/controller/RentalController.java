package CryptoRideDemoApp.controller;

import CryptoRideDemoApp.dto.RentRequest;
import CryptoRideDemoApp.model.Rental;
import CryptoRideDemoApp.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rent")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @PostMapping
    public ResponseEntity<String> rentCar(@RequestBody RentRequest request) {
        String result = rentalService.rentCar(
                request.getClientId(),
                request.getCarId(),
                request.getPickupDay(),
                request.getReturnDay(),
                request.getTotalCost()
        );

        if ("Rental successful!".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<?> getClientRentals(@PathVariable Long clientId) {
        List<Rental> rentals = rentalService.getRentalsByClient(clientId);
        if (rentals.isEmpty()) {
            return ResponseEntity.ok("No rentals found.");
        }
        return ResponseEntity.ok(rentals);
    }

}
