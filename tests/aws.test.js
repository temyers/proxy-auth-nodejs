const AWS = require('aws-sdk')
const proxy = require('proxy-agent')
const chai = require('chai')

const proxyUri = "http://proxy:3128";

describe("AWS SDK", function() {
  // this.timeout(7000)
  it("should support proxy configuration", async function() {
    AWS.config.update({
      httpOptions: {
        agent: new proxy(proxyUri),
        proxyUri: proxyUri,
        timeout: 1000
      }
    })
    var sts = new AWS.STS()
    var response = await sts.getCallerIdentity().promise()
    chai.expect(response.Account).not.to.be.undefined
    return Promise.resolve()
  })
})