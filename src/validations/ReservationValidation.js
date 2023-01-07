import * as yup from "yup";

export const reservationSchema = yup.object().shape({
  cabinId: yup.number().required().positive().integer(),
  customerId: yup.number().required().positive().integer(),
  amount: yup.number().required().positive().integer(),
  discount: yup.number().positive().integer().min(0),
  comments: yup.string(),
  startDate: yup.date().required(),
  endDate: yup.date().required()
});