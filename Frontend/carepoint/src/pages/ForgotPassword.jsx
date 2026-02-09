import React, { useState } from "react";
import { forgotPassword } from "../services/api";
import { validatePassword } from "../utils/passwordValidator";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Email is required");
    return;
  }

  // frontend-only verification
  setStep(2);
};



  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      toast.error(error);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

   try {
  const response = await forgotPassword({
    email: email,
    newPassword: password
  });

  if (response.success) {
    toast.success(response.message || "Password reset successful");

    setStep(1);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } else {
    toast.error(response.message || "Reset failed");
  }
} catch (err) {
  toast.error(err.response?.data?.message || "Failed to reset password");
}


  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h4 className="text-center mb-3">Forgot Password</h4>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Verify Email
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePasswordReset}>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <small className="text-muted">
            Password must be 8–15 chars, include uppercase, lowercase,
            number, special (!@#$%), no spaces.
          </small>

          <button className="btn btn-success w-100 mt-3">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
