const { signIn, signUp } = require("../controller/student.controller");

module.exports = function (app) {
  app.post("/api/v1/auth/signup", signUp);
  app.post("/api/v1/auth/signin", signIn);
};
