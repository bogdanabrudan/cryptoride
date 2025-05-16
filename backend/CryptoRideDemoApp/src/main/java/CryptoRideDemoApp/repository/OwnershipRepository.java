package CryptoRideDemoApp.repository;


import CryptoRideDemoApp.model.Ownership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnershipRepository extends JpaRepository<Ownership, Long> {
    List<Ownership> findByInvestor_UserId(Long investorId);
    List<Ownership> findByCar_CarId(Long carId);

}
