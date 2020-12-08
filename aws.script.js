const AWS = require('aws-sdk')
const proxy = require('proxy-agent')
const chai = require('chai')
const proxyUri = "http://proxy:3128";

// describe("AWS SDK", function() {
  // this.timeout(7000)
  // it("should support proxy configuration", async function() {
    AWS.config.update({
      httpOptions: {
        agent: new proxy(proxyUri),
        proxyUri: proxyUri
      }
    })
    var sts = new AWS.STS({
      // httpOptions: {
      //   agent: new proxy(proxyUri),
      //   proxyUri: proxyUri,
      //   timeout: 2000
      // }
    })
    sts.getCallerIdentity().promise().then(response => {
      console.log(response)
      chai.expect(response.Account).not.to.be.undefined
      // done()
  
      return Promise.resolve()
    }).catch(err => {
      console.error(err)
    })
  // })
// })