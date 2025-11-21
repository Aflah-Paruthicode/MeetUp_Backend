
const validator = require("validator");
const bcrypt = require("bcrypt");
const validateSignUpData = async (req) => {
  const { name, email, favMovie, password } = req.body;
  if (!name.trim()) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  } else if (favMovie.length < 1 || favMovie.length > 30) {
    throw new Error("Something went wrong with movie name");
  }
};

const validateEditProffile = (req) => {
  const allowedFields = [
    "name",
    "age",
    "favMovie",
    "gender",
    "place",
    "studying",
  ];
  const isEditAllowed = Object.keys(req.body).every((feild) =>
    allowedFields.includes(feild)
  );
  return isEditAllowed;
};

const validateCurrPassword = async (req) => {
  const password = req.user.password;
  const isPasswordMatch = await bcrypt.compare(req.body.currPassword, password);

  return isPasswordMatch;
};

const validNewPassword = async (req) => {
    const newPassword = req.body.newPassword;
    if(!validator.isStrongPassword(newPassword)) return false
    req.user.password = await bcrypt.hash(newPassword,10);
    return true;
}

module.exports = {
  validateSignUpData,
  validateEditProffile,
  validateCurrPassword,
  validNewPassword
};
