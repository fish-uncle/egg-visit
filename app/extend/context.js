'use strict';
module.exports = {
  json: {
    success: ({msg = '请求成功', data = '', obj, code = 200}) => {
      let result = {
        code: code,
        data: data,
        msg: msg,
        success: true
      };
      if (typeof obj === 'object') {
        result = Object.assign(result, obj)
      }
      return result;
    },
    error: ({msg = '请求失败', data = '', code = 500}) => {
      return {
        code: code,
        data: data,
        msg: msg,
        success: false
      }
    }
  },
};