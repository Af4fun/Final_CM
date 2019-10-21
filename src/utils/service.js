import request from './request';

export const getWxconfig = url => request({
  url: '/api/wechat/GetSign',
  method: 'GET',
  params: {
    url
  }
});
