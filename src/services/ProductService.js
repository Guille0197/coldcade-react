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
  client_uuid,
  cant_product
) => {
  const dateHarvest = new Date(date_harvest)
    .toLocaleDateString("en-CA")
    .split("/")
    .join("-");
  return await axios
    .post(
      `${baseURL}/product/`,
      {
        body: {
          cli_uuid: client_uuid,
          harvest_date: dateHarvest,
          type: typeProduct.name,
          name: nameProduct,
          container_uuid: container_uuid_code,
          prod_qty: cant_product,
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
  client_uuid,
  cant_product
) => {
  const dateHarvest = new Date(date_harvest)
    .toLocaleDateString("en-CA")
    .split("/")
    .join("-");
  return await axios
    .put(
      `${baseURL}/product/${uuid}`,
      {
        body: {
          cli_uuid: client_uuid,
          harvest_date: dateHarvest,
          type: typeProduct.name,
          name: nameProduct,
          container_uuid: container_uuid_code,
          prod_qty: cant_product,
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
