import wx from 'weixin-js-sdk';
import { getWxconfig } from './service';
export const wxConfig = async () => {
  const url = 'http://cmh5cdn.aiproject.cn';
  getWxconfig(encodeURI(url)).then(({ appId, nonceStr, signature, timestamp }) => {
    let ApiList = [
      'onMenuShareTimeline', // 分享到朋友圈接口
      'onMenuShareAppMessage', // 分享到朋友接口
      'onMenuShareQQ', // 分享到QQ接口
      'onMenuShareQZone', // 分享到QQ空间
      'onMenuShareWeibo', // 分享到微博接口
    ];
    let shareOption = {
      title: '一分钟跑完成马', // 分享标题
      desc: '一分钟跑完成马', // 分享描述
      link: 'http://cmh5cdn.aiproject.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success () {
        // 设置成功
      },
    };
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名，见附录1
      jsApiList: ApiList,
    });
    wx.ready(() => {
      wx.checkJsApi({
        jsApiList: ApiList,
        success: () => {
          console.log('checkSuccess');
        },
      });
      wx.onMenuShareTimeline(shareOption);
      wx.onMenuShareAppMessage(shareOption);
      wx.onMenuShareQQ(shareOption);
      wx.onMenuShareQZone(shareOption);
      wx.onMenuShareWeibo(shareOption);
    });
  });
};
