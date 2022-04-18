# aliyun-dns-setter
Set aliyun dns

# install
```
npm i aliyun-dns-setter -S
```

# usage
```js
const { setDns } = require('aliyun-dns-setter')

const config = {
  "accessKey":"YOUR_ALIYUN_ACCESS_KEY",
  "secretKey":"YOUR_ALIYUN_SECRET_KEY",
  "ip":"10.0.0.0",
  "domain":"a.example.com"
}

setDns(config)
  .then(record => console.log(record))
```
or 
```js
const Core = require('@alicloud/pop-core');
const config = {
  "accessKey":"YOUR_ALIYUN_ACCESS_KEY",
  "secretKey":"YOUR_ALIYUN_SECRET_KEY",
}
const client = new Core({
  accessKeyId: config.accessKey,
  accessKeySecret: config.secretKey,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
})
setDns({
  client,
  "ip":"10.0.0.0",
  "domain":"a.example.com"
}).then(record => console.log(record))

```
