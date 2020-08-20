# egg-visit

![version](https://img.shields.io/badge/version-v1.0.2-brightgreen.svg?style=flat-square) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

### 支持
> app.js 使用 class 形式 
> 所以你需要更新你的 egg 版本 2.14.2 以上

### 快速开始

```
npm install egg-visit --save
```

### API
```
// 默认配置
visit:{
  proxy: {
    enabled: false,
    timeout: 3000,
    list: [],
  },
  router:{ 
    dir: path.join(this.app.baseDir, 'app/router'),
    enabled: true,
  },
  access: {
    enabled: true,
    ignore: []
  },
  gzip: {
    enabled: true,
    threshold: 1024
  },
  error: {
    enabled: true,
  }
}
```
```
exports.visit = {
  enable: true,
  package: 'egg-visit'
};
```

### 提供的方法
#### app
* app.uuid()
* app.encrypt('xxx') // config.keys 数组的第一个或字符串 为加密 key
* app.decrypt('xxx')
#### ctx
* ctx.json.success
```javascript
ctx.json.success({
  msg:'', // 默认 '请求成功'
  code:200, // 默认 200
  data:'', // 默认 ''
  obj:{total:1}, // 默认 {}
}) 
// return 
{
  msg:'',
  data:'',
  total:1,
  code:200,
  success: true
}
```

* ctx.json.error
```javascript
ctx.json.error({
  msg:'', // 默认 '请求失败'
  data:'', // 默认 ''
  code:200, // 默认 200
}) 
// return 
{
  msg:'',
  data:'',
  code:200,
  success: false
}
```
#### request
* acceptJson // 判断是否为json
```
ctx.request.acceptJson // true/false
```
#### router
app/router 文件夹下的 router 配置自动读取
```javascript
//app/router/x.js

module.exports = app => {
  const {router, controller} = app;
  const {testController} = controller;
  router.post(`/test`, testController.test);
};
```
#### mock
app/mock 文件夹下的 mock 自动生成 mock API
```javascript
//app/mock/get/user.js

const Mock = require('mockjs');
module.exports = Mock.mock({
  'success': true,
  'code': 200,
  'data': {
    id: '@id',
    title: '@cparagraph(2)',
    sub_title: '@cparagraph(3)',
    label: '@ctitle(2,4)',
    link_url: '@cparagraph(2)',
    banner_url: '@image(720x480,@color)',
    update_time: '@datetime',
    content: '@cparagraph(30)'
  }
});

// 生成的 API 为 GET /user 
// 支持多级目录 app/mock/get/user/detail.js --> GET /user/detail 
// 支持GET、POST、PUT、DELETE
```
#### proxy
```
proxy: {
  enabled: false,
  timeout: 3000,
  list: [
    {
      from '/api',
      target: 'http://127.0.0.1:8080'
    }
  ],
},
```
