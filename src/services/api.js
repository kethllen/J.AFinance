import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACK_URL;

function createConfig(token) {
  return {
    headers: {
      Authorization: token,
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

export async function obrasGet(token) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.get(`${BASE_URL}/obras`, authorization);
    return promise.data;
  } catch (error) {
    console.log(error.response);
  }
}
export async function obrasPost(token, formData) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.post(
      `${BASE_URL}/obras`,
      formData,
      authorization
    );
    return promise.data;
  } catch (error) {
    const erro = error.response.status;
    return erro;
  }
}
export async function entradasGet(token, id) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.get(
      `${BASE_URL}/obras/${id}/entradas`,
      authorization
    );
    return promise.data;
  } catch (error) {
    console.log(error.response);
  }
}
export async function entradasPost(token, formData) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.post(
      `${BASE_URL}/entradas`,
      formData,
      authorization
    );
    return promise.data;
  } catch (error) {
    const erro = error.response.status;
    return erro;
  }
}
export async function despesasGet(token, id) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.get(
      `${BASE_URL}/obras/${id}/despesas`,
      authorization
    );
    return promise.data;
  } catch (error) {
    console.log(error.response);
  }
}
export async function despesasPost(token, formData) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.post(
      `${BASE_URL}/despesas`,
      formData,
      authorization
    );
    return promise.data;
  } catch (error) {
    const erro = error.response.status;
    return erro;
  }
}
export async function funcionariosGet(token) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.get(`${BASE_URL}/funcionarios`, authorization);
    return promise.data;
  } catch (error) {
    console.log(error.response);
  }
}
export async function funcionariosPost(token, formData) {
  try {
    const authorization = createConfig(token);
    const promise = await axios.post(
      `${BASE_URL}/funcionarios`,
      formData,
      authorization
    );
    return promise.data;
  } catch (error) {
    const erro = error.response.status;
    return erro;
  }
}
