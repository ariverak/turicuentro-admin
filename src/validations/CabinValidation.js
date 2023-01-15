import * as yup from "yup";

export const cabinSchema = yup.object().shape({
  name: yup.string().required("El nombre de la cabaña es obligatorio."),
  price: yup.number().required("El precio de la cabaña es obligatorio.").typeError("El precio debe ser un número.").integer("No concuerda con el peso chileno.").positive("Precio inválido."),
  color: yup.string().required("El color de la cabaña es obligatorio."), // falta desplegar el mensaje en cabins
});