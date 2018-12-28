/**
 * 
 */
package centauri.academy.cerepro.backend;

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
import ross.dario.persistence.entity.Role;
import ross.dario.persistence.repository.RoleRepository;





/**
 * @author maurizio
 *
 */
@RestController
@RequestMapping("/api/v1/role")
public class RoleController {
	public static final Logger logger = LogManager.getLogger(RoleController.class);
	
	@Autowired
	private RoleRepository roleRepository ;

	@GetMapping("/")
	public ResponseEntity<List<Role>> getRoles() {
		List<Role> roles = roleRepository.findAll();
		
		if (roles.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<AbstractEntity> getRoleById(@PathVariable("id") final Long id){
		Optional<Role> optRole = roleRepository.findById(id);
		
		if (!optRole.isPresent()) {
			return new ResponseEntity<>(
				new CustomErrorType("Role with id " + id + " not found"),
				HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(optRole.get(), HttpStatus.OK);
	}
	
	@PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AbstractEntity> createRole(
			@Valid @RequestBody final Role role) {
		logger.info("Creating Role : {}", role);
		
		if (roleRepository.findByLevel(role.getLevel()) != null) {
			
			return new ResponseEntity<>(
					new CustomErrorType(
							"Unable to create new user. A Role with level " + role.getLevel() + " already exist."),
					HttpStatus.CONFLICT);
		}
		
		roleRepository.save(role);
		return new ResponseEntity<>(role, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AbstractEntity> updateRole(
			@PathVariable("id") final Long id, @RequestBody Role role) {
	
		Optional<Role> optRole = roleRepository.findById(id);
		
		if (!optRole.isPresent()) {
			return new ResponseEntity<>(
					new CustomErrorType("Unable to upate. Role with id " + id + " not found."), 
					HttpStatus.NOT_FOUND);
		}
		
		Role currentRole = optRole.get();
	
		currentRole.setLabel(role.getLabel());
		currentRole.setDescription(role.getDescription());
		currentRole.setLevel(role.getLevel());
		// save currentUser obejct
		roleRepository.save(currentRole);
		// return ResponseEntity object
		return new ResponseEntity<>(currentRole, HttpStatus.OK);
	}
	 
	@DeleteMapping("/{id}")
	public ResponseEntity<AbstractEntity> deleteRole(@PathVariable("id") final Long id) {
		Optional<Role> optRole = roleRepository.findById(id);
		
		if (!optRole.isPresent()) {
			return new ResponseEntity<>(
					new CustomErrorType("Unable to delete. Role with id " + id + " not found."), 
					HttpStatus.NOT_FOUND);
		}
		
		roleRepository.delete(optRole.get());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
