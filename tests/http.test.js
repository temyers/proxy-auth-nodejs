const { expect } = require("chai");
var chai = require("chai");
var got = require("got");
var proxy = require("proxy-agent");

describe("HTTP NodeJS connectivity", function () {

  it("should support authenticated proxy configuration - user contains @", async function () {
    const proxyUri = "http://proxy@user:mysecret@proxy:3128";

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

  it("should support authenticated proxy configuration using auth property", async function () {
    const proxyUri = "http://proxy:3128";

    const response = await got("https://www.google.com.au", {
      agent: {
        https: new proxy({
          keepAlive: true,
          auth: "proxy@user:mysecret",
          host: "proxy",
          port: 3128,
          protocol: "http",
        }),
      },
    });
    expect(response.statusCode).to.equal(200);
    return Promise.resolve("done");
  });

  it("should support authenticated proxy configuration using auth property", async function () {
    const proxyUri = "http://proxy:3128";

    const response = await got("https://www.google.com.au", {
      agent: {
        https: new proxy({
          keepAlive: true,
          auth: "proxy_user:mysecret",
          host: "proxy",
          port: 3128,
          protocol: "http",
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
          https: new proxy({
            keepAlive: true,
            host: "proxy",
            port: 3128,
            protocol: "http",
          }),
        },
      });
      return Proise.resolve();
    } catch (err) {
      expect(err.toString()).to.contain("407 (Proxy Authentication Required)");
      return Promise.resolve();
    }
  });

  const failedAuthExamples = [
    ["proxy_user", "wrong_password", "incorrect password"],
    ["incorrect_user", "wrong_password", "incorrect user"],
  ];

  failedAuthExamples.forEach((example) => {
    const username = example[0];
    const password = example[1];
    const description = example[2];
    it(`should fail if authentication is incorrect - ${description}`, async function () {
      const proxyUri = `http://${username}:${password}@proxy:3128`;

      try {
        const response = await got("https://www.google.com.au", {
          agent: {
            https: new proxy({
              host: "proxy",
              port: 3128,
              protocol: "http",
              keepAlive: true,
            }),
          },
        });
        return Proise.resolve();
      } catch (err) {
        expect(err.toString()).to.contain(
          "407 (Proxy Authentication Required)"
        );
        return Promise.resolve();
      }
    });
  });
});
