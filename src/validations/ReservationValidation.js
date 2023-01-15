import * as yup from "yup";

export const reservationSchema = yup.object().shape({
  cabinId: yup.number().required("Seleccionar una cabaña es obligatorio.").positive("Seleccionar una cabaña es obligatorio."),
  customerId: yup.number().required("Seleccionar un cliente es obligatorio."),
  amount: yup.number().positive("Monto inválido.").integer().min(0),
  discount: yup.number("Debe ser un número").positive("Descuento inválido.").integer().min(0),
  comments: yup.string(),
  startDate: yup.date().required("La fecha inicial es obligatoria."),
  endDate: yup.date().required("La fecha de término es obligatoria.").nullable()
});