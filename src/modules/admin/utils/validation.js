const validatePhoneNumber = (number) => {
  // console.log("PhoneNumber", number);
  const phoneNumPattern = new RegExp(
    /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
  );
  return phoneNumPattern.test(number);
};


const validateEmail = (email) => {
  const emailPattern = new RegExp(/^[a-z0-9.]+@[^\s@]+\.[^\s@]+$/);
  return emailPattern.test(email);
};

const validateTextInput = (data) => {
  return data.trim() !== "";
};

const validateNumInput = (data) => {
  return data !== "";
};

const validatePassword = (data) => {
  return data.trim() !== "" && data.trim().length >= length;
  // const PasswordPattern = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
  // );
  // return PasswordPattern.test(data);
};

const emptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

export {
  validatePhoneNumber,
  validateEmail,
  validateTextInput,
  validateNumInput,
  validatePassword,
  emptyObj,
};
