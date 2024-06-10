## Business Documentation for Payment Module

### Overview
The Payment module handles subscription payments for designers. This module allows designers to initiate and manage their subscriptions, and integrates with Stripe for payment processing.

### Components
1. **Payment Controllers**
2. **Model Functions**
3. **Service Functions**
4. **Webhook Handlers**

### Controllers

#### Initiate Checkout Session Controller
- **Endpoint**: `/payments/checkout`
- **Method**: `POST`
- **Description**: Initiates a checkout session for a designer subscription.
- **Handler Function**: `handleDesignerInitiateCheckout`
- **Request**:
  - **Headers**: Contains user session information.
  - **Body**: Contains the subscription plan (`standard` or `premium`).
- **Response**:
  - **Success (200)**: Returns the payment URL for the checkout session.
  - **Failure (401)**: Unauthorized if the designer is not authenticated or email is not activated.
  - **Failure (422)**: Unprocessable entity if the plan is invalid.
  - **Failure (500)**: Internal server error for any other issues.

#### Get My Subscription Controller
- **Endpoint**: `/subscription`
- **Method**: `GET`
- **Description**: Retrieves the subscription tier of the authenticated designer.
- **Handler Function**: `handleGetMySubscription`
- **Request**:
  - **Headers**: Contains user session information.
- **Response**:
  - **Success (200)**: Returns the subscription plan or "None" if not subscribed.
  - **Failure (404)**: Not found if the designer is not authenticated.
  - **Failure (500)**: Internal server error for any other issues.

### Model Functions

#### createPaymentSession
- **Description**: Creates a payment session record in the database.
- **Parameters**: `designerId` (string), `checkoutSessionId` (string), `checkoutUrl` (string)
- **Returns**: Boolean indicating success or failure.

### Service Functions

#### createCheckoutSession
- **Description**: Creates a Stripe checkout session for a designer.
- **Parameters**: `designerId` (string), `email` (string), `plan` ("standard" | "premium")
- **Returns**: Session creation result containing the session ID and URL, or false if failed.

#### cancelCheckoutSession
- **Description**: Cancels a Stripe checkout session.
- **Parameters**: `checkoutSessionId` (string)
- **Returns**: Void.

### Webhook Handlers

#### Stripe Webhook Signature Verification
- **Function**: `StripeWebHookSign`
- **Description**: Verifies the Stripe webhook signature and attaches the event to the request object.
- **Parameters**: `request` (Request), `response` (Response), `next` (NextFunction)
- **Returns**: Proceeds to next middleware if signature is valid, otherwise returns 400 error.

### Flow Summary

1. **Initiate Checkout Session**:
   - Designer requests to initiate a checkout session for a subscription.
   - System verifies the designer's authentication and validates the plan.
   - System creates a Stripe checkout session.
   - System saves the checkout session in the database.
   - Responds with the payment URL for the checkout session.

2. **Get My Subscription**:
   - Designer requests to retrieve their subscription tier.
   - System verifies the designer's authentication.
   - System retrieves the subscription tier from the database.
   - Responds with the subscription plan or "None" if not subscribed.

3. **Stripe Webhook Signature Verification**:
   - Stripe sends a webhook event.
   - System verifies the webhook signature.
   - System attaches the verified event to the request object and proceeds to the next middleware.

   ![image](https://github.com/MIS-Team24/khoyout-backend/assets/73319030/2247b5af-2d97-4a26-9f3d-d875d870d1ba)