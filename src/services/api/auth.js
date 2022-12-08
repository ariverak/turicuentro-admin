import axios from "../axios";

export const onLogin = async ({ email, password }) => {
  try {
    const {data} = await axios.post("/login", {email, password} );
    localStorage.setItem("token", data.token);
    window.location.reload();
  } catch (error){
   console.log(error(error.response.data.msg));
  }
};
