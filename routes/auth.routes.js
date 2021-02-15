const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/auth.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      authJwt.verifyToken,
      authJwt.isAdmin
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
