import organizationService from "../services/orgService.js";    

const organizationController = {
  async create(req, res) {
    try {
      const organization = await organizationService.createOrganization(
        req.body
      );
      res.status(201).json(organization);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const organization = await organizationService.getOrganizationById(
        req.params.id
      );
      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }
      res.json(organization);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const organizations = await organizationService.getAllOrganizations();
      res.status(200).send({
        success: true,
        message: "successful!",
        totalOrg: organizations.length,
        organizations,
      })
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const organization = await organizationService.updateOrganizationById(
        req.params.id,
        req.body
      );
      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }
      res.json(organization);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await organizationService.deleteOrganizationById(req.params.id);
      res.status(201).send({
        success: true,
        message: "Deleted successfully!",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default organizationController;
