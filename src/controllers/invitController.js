import * as InvitationService from "../services/invitService.js";

const createInvitation = async (req, res) => {
  try {
    const invitation = await InvitationService.createInvitation(req.body);
    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateInvitation = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updatedInvitation = await InvitationService.updateInvitationStatus(
      id,
      status
    );
    res.json(updatedInvitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const invitation = await InvitationService.getInvitationById(id);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    res.json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createInvitation, updateInvitation, getInvitation };
