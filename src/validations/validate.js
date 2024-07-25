import BaseJoi from "joi";
import JoiDate from "@joi/date";

const Joi = BaseJoi.extend(JoiDate);

const validateForm = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  email: Joi.string().email().required(),
  taskdate: Joi.date().required(),
});

export default validateForm;
