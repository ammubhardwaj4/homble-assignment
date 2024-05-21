import { useReducer, useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./lib/constants";

const envBaseUrl = 'https://frontend-assessment-server.onrender.com/api';

const instance = axios.create({
  baseURL: envBaseUrl,
});

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getRequest = async (url, params = {}, responseType = 'json') => {
  return instance.get(url, {
    params,
    responseType,
  });
};

export const postRequest = async (url, data, options = {}) => {
  const contentType = options && options.contentType ? options.contentType : 'application/json';
  if (contentType && contentType !== 'multipart/form-data') {
    instance.defaults.headers['Content-Type'] = contentType;
  }

  const response = await instance.post(url, data);
  instance.defaults.headers['Content-Type'] = 'application/json';
  return response;
};

export const useApiRequest = (initialUrl, initialMethod = 'get', initialRequestData = {}, initialOptions = {}) => {
  const [state, dispatch] = useReducer(fetchDataReducer, initialState);
  const [config, setConfig] = useState({
    url: initialUrl,
    method: initialMethod,
    requestData: initialRequestData,
    options: initialOptions,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: FETCH_DATA_START });
    try {
      let response;
      if (config.method === 'get') {
        response = await instance.get(config.url, {
          params: config.requestData,
          ...config.options,
        });
      } else if (config.method === 'post') {
        response = await instance.post(config.url, config.requestData, config.options);
      }
  
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error });
    }
  }, [config]);

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = (url, method, requestData, options) => {
    setConfig({ url, method, requestData, options });
  };

  return { ...state, fetchData: refetchData };
};
