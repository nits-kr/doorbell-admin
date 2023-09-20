import UserHttpService from "./UserHttpService";
import Swal from "sweetalert2";

export async function UserLogin(email, password) {
  try {
    const { data } = await UserHttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}user/user/user/login`,
      {
        userEmail: email,
        password: password,
      }
    );
    console.log(data);
    if (data?.error) {
      Swal.fire({
        title: data?.message,
        icon: "error",
        confirmButtonText: "ok",
        confirmButtonColor: "red",
      });
    }
    return { data };
  } catch (error) {
    if (error.response) {
      console.log(error?.response?.data.message);
      Swal.fire({
        title: error?.response?.data.message,
        text: "",
        icon: "error",
        confirmButtonText: "ok",
        confirmButtonColor: "red",
      });
    }
    return error;
  }
}
