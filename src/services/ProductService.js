import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getProductsService = async () => {
  return await axios
    .get(`${baseURL}/product/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data.body);
      console.log(response.status);
      return response.data.body;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export const deleteProductService = async (uuid) => {
  return await axios
    .delete(`${baseURL}/product/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.status);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export const createProductService = async (
  nameProduct,
  typeProduct,
  date_harvest,
  container_uuid_code,
  client_uuid
) => {
  return await axios
    .post(
      `${baseURL}/product/`,
      {
        body: {
          cli_uuid: client_uuid,
          harvest_date: new Date(date_harvest).toLocaleDateString("es-US"),
          type: typeProduct,
          name: nameProduct,
          container_uuid: container_uuid_code,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export const UpdateProductService = async (
  uuid,
  nameProduct,
  typeProduct,
  date_harvest,
  container_uuid_code,
  client_uuid
) => {
  return await axios
    .put(
      `${baseURL}/product/${uuid}`,
      {
        body: {
          cli_uuid: client_uuid,
          harvest_date: "2022-03-05",
          type: typeProduct,
          name: nameProduct,
          container_uuid: container_uuid_code,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};
