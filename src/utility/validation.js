const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = val =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
const minLengthValidator = (val, minLength) => val.length >= minLength;

const equalToValidator = (pw, cpw) => pw === cpw;

const notEmptyValidator = val => {
  // console.log('val passed: ', val.trim() !== '');
  return val.trim() !== '';
};

export default validate;
