const AWS = require('aws-sdk')
const proxy = require('proxy-agent')
const chai = require('chai')


describe("AWS SDK", function() {
  it("should fail if proxy authentication is missing", async function() {
    const proxyUri = "http://proxy:3128";
    AWS.config.update({
      httpOptions: {
        agent: new proxy(proxyUri),
        proxyUri: proxyUri,
        timeout: 1000
      }
    })
    var sts = new AWS.STS()
    try{
      var response = await sts.getCallerIdentity().promise()
      Promise.reject()

    }catch(err){
      chai.expect(err.statusCode).to.equal(407)
      Promise.resolve()
    }
  })
  it("should succeed if BASIC proxy authentication is provided", async function() {
    const proxyUri = "http://proxy_user:mysecret@proxy:3128";
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