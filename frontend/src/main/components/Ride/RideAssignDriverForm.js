import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';



function RideAssignDriverForm({ initialContents, submitAction, buttonLabel = "Assign Driver" }) {
    const navigate = useNavigate();
    

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents }
    );


    const [shifts, setShifts] = useState([]);
    useEffect(() => {
        // Fetch the shifts from the backend
        const fetchShifts = async () => {
            try {
                const response = await fetch('/api/shift/all');
                const data = await response.json();
                setShifts(data);
            } catch (error) {
                console.error('Error fetching shifts:', error);
            }
        };
        fetchShifts();
    }, []);

    const [driver, setDriver] = useState([]);
    useEffect(() => {
        // Fetch the shifts from the backend
        const fetchShifts = async () => {
            try {
                const response = await fetch('/api/drivers/all');
                const data = await response.json();
                setDriver(data);
            } catch (error) {
                console.error('Error fetching shifts:', error);
            }
        };
        fetchShifts();
    }, []);

    shifts.forEach(shifts => {   // link the driver to the shift
        driver.forEach(driver => {
            if (shifts.driverID === driver.id) {
                shifts.driver = driver.fullName;
            }
        });
    });


    const testIdPrefix = "RideAssignDriverForm";


    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        defaultValue={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="shiftId">Shift Id</Form.Label>
                <Form.Select
                    data-testid={testIdPrefix + "-shiftId"}
                    id="shiftId"
                    defaultValue={initialContents?.shiftId}
                    isInvalid={Boolean(errors.shiftId)}

                    {...register("shiftId", {
                        required: "Shift Id is required."
                    })}
                >
                    {shifts.map(shifts=> (
                        <option key={shifts.id} value={shifts.id}>
                            {shifts.id} - {shifts.driver} - {shifts.day} {shifts.shiftStart}-{shifts.shiftEnd}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.shiftId?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="day">Day of Week</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-day"}
                    id="day"
                    isInvalid={Boolean(errors.day)}
                    {...register("day")}
                    disabled
                    defaultValue={initialContents?.day}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="start">Start Time</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-start"}
                    id="start"
                    type="text"
                    {...register("start")}
                    disabled
                    defaultValue={initialContents?.startTime}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="end">End Time</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-end"}
                    id="end"
                    type="text"
                    {...register("end")}
                    disabled
                    defaultValue={initialContents?.endTime}     
                />
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickupBuilding">Pick Up Building</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-pickupBuilding"}
                    id="pickupBuilding"
                    type="text"
                    isInvalid={Boolean(errors.pickupBuilding)}
                    {...register("pickupBuilding")}
                    disabled
                    defaultValue={initialContents?.pickupBuilding} 
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickupRoom">Room Number for Pickup</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-pickupRoom"}
                    id="pickupRoom"
                    type="text"
                    isInvalid={Boolean(errors.pickupRoom)}
                    {...register("pickupRoom")}
                    disabled
                    defaultValue={initialContents?.pickupRoom} 
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoffBuilding">Drop Off Building</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dropoffBuilding"}
                    id="dropoffBuilding"
                    type="text"
                    isInvalid={Boolean(errors.dropoffBuilding)}
                    {...register("dropoffBuilding")}
                    disabled
                    defaultValue={initialContents?.dropoffBuilding}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoffRoom">Room Number for Dropoff</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dropoffRoom"}
                    id="dropoffRoom"
                    type="text"
                    isInvalid={Boolean(errors.dropoffRoom)}
                    {...register("dropoffRoom")}
                    disabled
                    defaultValue={initialContents?.dropoffRoom} 
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="course">Course Number</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-course"}
                    id="course"
                    type="text"
                    isInvalid={Boolean(errors.course)}
                    {...register("course")}
                    disabled
                    defaultValue={initialContents?.course} 
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="notes">Notes</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-notes"}
                    id="notes"
                    type="text"
                    isInvalid={Boolean(errors.notes)}
                    {...register("notes")}
                    disabled
                    defaultValue={initialContents?.notes} 
                />
            </Form.Group>


            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RideAssignDriverForm;