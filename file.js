const fs = require("fs");

fs.appendFile("welcome.txt", "hello world !", (err) => {
  if (err) throw err;
  fs.readFile("welcome.txt", (err, data) => {
    console.log(data.toString());
  });
});
