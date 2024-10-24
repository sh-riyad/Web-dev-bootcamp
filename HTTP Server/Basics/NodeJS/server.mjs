import { createServer } from 'node:http';
 
// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// readFileSync is a synchronous process
// import {readFileSync} from "node:fs"
// const server = createServer((request, response) => {
//   const fileContent = readFileSync("content.txt", 'utf8');

//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end(fileContent);
// });

// const instance = server.listen(0, "127.0.0.1", () => {
//   console.log("Listening on port", instance.address().port);
// });


// Asynchronous Way. Here readFile doesn't return anything
// import {readFile} from "node:fs"
// const server = createServer((request, response) => {
//   readFile("content.txt", 'utf8', (error, fileContent) => {
//     if (error) {
//       response.writeHead(500, { "Content-Type": "text/plane" });
//       response.end("Internal Server Error");
//       return;
//     }
//     response.writeHead(200, { "Content-Type": "text/plane" });
//     response.end(fileContent);
//   });
// });

// const instance = server.listen(3000, "127.0.0.1", () => {
//   console.log("Listening on port", instance.address().port);
// });



// Same thing using promises. this retrun promise object

// import { readFile } from "node:fs/promises"

// const server = createServer((request, response) => {
//   readFile("content.txt", "utf8").then((content) => {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end(content)
//   }).catch((error) => {
//     response.writeHead(500, { "Content-Type": "text.plain" });
//     response.end("error.message");
//   });
// });
// const instance = server.listen(0, "127.0.0.1", () => {
//   console.log("Listening on port", instance.address().port);
// });


// Using  async-await

import { readFile } from "node:fs/promises"
const server = createServer(async (request, response) => {
  try {
    const fileContent = await readFile("content.txt", "utf8");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(fileContent);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Internal Server Error");
  }
});

const instance = server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on port", instance.address().port);
});