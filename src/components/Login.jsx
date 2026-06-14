import { useState } from "react";
import axios from "axios";
function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
async function loginUser() {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/login",
      {
        email: email,
        password: password
      }
    );
localStorage.setItem(
  "token",
  response.data.token
);
localStorage.setItem(
  "role",
  response.data.role
);
setIsLoggedIn(true);

console.log("LOGIN SUCCESS");
console.log(response.data);

  } catch (error) {
  console.log("LOGIN FAILED");
console.log(error.response.data);
}
}
  return (
    <div>
      <h2>Login</h2>

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

      <button onClick={loginUser}>
  Login
</button>
    </div>
  );
}

export default Login;