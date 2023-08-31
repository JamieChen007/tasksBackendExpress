const express = require("express");
const cors = require("cors");
const tasksRouter = require("./taskRouter");

const app = express();

// app.all("*", function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE, OPTIONS"
//   );

//   if (req.method == "OPTIONS") {
//     res.send(200);
//     /让options请求快速返回/;
//   } else {
//     next();
//   }
// });

// app.all("/login", (request, response) => {
//   //允许跨域
//   response.setHeader("Access-Control-Allow-Origin", "*");
//   response.setHeader("Access-Control-Allow-Headers", "*");
//   response.send("Hello");
// });

app.use(cors());
app.use(express.json());
app.use("/", tasksRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
