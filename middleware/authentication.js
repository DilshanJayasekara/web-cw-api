function authenticate(req, res, next) {
    console.log("This is token  veryfication");
    next();
}
module.exports = authenticate;
