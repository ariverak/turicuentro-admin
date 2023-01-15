import * as yup from "yup";

const chileanPhoneRegExp = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/

export const customerSchema = yup.object().shape({
  fullname: yup.string().required("El nombre del cliente es obligatorio.").min(3,"El nombre debe tener mínimo 3 carácteres."),
  email: yup.string().required("El correo del cliente es obligatorio.").email("Correo inválido."),
  phone: yup.string().required("El número del cliente es obligatorio.").matches(chileanPhoneRegExp, "Número de teléfono inválido."),
});