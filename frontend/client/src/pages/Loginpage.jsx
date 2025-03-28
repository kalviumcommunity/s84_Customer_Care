import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login Page</h1>
      <p>Login functionality coming soon...</p>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}
