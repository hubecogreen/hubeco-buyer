import axios from "./axios-config";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const callPostApi = (endPoint, data, token) => {
  return axios.post(baseURL + "/" + endPoint, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const callPostApiWithImage = (endPoint, data, token) => {
  return axios.post(baseURL + "/" + endPoint, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const callGetApi = (endPoint, token) => {
  return axios.get(baseURL + "/" + endPoint, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const callPutApi = (endPoint, data, token) => {
  return axios.put(baseURL + "/" + endPoint, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const callPatchApi = (endPoint, data, token) => {
  return axios.patch(baseURL + '/' + endPoint, data, {
    headers:
      {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    
  })
}

export const callLogout = (endPoint,token) => {
  return axios.post(baseURL + '/' + endPoint, {
    headers:
      {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    
  })
}


export const postProtocols = (endPoint, data, token) => {
  //// // console.log('token in get', token)

  return axios.post(baseURL + "/" + endPoint, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const callDelApi = (endPoint, data, token) => {
  return axios.delete(baseURL + "/" + endPoint, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};



export const getStatesApi = (endPoint) => {
  return axios.get(baseURL + "/" + endPoint, {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};


export const getCitiesApi = (endPoint) => {
  return axios.get(baseURL + "/" + endPoint, {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

