const http = require("http");
const options = new URL("http://checkip.amazonaws.com");

exports.lambdaHandler = async (event, context) => {
  const returnPromise = new Promise((resolve, reject) => {
    let req_body = "";

    const req = http.request(
      {
        hostname: "api.ipify.org",
        path: "/?format=json",
        method: "GET"
      },
      res => {
        console.log("Response:", res);

        res.on("data", data => {
          console.log("BODY:", data);
          req_body += data;
        });

        res.on("end", e => {
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              message: "hello world",
              location: req_body
            })
          });
        });
      }
    );

    req.on("error", e => {
      console.error(`problem with request: ${e.message}`);
    });

    req.end();
  });

  return await returnPromise;
};
