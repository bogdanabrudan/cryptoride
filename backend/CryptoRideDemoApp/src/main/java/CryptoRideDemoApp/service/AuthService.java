package CryptoRideDemoApp.service;

import CryptoRideDemoApp.dto.LoginRequest;
import CryptoRideDemoApp.dto.LoginResponse;
import CryptoRideDemoApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Optional<LoginResponse> login(LoginRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .filter(user -> user.getPassword().equals(request.getPassword()))
                .map(user -> new LoginResponse(
                        user.getUserId(),
                        user.getUsername(),
                        user.getRole(),
                        user.getBalance()
                ));
    }
}

