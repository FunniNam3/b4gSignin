import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        await axios.post("/createUser", {
          email,
          password,
          firstName,
          lastName,
          gradYear: Number(gradYear),
        });
      }

      // sets HTTP-only cookie
      const res = await axios.post("/auth", {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.user);
        navigate("/dashboard");
      } else {
        setError(res.data.error);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {isSignup && (
          <>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              placeholder="Graduation Year"
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {isSignup ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
