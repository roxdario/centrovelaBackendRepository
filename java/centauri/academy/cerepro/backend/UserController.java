/**
 * 
 */
package centauri.academy.cerepro.backend;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ross.dario.persistence.entity.AbstractEntity;
import ross.dario.persistence.entity.CustomErrorType;
import ross.dario.persistence.entity.User;
import ross.dario.persistence.repository.RoleRepository;
import ross.dario.persistence.repository.UserRepository;

/**
 * @author dario
 *
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	public static final Logger logger = LogManager.getLogger(UserController.class);

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	/**
	 * getUsers method gets all users
	 * 
	 * @return a new ResponseEntity with the given status code
	 */
	@GetMapping("/")
	public ResponseEntity<List<User>> getUsers() {
		List<User> user = userRepository.findAll();
		if (user.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	/**
	 * getUserById method gets a user by id
	 * 
	 * @param id of the user to be selected
	 * @return a new ResponseEntity with the given status code
	 */
	@GetMapping("/{id}")
	public ResponseEntity<AbstractEntity> getUserById(@PathVariable("id") final Long id) {
		Optional<User> optUser = userRepository.findById(id);

		if (!optUser.isPresent()) {
			return new ResponseEntity<>(new CustomErrorType("Question with id " + id + " not found"),
					HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(optUser.get(), HttpStatus.OK);
	}

	/**
	 * createUser method creates a user
	 * 
	 * @param user to be created
	 * @return a new ResponseEntity with the given status code
	 */
	@PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AbstractEntity> createUser(@Valid @RequestBody final User user) {
		logger.info("Creating User : {}", user);

		if (userRepository.findByCode(user.getEmail()) == null) {

			return new ResponseEntity<>(
					new CustomErrorType(
							"Unable to create new user. A User with email " + user.getEmail() + " already exist."),
					HttpStatus.CONFLICT);
		}

		if (roleRepository.findByLevel(user.getRole()) == null) {

			return new ResponseEntity<>(
					new CustomErrorType(
							"Unable to create new user. Level " + user.getRole() + " is not present in database."),
					HttpStatus.CONFLICT);
		}

		user.setRegdate(LocalDateTime.now());
//		String encoded=new BCryptPasswordEncoder().encode(user.getPassword());
//		user.setPassword(encoded);
		userRepository.save(user);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}

	/**
	 * updateUser method updates a user
	 * 
	 * @param id   of the user to be updated
	 * @param user with the fields updated
	 * @return a new ResponseEntity with the given status code
	 */
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AbstractEntity> updateUser(@PathVariable("id") final Long id, @RequestBody User user) {
		Optional<User> optUser = userRepository.findById(id);

		if (!optUser.isPresent()) {
			return new ResponseEntity<>(new CustomErrorType("Unable to upate. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		if (roleRepository.findByLevel(user.getRole()) == null) {

			return new ResponseEntity<>(
					new CustomErrorType(
							"Unable to update user. Level " + user.getRole() + " is not present in database."),
					HttpStatus.CONFLICT);
		}

		User currentUser = optUser.get();
		// TODO
		currentUser.setEmail(user.getEmail());
		currentUser.setPassword(user.getPassword());
		currentUser.setFirstname(user.getFirstname());
		currentUser.setLastname(user.getLastname());
		currentUser.setDateofbirth(user.getDateofbirth());
		currentUser.setRole(user.getRole());
		currentUser.setCode(user.getCode());

		userRepository.saveAndFlush(currentUser);
		return new ResponseEntity<>(currentUser, HttpStatus.OK);
	}

	/**
	 * deleteUser method deletes a user
	 * 
	 * @param id of the user to be canceled
	 * @return a new ResponseEntity with the given status code
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<AbstractEntity> deleteUser(@PathVariable("id") final Long id) {
		Optional<User> optUser = userRepository.findById(id);

		if (!optUser.isPresent()) {
			return new ResponseEntity<>(new CustomErrorType("Unable to delete. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		userRepository.delete(optUser.get());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT); // code 204

	}

}