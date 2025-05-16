package CryptoRideDemoApp.service;

import CryptoRideDemoApp.model.*;
import CryptoRideDemoApp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RentalService {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final OwnershipRepository ownershipRepository;

    public String rentCar(Long clientId, Long carId, LocalDate pickupDay, LocalDate returnDay, Integer totalCost) {
        long days = ChronoUnit.DAYS.between(pickupDay, returnDay);
        if (days < 1 || days > 30) {
            return "Invalid interval (1 - 30 days allowed)";
        }

        List<Rental> overlappingRentals = rentalRepository.findOverlappingRentals(carId, pickupDay, returnDay);
        if (!overlappingRentals.isEmpty()) {
            return "Car is not available in that period.";
        }

        Car car = carRepository.findById(carId).orElse(null);
        User client = userRepository.findById(clientId).orElse(null);
        if (car == null || client == null) {
            return "Car or client not found.";
        }

        int expectedCost = (int) (car.getDailyRate() * days);
        if (expectedCost != totalCost) {
            return "Cost invalid: modificare detectată.";
        }

        if (client.getBalance() < expectedCost) {
            return "Fonduri insuficiente.";
        }

        client.setBalance(client.getBalance() - totalCost);
        userRepository.save(client);


        List<Ownership> owners = ownershipRepository.findByCar_CarId(carId);
        for (Ownership owner : owners) {
            User investor = owner.getInvestor();
            if (investor != null) {
                int gain = (totalCost * owner.getPercentage()) / 100;
                investor.setBalance(investor.getBalance() + gain);
                userRepository.save(investor);
            }
        }


        Rental rental = new Rental();
        rental.setCar(car);
        rental.setClient(client);
        rental.setPickupDay(pickupDay);
        rental.setReturnDay(returnDay);
        rental.setTotalCost(expectedCost);
        rental.setStatus("on-going");

        rentalRepository.save(rental);
        return "Rental successful!";
    }

    public List<Rental> getRentalsByClient(Long clientId) {
        return rentalRepository.findByClient_UserId(clientId);
    }
}
