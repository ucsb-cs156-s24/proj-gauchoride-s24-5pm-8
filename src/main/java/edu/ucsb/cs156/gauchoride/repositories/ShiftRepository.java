package edu.ucsb.cs156.gauchoride.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.gauchoride.entities.Shift;
import java.time.LocalTime;

import java.util.Optional;

@Repository
public interface ShiftRepository extends CrudRepository<Shift, Long> {
  Optional<Shift> findByDay(String day);
  Optional<Shift> findByDriver(Long driverID);
  Optional<Shift> findByShift(LocalTime shiftStart, LocalTime shiftEnd);
}
