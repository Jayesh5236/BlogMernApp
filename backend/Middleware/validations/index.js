import { body, validationResult } from "express-validator";

function userRegistrationValidation() {
  return [
    body("username", "UserName Cant be empty").isLength({ min: 2 }),
    body("email", "Email is Invalid ").isEmail(),
    body("phone", "Phone Number Is Not Valid").isMobilePhone(),
    body("password", "password has to be strong")
      .notEmpty()
      .isLength({ min: 6 }),
  ];
}

function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ error: errors.array() });
}

export { userRegistrationValidation, errorMiddleware };
