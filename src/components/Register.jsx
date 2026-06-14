import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  async function registerUser() {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
  name,
  email,
  password,
  role
}
      );

      console.log("REGISTER SUCCESS");
      console.log(response.data);

    } catch (error) {
      console.log("REGISTER FAILED");
      console.log(error.response.data);
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