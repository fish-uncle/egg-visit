const json = {
  404: function (error) {
    let errorJson = {
      code: 404, // 4xx client side error
      data: null,
      msg: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
      success: false,
    };
    if (error && error['404'] && error['404']['json']) {
      errorJson = error['404'].json
    }
    return errorJson
  },
  500: function (error) {
    let errorJson = {
      code: 500, // don't respond any error message in production env
      success: false,
      data: null,
      msg: '服务器发生错误，请检查服务器。',
    };
    if (error && error['500'] && error['500']['json']) {
      errorJson = error['500'].json
    }
    return errorJson
  }
};
module.exports = json;