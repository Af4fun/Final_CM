import axios from 'axios';

const service = axios.create({
  baseURL: 'http://129.28.160.99:8000/'
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    //
    console.log(res);
    if (!res.IsSuccess) {
      return Promise.reject(res.Msg || 'Error');
    }
    return res.Data;
  },
  (error) => {
    console.log(`网络${error}`); // for debug
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('网络错误');
  }
);

export default service;
