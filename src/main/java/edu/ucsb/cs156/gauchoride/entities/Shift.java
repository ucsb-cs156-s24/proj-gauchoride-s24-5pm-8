package edu.ucsb.cs156.gauchoride.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import io.swagger.annotations.ApiModelProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "shift")
public class Shift {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ApiModelProperty(allowableValues = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday")
  private String day;

  private String shiftStart; // format: HH:MM(A/P)M e.g. "11:00AM" or "1:37PM"
  private String shiftEnd; //format: HH:MM(A/P)M e.g. "11:00AM" or "1:37PM"
  
  private long driverID;
  private long driverBackupID;
}