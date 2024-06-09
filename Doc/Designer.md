## Business Documentation for Designer Module

### Overview
The Designer module manages designer profiles, portfolios, and services. This module allows users to view designer profiles, portfolios, and available services, while designers can update their profiles, manage their portfolios, and create or update services.

### Components
1. **Designer Controllers**
2. **Model Functions**
3. **Utility Functions**

### Controllers

#### Read All Designers Controller
- **Endpoint**: `/designers`
- **Method**: `GET`
- **Description**: Retrieves a list of designers based on query parameters.
- **Handler Function**: `getAllDesigners`
- **Request**:
  - **Query Parameters**: Various filters such as name, location, minRating, gender, yearsOfExperience, category, page, limit, and sortBy.
- **Response**:
  - **Success (200)**: Returns a list of designers matching the query parameters.
  - **Failure (400)**: Returns validation errors for incorrect query parameters.
  - **Failure (500)**: Returns internal server error.

#### Get Designer By ID
- **Endpoint**: `/designers/:id`
- **Method**: `GET`
- **Description**: Retrieves a designer profile by ID.
- **Handler Function**: `getDesignerById`
- **Request**:
  - **Params**: `id` (designer ID)
- **Response**:
  - **Success (200)**: Returns the designer profile.
  - **Failure (404)**: Returns error if the designer is not found.
  - **Failure (500)**: Returns internal server error.

#### Get Designer Portfolio By ID
- **Endpoint**: `/designers/:id/portfolio`
- **Method**: `GET`
- **Description**: Retrieves the portfolio of a designer by ID.
- **Handler Function**: `getDesignerPortfolioById`
- **Request**:
  - **Params**: `id` (designer ID)
- **Response**:
  - **Success (200)**: Returns the designer's portfolio.
  - **Failure (500)**: Returns internal server error.

#### Delete Designer Portfolio File
- **Endpoint**: `/designers/:id/portfolio/:fileId`
- **Method**: `DELETE`
- **Description**: Deletes a portfolio file of a designer.
- **Handler Function**: `deleteDesignerPortofolioFile`
- **Request**:
  - **Params**: `id` (designer ID), `fileId` (portfolio file ID)
- **Response**:
  - **Success (200)**: Confirms the file has been removed.
  - **Failure (500)**: Returns internal server error.

#### Upload/Update Designer Portfolio File
- **Endpoint**: `/designers/:id/portfolio/:fileId`
- **Method**: `POST`
- **Description**: Uploads or updates a portfolio file for a designer.
- **Handler Function**: `uploadUpdateDesignerProtofolioFile`
- **Request**:
  - **Params**: `id` (designer ID), `fileId` (portfolio file ID)
  - **Body**: Contains the file to be uploaded.
- **Response**:
  - **Success (200)**: Confirms the file has been uploaded.
  - **Failure (400)**: Returns invalid file error.
  - **Failure (500)**: Returns internal server error.

#### Delete Designer Avatar
- **Endpoint**: `/designers/:id/avatar`
- **Method**: `DELETE`
- **Description**: Deletes the avatar of a designer.
- **Handler Function**: `deleteDesignerAvatar`
- **Request**:
  - **Params**: `id` (designer ID)
- **Response**:
  - **Success (200)**: Confirms the avatar has been removed.
  - **Failure (500)**: Returns internal server error.

#### Upload/Update Designer Avatar
- **Endpoint**: `/designers/:id/avatar`
- **Method**: `POST`
- **Description**: Uploads or updates the avatar of a designer.
- **Handler Function**: `uploadUpdateDesignerAvatar`
- **Request**:
  - **Params**: `id` (designer ID)
  - **Body**: Contains the file to be uploaded.
- **Response**:
  - **Success (200)**: Confirms the avatar has been uploaded.
  - **Failure (400)**: Returns invalid file error.
  - **Failure (500)**: Returns internal server error.

#### Create Designer Service
- **Endpoint**: `/designers/:id/services`
- **Method**: `POST`
- **Description**: Creates a new service for a designer.
- **Handler Function**: `createDesignerService`
- **Request**:
  - **Params**: `id` (designer ID)
  - **Body**: Contains service details.
- **Response**:
  - **Success (200)**: Confirms the service has been created.
  - **Failure (500)**: Returns internal server error.

#### Update Designer Service
- **Endpoint**: `/designers/:id/services/:serviceId`
- **Method**: `PUT`
- **Description**: Updates an existing service for a designer.
- **Handler Function**: `updateDesignerService`
- **Request**:
  - **Params**: `id` (designer ID), `serviceId` (service ID)
  - **Body**: Contains updated service details.
- **Response**:
  - **Success (200)**: Confirms the service has been updated.
  - **Failure (500)**: Returns internal server error.

#### Read Designer Profile Data
- **Endpoint**: `/designers/:id/profile`
- **Method**: `GET`
- **Description**: Retrieves the profile data of a designer.
- **Handler Function**: `readDesignerProfileData`
- **Request**:
  - **Params**: `id` (designer ID)
- **Response**:
  - **Success (200)**: Returns the designer's profile data.
  - **Failure (500)**: Returns internal server error.

#### Update Designer Data
- **Endpoint**: `/designers/:id/profile`
- **Method**: `PUT`
- **Description**: Updates the profile data of a designer.
- **Handler Function**: `updateDesignerData`
- **Request**:
  - **Params**: `id` (designer ID)
  - **Body**: Contains updated profile data.
- **Response**:
  - **Success (200)**: Confirms the profile data has been updated.
  - **Failure (500)**: Returns internal server error.

### Model Functions

#### readAllDesigners
- **Description**: Retrieves a list of designers based on filter criteria.
- **Parameters**: `filters` (DesignerFilters)
- **Returns**: List of designers matching the criteria.

#### findDesignerBy
- **Description**: Retrieves a designer profile by unique criteria.
- **Parameters**: `data` (Prisma.DesignerProfileWhereUniqueInput)
- **Returns**: Designer profile or null if not found.

#### findDesignerPortfolioBy
- **Description**: Retrieves the portfolio of a designer by unique criteria.
- **Parameters**: `data` (Prisma.DesignerProfileWhereUniqueInput)
- **Returns**: List of portfolio items.

#### addPortofolioFile
- **Description**: Adds a portfolio file for a designer.
- **Parameters**: `data` (Prisma.PortfolioCreateInput)
- **Returns**: Created portfolio file.

#### updatePortofolioFileByID
- **Description**: Updates a portfolio file by ID.
- **Parameters**: `id` (string), `data` (Prisma.PortfolioUpdateInput)
- **Returns**: Updated portfolio file.

#### deletePortofolioFileByID
- **Description**: Deletes a portfolio file by ID.
- **Parameters**: `id` (string)
- **Returns**: Deleted portfolio file.

#### addService
- **Description**: Adds a new service for a designer.
- **Parameters**: `data` (Prisma.ServiceCreateInput)
- **Returns**: Created service.

#### updateServiceByID
- **Description**: Updates a service by ID.
- **Parameters**: `id` (string), `data` (Prisma.ServiceUpdateInput)
- **Returns**: Updated service.

### Utility Functions

#### isOpenNow
- **Description**: Checks if a designer is currently open based on their working hours.
- **Parameters**: `workingDays` (WorkingHours)
- **Returns**: Object with open status and open until time.

#### formatWorkingDays
- **Description**: Formats the working days into a more readable format.
- **Parameters**: `workingDays` (WorkingHours)
- **Returns**: List of formatted working days.

#### parseWorkingDays
- **Description**: Parses a working days string into an object.
- **Parameters**: `workingDaysStr` (string)
- **Returns**: Parsed working days object.

### Flow Summary

1. **Read All Designers**:
   - User requests a list of designers with optional filters.
   - System validates the query parameters and retrieves the list of designers matching the criteria.
   - Responds with the list of designers and pagination details.

2. **Get Designer By ID**:
   - User requests a designer's profile by ID.
   - System retrieves the designer's profile.
   - Responds with the designer's profile data or an error if not found.

3. **Get Designer Portfolio By ID**:
   - User requests the portfolio of a designer by ID.
   - System retrieves the designer's portfolio.
   - Responds with the portfolio data.

4. **Delete Designer Portfolio File**:


   - Designer requests to delete a portfolio file by file ID.
   - System deletes the file from storage and the database.
   - Responds with a confirmation message.

5. **Upload/Update Designer Portfolio File**:
   - Designer uploads or updates a portfolio file.
   - System stores the file and updates the database.
   - Responds with the file URL and confirmation message.

6. **Delete Designer Avatar**:
   - Designer requests to delete their avatar.
   - System deletes the avatar from storage and updates the database.
   - Responds with a confirmation message.

7. **Upload/Update Designer Avatar**:
   - Designer uploads or updates their avatar.
   - System stores the file and updates the database.
   - Responds with the avatar URL and confirmation message.

8. **Create Designer Service**:
   - Designer creates a new service.
   - System validates and stores the service details.
   - Responds with the created service details and confirmation message.

9. **Update Designer Service**:
   - Designer updates an existing service.
   - System validates and updates the service details.
   - Responds with the updated service details and confirmation message.

10. **Read Designer Profile Data**:
    - User requests the profile data of a designer by ID.
    - System retrieves the profile data.
    - Responds with the profile data or an error if not found.

11. **Update Designer Data**:
    - Designer updates their profile data.
    - System validates and updates the profile data.
    - Responds with a confirmation message.