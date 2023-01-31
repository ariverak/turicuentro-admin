import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Correo inválido.").required("El correo es obligatorio."),
  password: yup.string().min(6,"Contraseña con mínimo 6 carácteres.").required("La contraseña es obligatoria."),
});