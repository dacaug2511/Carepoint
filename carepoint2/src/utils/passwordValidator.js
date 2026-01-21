export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,15}$/;

export const validatePassword = (password) => {
  if (!PASSWORD_REGEX.test(password)) {
    return `
Password must:
• Be 8–15 characters
• Have 1 uppercase
• Have 1 lowercase
• Have 1 number
• Have 1 special character (! @ # $ %)
• Have NO spaces
`;
  }
  return null;
};
