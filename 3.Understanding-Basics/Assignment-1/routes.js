const userList = ["Clark"];
const handleRequest = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "<h1 style='font-size:4rem'>Welcome to my server!</h1><p>This is a simple node.js server.</p>"
    );
    res.write("<h3 style='font-size:2rem'>Add new user to user lists</h3>");
    res.write(
      "\
    <form action='/create-user' method='POST'>\
    <input style='padding:1rem;' type='text' name='username'/>\
    <button style='padding:1rem;' type='submit'>Add a new user</button>\
    </form>"
    );
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const newUser = parsedBody.split("=")[1];
      userList.push(newUser);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      console.log(userList);
      return res.end();
    });
  }

  if (url === "/users") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Users Lists</h1>");
    res.write("<ul>");
    for (const user of userList) {
      res.write(`<li>${user}</li>`); // Dynamically generate the user list
    }
    res.write("</ul>");
    res.write('<a href="/">Go back</a>');
    return res.end();
  }

  //Handle 404 Not Found
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write("<h1>404 Not Found!</h1>");
  res.end();
};

module.exports = handleRequest;
