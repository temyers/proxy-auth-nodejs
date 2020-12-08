const { expect } = require("chai");
var chai = require("chai");
var got = require("got");
var proxy = require("proxy-agent");

describe("HTTP NodeJS connectivity", function () {
  it("should support authenticated proxy configuration", async function () {
    const proxyUri = "http://proxy_user:mysecret@proxy:3128";

    const response = await got("https://www.google.com.au", {
      agent: {
        https: new proxy(proxyUri, {
          keepAlive: true,
        }),
      },
    });
    expect(response.statusCode).to.equal(200);
    return Promise.resolve("done");
  });

  it("should fail if proxy authentication is not provided", async function () {
    const proxyUri = "http://proxy:3128";

    try {
      const response = await got("https://www.google.com.au", {
        agent: {
          https: new proxy(proxyUri, {
            keepAlive: true,
          }),
        },
      });
      return Proise.resolve();
    } catch (err) {
      expect(err.toString()).to.contain("407 (Proxy Authentication Required)");
      return Promise.resolve();
    }
  });
});
