const { expect } = require("chai");
var chai = require("chai");
var got = require("got");
var proxy = require("proxy-agent");
const tunnel = require("tunnel");

describe("HTTP NodeJS connectivity", function () {
  it("should support proxy configuration", async function () {
    const proxyUri = "http://proxy:3128";

    const response = await got("https://www.google.com.au", {
      agent: {
        https: tunnel.httpsOverHttp({
          proxy: {
            host: "proxy",
            port: 3128
          },
        }),
      },
    });
    expect(response.statusCode).to.equal(200)
    return Promise.resolve("done");
  });
});
