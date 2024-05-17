package edu.ucsb.cs156.gauchoride.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;

import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.models.DriverInfo;

import java.sql.Driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

@Tag(name = "Driver Information")
@RequestMapping("/api/drivers")
@RestController
public class DriversController extends ApiController{
    @Autowired
    UserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    @Operation(summary = "Get a list of all drivers")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER')")
    @GetMapping("/all")
    public ResponseEntity<String> drivers()
            throws JsonProcessingException {

                Iterable<User> drivers=userRepository.findByDriver(true);

        String body = mapper.writeValueAsString(drivers);
        return ResponseEntity.ok().body(body);
    }

    @Operation(summary = "Get user by id")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER')")
    @GetMapping("/get")
    public DriverInfo driver(
            @Parameter(name = "id", description = "Long, id number of user to get", example = "1", required = true) @RequestParam Long id)
            throws JsonProcessingException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        DriverInfo driverInfo = new DriverInfo();

        if(user.getDriver()){
            driverInfo.setIsDriver(true);
            driverInfo.setEmail(user.getEmail());
            driverInfo.setFamilyName(user.getFamilyName());
            driverInfo.setGivenName(user.getGivenName());
        }
        return driverInfo;
    }

}