## Business Documentation for Authentication Module

### Overview
The Authentication module manages user authentication, including login, logout, OTP validation, and session management. This module ensures secure access to the system by verifying user credentials and managing user sessions. 

### Components
1. **Login Controller**
2. **Logout Controller**
3. **OTP Controller**
4. **Middleware for OTP Validation**

### Controllers

#### GetUserController
- **Endpoint**: `/get-user`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's details, including their avatar URL.
- **Handler Function**: `getUserHandler`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Returns authenticated user details with avatar URL.
  - **Failure (401)**: Returns unauthorized status if the user is not authenticated.

#### IsUserAuthController
- **Endpoint**: `/is-authenticated`
- **Method**: `GET`
- **Description**: Checks if the user is authenticated.
- **Handler Function**: `isUserAuthonticatedHandler`
- **Response**:
  - **Success (200)**: Confirms the user is authenticated.

#### LoginController
- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Handles user login by validating credentials and generating a JSON Web Token (JWT).
- **Handler Function**: `localLoginHandler`
- **Request**:
  - **Body**: Contains email and password.
- **Response**:
  - **Success (200)**: Returns user details and access token.
  - **Failure (404)**: User not found.
  - **Failure (401)**: Incorrect password.
  - **Failure (500)**: Internal server error.

#### LogoutController
- **Endpoint**: `/logout`
- **Method**: `POST`
- **Description**: Logs out the user by deleting the user session.
- **Handler Function**: `logoutHandler`
- **Request**:
  - **Headers**: Contains authorization token.
- **Response**:
  - **Success (200)**: Confirms user logged out.
  - **Failure (401)**: Unauthorized status if the token is invalid.

#### ResetPasswordController
- **Endpoint**: `/reset-password`
- **Method**: `POST`
- **Description**: (Repeated definition from LogoutController, assumed a mistake)
- **Handler Function**: `logoutHandler` (Assumed actual reset password logic needed)

#### SendingOtpController
- **Endpoint**: `/send-otp`
- **Method**: `POST`
- **Description**: Sends an OTP to the user's email for verification.
- **Handler Function**: `OtpSentToEmailHandler`
- **Request**:
  - **Body**: Contains user email.
- **Response**:
  - **Success (200)**: Returns OTP sent status and key.
  - **Failure (400)**: User not found or unable to send email.

#### ValidateOtpHandler
- **Endpoint**: `/validate-otp`
- **Method**: `POST`
- **Description**: Validates the OTP sent to the user.
- **Handler Function**: `validateOtpHandler`
- **Request**:
  - **Body**: Contains OTP and key.
- **Response**:
  - **Success (200)**: Confirms OTP is valid.
  - **Failure (400)**: OTP not valid or expired.

### Middleware

#### ValidateOtp
- **Description**: Middleware to validate the OTP before proceeding with protected routes.
- **Handler Function**: `validateOtp`
- **Request**:
  - **Body**: Contains OTP and key.
- **Validation**:
  - Checks if OTP is valid and within the validation period.
- **Response**:
  - **Success**: Proceeds to the next function.
  - **Failure (400)**: Returns error if OTP is invalid or expired.

### Flow Summary
1. **User Login**:
   - User submits email and password.
   - System validates credentials.
   - If valid, generates JWT and initiates user session.
   - Responds with user details and access token.
   
2. **User Logout**:
   - User sends logout request with authorization token.
   - System deletes user session.
   - Responds with logout confirmation.

3. **OTP Process**:
   - User requests OTP to be sent to their email.
   - System generates and sends OTP, saves it with expiration.
   - User submits OTP for validation.
   - System validates OTP and proceeds if valid.

4. **Middleware Validation**:
   - Protects routes by validating the OTP before granting access.

![image](https://github.com/MIS-Team24/khoyout-backend/assets/73319030/ab60587c-3c3b-433b-b689-bbfb9dc9332e)
