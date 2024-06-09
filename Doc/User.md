## Business Documentation for User Module

### Overview
The User module manages user profiles, avatars, passwords, accounts, and preferences. This module allows users to update their profiles, manage avatars, change passwords, delete accounts, and update their style preferences and body measurements.

### Components
1. **User Controllers**
2. **Model Functions**
3. **Utility Functions**

### Controllers

#### Delete Avatar Controller
- **Endpoint**: `/users/avatar`
- **Method**: `DELETE`
- **Description**: Deletes the avatar of a user.
- **Handler Function**: `deleteAvatarController`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Confirms the avatar has been removed.
  - **Failure (500)**: Returns internal server error.

#### Upload/Update Avatar Controller
- **Endpoint**: `/users/avatar`
- **Method**: `POST`
- **Description**: Uploads or updates the avatar of a user.
- **Handler Function**: `uploadUpdateAvatarController`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains the file to be uploaded.
- **Response**:
  - **Success (200)**: Confirms the avatar has been uploaded.
  - **Failure (400)**: Returns invalid file error.
  - **Failure (500)**: Returns internal server error.

#### Change Password Controller
- **Endpoint**: `/users/password`
- **Method**: `PUT`
- **Description**: Changes the password of a user.
- **Handler Function**: `changeUserPassword`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains the new password and repeated password.
- **Response**:
  - **Success (200)**: Confirms the password has been changed and all user sessions have been deleted.
  - **Failure (400)**: Returns error if passwords do not match.
  - **Failure (500)**: Returns internal server error.

#### Delete Account Controller
- **Endpoint**: `/users/account`
- **Method**: `DELETE`
- **Description**: Deletes a user account.
- **Handler Function**: `deleteUserAccount`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains the reason for account deletion and optional additional reason.
- **Response**:
  - **Success (200)**: Confirms the account has been deleted.
  - **Failure (500)**: Returns internal server error.

#### Read User Data Controller
- **Endpoint**: `/users/data`
- **Method**: `GET`
- **Description**: Retrieves user data.
- **Handler Function**: `readUserData`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Returns user data.
  - **Failure (400)**: Returns error if user not found.
  - **Failure (500)**: Returns internal server error.

#### Update Body Measurement Controller
- **Endpoint**: `/users/body-measurements`
- **Method**: `PUT`
- **Description**: Updates body measurement data for a user.
- **Handler Function**: `updateBodyMeasurementData`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains updated body measurement data.
- **Response**:
  - **Success (200)**: Confirms the body measurements have been updated.
  - **Failure (400)**: Returns error if user not found.
  - **Failure (500)**: Returns internal server error.

#### Update Data Controller
- **Endpoint**: `/users/data`
- **Method**: `PUT`
- **Description**: Updates user data.
- **Handler Function**: `updateUserData`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains updated user data.
- **Response**:
  - **Success (200)**: Confirms the user data has been updated.
  - **Failure (400)**: Returns error if user not found.
  - **Failure (500)**: Returns internal server error.

#### Update Style Preference Controller
- **Endpoint**: `/users/style-preferences`
- **Method**: `PUT`
- **Description**: Updates style preference data for a user.
- **Handler Function**: `updateStylePreferenceData`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains updated style preference data.
- **Response**:
  - **Success (200)**: Confirms the style preferences have been updated.
  - **Failure (400)**: Returns error if user not found.
  - **Failure (500)**: Returns internal server error.

### Model Functions

#### findUserBy
- **Description**: Finds a user by unique attribute.
- **Parameters**: `data` (Prisma.UsersWhereUniqueInput)
- **Returns**: User object or null if not found.

#### getUserByEmail
- **Description**: Finds a user by email.
- **Parameters**: `email` (string)
- **Returns**: User object or null if not found.

#### getUserLoginData
- **Description**: Retrieves login data for a user by email.
- **Parameters**: `email` (string)
- **Returns**: User login data or null if not found.

#### getUserByToken
- **Description**: Retrieves a user by token.
- **Parameters**: `token` (string), `evenIfExpired` (boolean)
- **Returns**: User object or null if not found.

#### initiateUserDbSession
- **Description**: Initiates a user session in the database.
- **Parameters**: `token` (string), `userId` (string), `expiryDateUTC` (Date)
- **Returns**: Boolean indicating success or failure.

#### deleteUserDbSession
- **Description**: Deletes a user session by token.
- **Parameters**: `token` (string)
- **Returns**: Boolean indicating success or failure.

#### deleteAllUserSessionsFromDb
- **Description**: Deletes all user sessions for a user.
- **Parameters**: `userId` (string)
- **Returns**: Boolean indicating success or failure.

#### insertAccountDeleteReason
- **Description**: Inserts a reason for account deletion.
- **Parameters**: `reason` (UserDeleteAccountReason), `otherReason` (string)
- **Returns**: Boolean indicating success or failure.

#### getUserById
- **Description**: Retrieves a user by ID.
- **Parameters**: `userId` (string)
- **Returns**: User object or null if not found.

#### changeUserPasswordDb
- **Description**: Changes the password for a user.
- **Parameters**: `baseAccountId` (string), `password` (string)
- **Returns**: Boolean indicating success or failure.

#### changeUserPasswordThroughEmailDb
- **Description**: Changes the password for a user through email.
- **Parameters**: `email` (string), `password` (string)
- **Returns**: Boolean indicating success or failure.

#### verifyEmailDb
- **Description**: Verifies a user's email.
- **Parameters**: `email` (string)
- **Returns**: Boolean indicating success or failure.

#### addUser
- **Description**: Adds a new user.
- **Parameters**: `email`, `firstName`, `lastName`, `password`
- **Returns**: Created user object.

#### updateUser
- **Description**: Updates user data.
- **Parameters**: `uniqueData` (Prisma.BaseAccountWhereUniqueInput), `data` (Prisma.BaseAccountUpdateInput)
- **Returns**: Updated user object.

#### deleteBaseAccountWithId
- **Description**: Deletes a base account by ID.
- **Parameters**: `id` (string)
- **Returns**: Deleted account object.

#### deleteUser
- **Description**: Deletes a user by unique attribute.
- **Parameters**: `data` (Prisma.UsersWhereUniqueInput)
- **Returns**: Deleted user object.

#### readUser
- **Description**: Reads all user data by unique attribute.
- **Parameters**: `data` (Prisma.UsersWhereUniqueInput)
- **Returns**: User object with related data.

#### getUserAvatarURLById
- **Description**: Retrieves the avatar URL for a user by ID.
- **Parameters**: `userId` (string)
- **Returns**: Avatar URL string or null if not found.

### Utility Functions

#### decodeFileToBase64
- **Description**: Decodes a file buffer to Base64.
- **Parameters**: `file` (Buffer)
- **Returns**: Base64 string.

#### getUTCTime
- **Description**: Retrieves the current UTC time.
- **Returns**: Current Date object in UTC.

### Flow Summary

1. **Delete Avatar**:
   - User requests to delete their avatar.
   - System deletes the avatar from storage and updates the database.
   - Responds with a confirmation message.

2. **Upload/Update Avatar**:
   - User uploads or updates their avatar.
   - System stores the file and updates the database.
   - Responds with the avatar URL and confirmation message.

3. **Change Password**:
   - User requests to change their password.
   - System validates the new password and updates the database.
   - Deletes all user sessions.
   - Responds with a confirmation message.

4. **Delete Account**

:
   - User requests to delete their account.
   - System deletes the account and related data from storage and the database.
   - Responds with a confirmation message.

5. **Read User Data**:
   - User requests to read their data.
   - System retrieves the user data.
   - Responds with the user data.

6. **Update Body Measurements**:
   - User requests to update their body measurements.
   - System updates the body measurements in the database.
   - Responds with a confirmation message.

7. **Update User Data**:
   - User requests to update their data.
   - System updates the user data in the database.
   - Responds with a confirmation message.

8. **Update Style Preferences**:
   - User requests to update their style preferences.
   - System updates the style preferences in the database.
   - Responds with a confirmation message.