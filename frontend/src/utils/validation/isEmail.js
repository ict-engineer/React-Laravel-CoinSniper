const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const isEmail = (email) => emailRegex.test(email);

export default isEmail;
