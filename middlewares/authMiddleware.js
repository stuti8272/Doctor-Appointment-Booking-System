const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      
      JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({
            message: "Auth Failed",
            success: false,
          });
        } else {
          req.body.userId = decode.id;
          next();
        }
      });
    } else {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
