import Organization from "../models/orgModel.js";
import { logger } from "../utils/logger.js";

const organizationService = {
  async createOrganization(orgData) {
    const organization = new Organization(orgData);
    await organization.save();
    logger.info("organization created successfully");
    return organization;
  },

  async getOrganizationById(orgId) {
    logger.info("Organization feched successfully!");
    return Organization.findById(orgId).populate("members");
  },

  async getAllOrganizations() {
    logger.info("All Organization feched successfully!");
    return Organization.find({}).populate("members");
  },

  async updateOrganizationById(orgId, updateData) {
    logger.info("Organization updated successfully!");
    return Organization.findByIdAndUpdate(orgId, updateData, { new: true });
  },

  async deleteOrganizationById(orgId) {
    logger.info("Organization deleted successfully!");
    return Organization.findByIdAndDelete(orgId);
  },
};

export default organizationService;
