const Core = require('@alicloud/pop-core');
const assert = require('assert');

function getRequestName(isNew) {
  if (isNew) {
    return 'AddDomainRecord';
  }
  return 'UpdateDomainRecord';
}

module.exports = {
  setDns: async ({
    accessKey,
    secretKey,
    ip,
    domain,

    withOutput = false,
  }) => {
    const Client = new Core({
      accessKeyId: accessKey,
      accessKeySecret: secretKey,
      endpoint: 'https://alidns.aliyuncs.com',
      apiVersion: '2015-01-09'
    })

    const splitedDomain = domain.split('.')

    assert(splitedDomain.length >= 3, 'domain must be like ex.example.com')

    const mainDomain = splitedDomain.slice(splitedDomain.length - 2).join('.')
    const restDomain = splitedDomain.slice(0, splitedDomain.length - 2).join('.')

    const recordPages = await Client.request('DescribeDomainRecords', {
      DomainName: mainDomain,
      PageSize: 10,
      KeyWord: restDomain,
    }, {
      method: 'POST'
    })

    // TODO: multi-domain support
    const requestName = getRequestName(!recordPages.TotalCount)

    if (recordPages.TotalCount) {
      const record = recordPages.DomainRecords.Record[0]
      const {
        Value
      } = record
      if (Value === ip) {
        if (withOutput) console.log('IP is not changed')
        return null
      }
    }

    const res = await Client.request(requestName, {
      DomainName: mainDomain,
      RR: restDomain,
      Type: 'A',
      Value: ip,
      RecordId: recordPages.TotalCount ? recordPages.DomainRecords.Record[0].RecordId : undefined,
    }, {
      method: 'POST'
    })

    return res

  }
}