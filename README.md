# aliyun-dns-setter
set aliyun dns

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
