import { Router } from "express";
import { checkIfAuthenticated } from "../../Middleware/CheckAuth";
import { UserType } from "../../types/user";
import handleSendingAppointmentRequestToDesigner from "../../Controllers/booking/appointmentRequest";
import BodyValidator from "../../Middleware/BodyValidator";
import { z } from "zod";
import { handleFetchingDesignerTimes } from "../../Controllers/booking/availableTimesFetching";
import handleCancelBookingRequest from "../../Controllers/booking/cancellingBookingRequest";
import handleAcceptingUserAppointmentRequest from "../../Controllers/booking/acceptingAppointment";
import { handleFetchUserAppointments } from "../../Controllers/booking/fetchUserAppointments";
import { acceptAppointmentRequest } from "../../Models/AppointmentsModel";
import { deployNotification } from "../../Models/Notifications";
import { ResStatus } from "../../Exceptions/main";
import { handleFetchRequests } from "../../Controllers/booking/fetchRequests";
import { deleteAvailbilityTime, handleCreateAvailbityTime } from "../../Controllers/booking/createAvailabilityTime";
import { postAvailableTime } from "../../../Services/validationSchemas/UserSchema";
import handleRejectingAppointmentRequest from "../../Controllers/booking/rejectingAppointment";

const router = Router();

const AppointmentSendingSchema = z.object({
    availableTimeId: z.number().int().min(0),
    requestDescription: z.string().min(0).max(8192),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in the format YYYY-MM-DD"
      })
});

// for all kinds of users
router.get("", checkIfAuthenticated(), handleFetchUserAppointments); // GET /appointments
router.get("/:designerId/available-times", handleFetchingDesignerTimes);
router.get("/requests", checkIfAuthenticated(), handleFetchRequests);
router.post("/available-times", checkIfAuthenticated(UserType.Designer), BodyValidator({schema: postAvailableTime}), handleCreateAvailbityTime);
router.delete("/available-times/:id", checkIfAuthenticated(UserType.Designer), deleteAvailbilityTime);

// for users
router.post("/:designerId/requests", checkIfAuthenticated(UserType.User), BodyValidator({schema: AppointmentSendingSchema}), handleSendingAppointmentRequestToDesigner);
router.delete("/:designerId/requests/:requestId", checkIfAuthenticated(UserType.User), handleCancelBookingRequest);

// for designers.
router.post("/requests/:requestId", checkIfAuthenticated(UserType.Designer), handleAcceptingUserAppointmentRequest);
router.delete("/requests/:requestId", checkIfAuthenticated(UserType.Designer), handleRejectingAppointmentRequest);

// FOR TESTING
router.post("/forceaccept", async (req, res) => {
  console.log("asfsa");
  const designerId: string = req.body.designerId;
  const requestId: number = req.body.requestId;

  const acceptedSuccessfully = await acceptAppointmentRequest(designerId, requestId);
  await deployNotification({from: "User", notification: "BookingConfirmed"}, acceptedSuccessfully.data?.userId?? "", {}, designerId);

  
  res.status(ResStatus.OK).json({
    message: "Successfully confirmed This Appointment."
});
})

export default router;