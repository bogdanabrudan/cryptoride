package CryptoRideDemoApp.service;

import CryptoRideDemoApp.model.User;
import CryptoRideDemoApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
