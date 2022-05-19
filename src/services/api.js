import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACK_URL;

function createConfig(token) {
  return {
    headers: {
      Authorization: `${token}`,
    },
  };
}

export async function signUp(formData) {
  try {
    await axios.post(`${BASE_URL}/sign-up`, formData);
    return true;
  } catch (error) {
    console.log(error.response);
  }
}

export async function signIn(formData) {
  try {
    const promise = await axios.post(`${BASE_URL}/sign-in`, formData);
    return promise.data;
  } catch (error) {
    console.log(error.response);
  }
}
