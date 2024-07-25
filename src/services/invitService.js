import Invitation from "../models/invitModel.js"; // Assuming the model file is named invitationModel.js
import { logger } from "../utils/logger.js";

const createInvitation = async (invitationData) => {
  try {
    const invitation = new Invitation(invitationData);
      await invitation.save();
    logger.info("Invitation created successfully");
    return invitation;
  } catch (error) {
    throw new Error("Error creating invitation: " + error.message);
  }
};

const updateInvitationStatus = async (invitationId, status) => {
  try {
    const invitation = await Invitation.findByIdAndUpdate(
      invitationId,
      { status },
      { new: true }
      );
    logger.info("Invitation status updated successfully");
    return invitation;
  } catch (error) {
    throw new Error("Error updating invitation status: " + error.message);
  }
};

const getInvitationById = async (invitationId) => {
  try {
      const invitation = await Invitation.findById(invitationId);
    logger.info("Invitation fetched successfully");
    return invitation;
  } catch (error) {
    throw new Error("Error fetching invitation: " + error.message);
  }
};

export { createInvitation, updateInvitationStatus, getInvitationById };
