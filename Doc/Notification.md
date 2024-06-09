## Business Documentation for Notification Module

### Overview
The Notification module manages user notifications. This module allows users to retrieve their notifications and mark them as read.

### Components
1. **Notification Controllers**
2. **Model Functions**

### Controllers

#### Get User Notifications Controller
- **Endpoint**: `/notifications`
- **Method**: `GET`
- **Description**: Retrieves all notifications for the authenticated user.
- **Handler Function**: `GetUserNotificationsController`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Returns a list of notifications.
  - **Failure (500)**: Returns internal server error if user is undefined.

#### Mark Users Notifications As Read Controller
- **Endpoint**: `/notifications/read`
- **Method**: `POST`
- **Description**: Marks specified notifications as read for the authenticated user.
- **Handler Function**: `MarkUsersNotificationsAsRead`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains an array of notification IDs to be marked as read.
- **Response**:
  - **Success (200)**: Confirms that notifications have been marked as read.
  - **Failure (403)**: Returns forbidden status if the operation is not successful.
  - **Failure (500)**: Returns internal server error if user is undefined.

### Model Functions

#### deployNotification
- **Description**: Deploys a new notification.
- **Parameters**: `settings` (NotificationBodySettings), `receiverUserID` (string), `meta` (Object), `senderUserId` (string | undefined)
- **Returns**: Boolean indicating success or failure.

#### markNotificationsAsRead
- **Description**: Marks specified notifications as read.
- **Parameters**: `receiverId` (string), `IDs` (number[])
- **Returns**: Boolean indicating success or failure.

#### getAllUserNotifications
- **Description**: Retrieves all notifications for a user.
- **Parameters**: `recieverId` (string), `limit` (number)
- **Returns**: List of notifications.

### Flow Summary

1. **Get User Notifications**:
   - User requests to retrieve their notifications.
   - System checks if the user is authenticated.
   - System retrieves notifications for the user from the database.
   - System maps notifications to the required format.
   - Responds with a list of notifications.

2. **Mark Notifications As Read**:
   - User requests to mark notifications as read with specified notification IDs.
   - System checks if the user is authenticated.
   - System updates the specified notifications as read in the database.
   - Responds with a confirmation message indicating success or failure.

   ![image](https://github.com/MIS-Team24/khoyout-backend/assets/73319030/9753a364-7635-48c0-b07a-0e83367ddf74)