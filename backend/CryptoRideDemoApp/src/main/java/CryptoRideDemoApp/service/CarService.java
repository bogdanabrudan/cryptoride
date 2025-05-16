package CryptoRideDemoApp.service;

import CryptoRideDemoApp.model.Car;
import CryptoRideDemoApp.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long carId) {
        return carRepository.findById(carId);
    }
}
