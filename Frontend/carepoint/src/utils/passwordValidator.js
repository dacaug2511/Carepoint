export const validatePassword = (password) => {
  if (!password) return "Password required";
  if (password.length < 8 || password.length > 15)
    return "Password must be 8–15 characters";
  if (/\s/.test(password))
    return "No spaces allowed in password";
  if (!/[A-Z]/.test(password))
    return "At least one uppercase letter required";
  if (!/[a-z]/.test(password))
    return "At least one lowercase letter required";
  if (!/[0-9]/.test(password))
    return "At least one number required";
  if (!/[!@#$%]/.test(password))
    return "One special character (!@#$%) required";

  return null;
};
