const userController = require("../controller/user.controller");

module.exports = function (app) {
  app.get("/crm/api/v1/users/", userController.findAll);
  app.get("/crm/api/v1/users/:studentId", userController.findById);
  app.put("/crm/api/v1/users/:studentId", userController.update);
};
