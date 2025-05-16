package CryptoRideDemoApp.repository;


import CryptoRideDemoApp.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findByClient_UserId(Long clientId);

    List<Rental> findByClient_UserIdAndStatus(Long clientId, String status);

    List<Rental> findByClient_UserIdAndStatusNot(Long clientId, String status);

    @Query("SELECT r FROM Rental r WHERE r.car.carId = :carId AND " +
            "(r.pickupDay <= :returnDay AND r.returnDay >= :pickupDay) AND r.status = 'on-going'")
    List<Rental> findOverlappingRentals(@Param("carId") Long carId,
                                        @Param("pickupDay") LocalDate pickupDay,
                                        @Param("returnDay") LocalDate returnDay);
}