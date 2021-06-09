const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replace-Template");

// =========================================================
// Files

// Blocking Synchrnous Way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about the code : ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("Written!");

// Asynchronous

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("file has been written");
//         if (err) console.log(err);
//       });
//     });
//   });
// });

// =======================================================================
// Server

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const productData = JSON.parse(data);

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(url.parse(req.url, true));

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(404, {
      "Content-type": "text/html",
    });

    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // product page
  } else if (pathname === "/product") {
    const product = productData[query.id];

    res.writeHead(404, {
      "Content-type": "text/html",
    });

    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(`<h1>this is the not found!</h1>
    <h2>this is the not found!</h2>
    <h3>this is the not found!</h3>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listnening to requests on port 8000");
});
