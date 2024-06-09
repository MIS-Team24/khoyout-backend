## Business Documentation for Booking Module

### Overview
The Booking module manages the scheduling and management of appointments between users and designers. This module allows users to request, accept, and cancel appointments and enables designers to manage their availability.

### Components
1. **Appointment Controllers**
2. **Model Functions**
3. **Utility Functions**

### Controllers

#### Accepting Appointment
- **Endpoint**: `/accept-appointment`
- **Method**: `POST`
- **Description**: Handles the acceptance of an appointment request by the designer.
- **Handler Function**: `handleAcceptingUserAppointmentRequest`
- **Request**:
  - **Query Parameters**: `requestId` (number)
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Confirms the appointment has been accepted.
  - **Failure (400)**: Returns invalid data error.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.

#### Appointment Request
- **Endpoint**: `/appointment-request/:designerId`
- **Method**: `POST`
- **Description**: Handles the sending of an appointment request from a user to a designer.
- **Handler Function**: `handleSendingAppointmentRequestToDesigner`
- **Request**:
  - **Params**: `designerId` (UUID)
  - **Body**: Contains `availableTimeId`, `requestDescription`, and `date`.
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Confirms the appointment request has been sent.
  - **Failure (400)**: Returns invalid data error.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.

#### Available Times Fetching
- **Endpoint**: `/designer-times/:designerId`
- **Method**: `GET`
- **Description**: Fetches all available times of a designer.
- **Handler Function**: `handleFetchingDesignerTimes`
- **Request**:
  - **Params**: `designerId` (string)
  - **Query Parameters**: `timezone` (optional, defaults to UTC)
- **Response**:
  - **Success (200)**: Returns a list of available times converted to the requested timezone.
  - **Failure (500)**: Returns internal server error.

#### Cancelling Booking Request
- **Endpoint**: `/cancel-booking/:designerId/:requestId`
- **Method**: `POST`
- **Description**: Handles the cancellation of a booking request by the user.
- **Handler Function**: `handleCancelBookingRequest`
- **Request**:
  - **Params**: `designerId` (UUID), `requestId` (number)
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Confirms the booking request has been cancelled.
  - **Failure (400)**: Returns invalid data error.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.

#### Creating Availability Time
- **Endpoint**: `/create-availability`
- **Method**: `POST`
- **Description**: Handles the creation of availability times by the designer.
- **Handler Function**: `handleCreateAvailbityTime`
- **Request**:
  - **Body**: Contains `startTime`, `endTime`, and `day`.
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Confirms the availability time has been created.
  - **Failure (400)**: Returns invalid data error.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.
  - **Failure (500)**: Returns internal server error.

#### Deleting Availability Time
- **Endpoint**: `/delete-availability/:id`
- **Method**: `DELETE`
- **Description**: Handles the deletion of availability times by the designer.
- **Handler Function**: `deleteAvailbilityTime`
- **Request**:
  - **Params**: `id` (number)
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Confirms the availability time has been deleted.
  - **Failure (400)**: Returns invalid data error.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.

#### Fetch Requests
- **Endpoint**: `/fetch-requests`
- **Method**: `GET`
- **Description**: Fetches all booking requests for the authenticated user.
- **Handler Function**: `handleFetchRequests`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Returns a list of booking requests.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.
  - **Failure (500)**: Returns internal server error.

#### Fetch User Appointments
- **Endpoint**: `/fetch-appointments`
- **Method**: `GET`
- **Description**: Fetches all appointments for the authenticated user.
- **Handler Function**: `handleFetchUserAppointments`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Returns a list of appointments.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.
  - **Failure (500)**: Returns internal server error.

### Model Functions

#### createAppointmentRequest
- **Description**: Creates an appointment request in the database.
- **Parameters**: `userId`, `designerId`, `startTime`, `endTime`, `description`
- **Returns**: Boolean indicating success or failure.

#### getAvailableTimeById
- **Description**: Retrieves available time details by ID for a designer.
- **Parameters**: `AvailableTimeId`, `designerId`
- **Returns**: Object containing start time, end time, day of the week, and designer's timezone.

#### getDesignerAllAvailableTimes
- **Description**: Retrieves all available times for a designer.
- **Parameters**: `designerId`
- **Returns**: List of available times.

#### getDesignerTimezone
- **Description**: Retrieves the timezone of a designer.
- **Parameters**: `designerId`
- **Returns**: Timezone string.

#### acceptAppointmentRequest
- **Description**: Accepts a booking request.
- **Parameters**: `designerId`, `bookingRequestId`
- **Returns**: Object containing success status and user ID.

#### cancelAppointmentRequest
- **Description**: Cancels a booking request.
- **Parameters**: `designerId`, `userId`, `bookingRequestId`
- **Returns**: Boolean indicating success or failure.

#### getAccountAppointments
- **Description**: Retrieves all appointments for an account based on user type.
- **Parameters**: `accountId`, `userType`
- **Returns**: List of appointments.

#### getAccountRequests
- **Description**: Retrieves all booking requests for an account based on user type.
- **Parameters**: `accountId`, `userType`
- **Returns**: List of booking requests.

### Utility Functions

#### convertFromTimezoneToUTC
- **Description**: Converts a time from a specific timezone to UTC.
- **Parameters**: `date`, `timeOfDay`, `timezone`
- **Returns**: Date object in UTC.

#### updateDateKeepTime
- **Description**: Updates a date object while keeping the time intact.
- **Parameters**: `date`, `dateString`
- **Returns**: Updated Date object.

#### getDayOfWeek
- **Description**: Retrieves the day of the week for a given date.
- **Parameters**: `dateInput`
- **Returns**: Day of the week as a string.

#### addHoursToDate
- **Description**: Adds a specified number of hours to a date.
- **Parameters**: `date`, `hours`
- **Returns**: Updated Date object.

#### getUTCTime
- **Description**: Retrieves the current UTC time.
- **Returns**: Current Date object in UTC.

#### convertTimeRanges
- **Description**: Converts time ranges from one timezone to another.
- **Parameters**: `timeRanges`, `sourceTimeZone`, `targetTimeZone`
- **Returns**: List of converted time ranges.

### Flow Summary
1. **Accepting Appointment**:
   - Designer submits an acceptance request with the appointment ID.
   - System verifies the designer's authentication and validates the request ID.
   - If valid, the appointment is accepted and a notification is sent to the user.
   - Responds with a confirmation message.

2. **Appointment Request**:
   - User submits an appointment request with the designer ID, available time ID, and date.
   - System verifies the user's authentication and validates the input data.
   - If valid, the appointment request is created and a notification is sent to the designer.
   - Responds with a confirmation message.

3. **Available Times Fetching**:
   - User requests the available times of a designer.
   - System retrieves the designer's available times and timezone.
   - Converts the times to the user's requested timezone.
   - Responds with the converted available times.

4. **Cancelling Booking Request**:
   - User submits a cancellation request with the designer ID and booking request ID.
   - System verifies the user's authentication and validates the input data.
   - If valid, the booking request is cancelled.
   - Responds with a confirmation message.

5. **Creating Availability Time**:
   - Designer submits a request to create an availability time with start time, end time, and day.
   - System verifies the designer's authentication and validates the input data.
   - If valid, the availability time is created.
   - Responds with a confirmation message.

6. **Deleting Availability Time**:
   - Designer submits a request to delete an availability time by ID.
   - System verifies the designer's authentication and validates the input data.
   - If valid, the availability time is deleted.
   - Responds with a confirmation message.

7. **Fetch Requests**:
   - User requests a list of all booking requests.
   - System verifies the user's authentication and retrieves the booking requests.
   - Responds with the list of booking requests.

8. **Fetch User Appointments**:
   - User requests a list of all appointments.
   - System verifies the user's authentication and retrieves the appointments.
   - Responds with the list of appointments.
