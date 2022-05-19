import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const getAccessLogin = async ({ username, password }) => {
  return await axios
    .post(
      `${baseURL}/login/`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const postRegisterUser = async ({
  name,
  password,
  address,
  cellphone,
  email,
}) => {
  return await axios
    .post(
      `${baseURL}/user/`,
      {
        body: {
          user_name: name,
          user_pass: password,
          user_dir: address,
          user_cellphone: cellphone,
          user_role: 2,
          user_email: email,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export { getAccessLogin, postRegisterUser };
