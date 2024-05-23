import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useBackend } from 'main/utils/useBackend';
import React from 'react'

function ShiftForm({ initialContents, submitAction, buttonLabel = "Create" }) {
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues: initialContents || {} });

    const { data: drivers, _error, _status } =
        useBackend(
            [`/api/drivers/all`],
            {
                method: "GET",
                url: `/api/drivers/all`
            },
        );
    // Stryker restore all

    const navigate = useNavigate();
    const testIdPrefix = "ShiftForm";

    return (
        <Form onSubmit={handleSubmit(submitAction)}>
            
            {initialContents && (
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        name="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3">
                <Form.Label htmlFor="day">Day of the Week</Form.Label>
                <Form.Control 
                    as="select"
                    data-testid={testIdPrefix + "-day"}
                    id="day"
                    name="day"
                    isInvalid={Boolean(errors.day)}
                    {...register("day", {
                        required: "Day is required."
                    })}
                >
                    <option value="">Select a day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.day?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="shiftStart">Shift Start</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-shiftStart"}
                    id="shiftStart"
                    name="shiftStart"
                    type="text"
                    placeholder="HH:MMAM/PM e.g. 11:00AM"
                    isInvalid={Boolean(errors.shiftStart)}
                    {...register("shiftStart", {
                        required: "Shift start time is required.",
                        pattern: {
                            value: /^(0[0-9]|1[0-2]):[0-5][0-9](AM|PM)$/,
                            message: "Invalid time format."
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.shiftStart?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="shiftEnd">Shift End</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-shiftEnd"}
                    id="shiftEnd"
                    name="shiftEnd"
                    type="text"
                    placeholder="HH:MMAM/PM e.g. 01:37PM"
                    isInvalid={Boolean(errors.shiftEnd)}
                    {...register("shiftEnd", {
                        required: "Shift end time is required.",
                        pattern: {
                            value: /^(0[0-9]|1[0-2]):[0-5][0-9](AM|PM)$/,
                            message: "Invalid time format."
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.shiftEnd?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="driverID">Driver ID</Form.Label>
                <Form.Select
                    data-testid={testIdPrefix + "-driverID"}
                    id="driverID"
                    name="driverID"
                    {...register("driverID")}
                >
                {drivers && drivers.map((driver) => (
                    <option key={driver.id} data-testid={testIdPrefix + "-driverId-" + driver.id} value={driver.id.toString()}>{driver.id} - {driver.fullName}</option>
                ))
                }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="driverBackupID">Driver Backup ID</Form.Label>
                <Form.Select
                    data-testid={testIdPrefix + "-driverBackupID"}
                    id="driverBackupID"
                    name="driverBackupID"
                    {...register("driverBackupID")}
                >
                {drivers && drivers.map((driver) => (
                    <option key={driver.id} data-testid={testIdPrefix + "-driverBackupId-" + driver.id}  value={driver.id.toString()}>{driver.id} - {driver.fullName}</option>
                ))}
                </Form.Select>
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
    );
}

export default ShiftForm;
