import React from "react";

const LoginPage = () => {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Login</h2>

      <form>
        <div>
          <input type="email" placeholder="Enter email" />
        </div>

        <br />

        <div>
          <input type="password" placeholder="Enter password" />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
