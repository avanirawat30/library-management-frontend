import { useState } from "react";
import axios from "axios";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  async function registerUser() {
    try {
      await axios.post(
        "https://library-management-backend-8k7b.onrender.com/users/register",
        {
  name,
  email,
  password,
  role
}
      );

     setMessage("✅ Registration successful. Please login.");

setName("");
setEmail("");
setPassword("");
setRole("student");

    } catch (error) {
      setMessage("❌ Registration failed.");
    }
  }

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {message && (
  <p>{message}</p>
)}
      <button onClick={registerUser}>
        Register
      </button>
      <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>
    </div>
  );
}

export default Register;