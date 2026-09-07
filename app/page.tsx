"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [environment, setEnvironment] = useState("");

  const router = useRouter();

 const handleSubmit = (e: any) => {
  e.preventDefault();

  console.log({
    email: e.target.email.value,
    password: e.target.password.value,
    environment,
  });

  router.push("/map");
};

  return (
    <main className="login-page">

      {/* Background Decorations */}
      <div className="bg-circle bg-circle-one"></div>
      <div className="bg-circle bg-circle-two"></div>
      <div className="bg-wave"></div>

      {/* Header */}
      <header className="login-header">
        <div className="brand">
          <div className="brand-logo">
            <span>◆</span>
          </div>

          <div>
            <h2>Enviro</h2>
            <h2>Insights</h2>
          </div>
        </div>

        <div className="header-right">
          <span className="help-icon">?</span>
          <span>Help Center</span>
        </div>
      </header>

      <section className="login-container">

        {/* LEFT SIDE */}
        <div className="login-intro">

          <p className="small-heading">
            ENVIRONMENT MONITORING
          </p>

          <h1>
            A Cleaner
            <span>Tomorrow</span>
          </h1>

          <p className="intro-text">
            Monitor. Manage. Sustain.
          </p>

          <div className="intro-line"></div>

          <p className="intro-description">
            Smarter insights for a cleaner
            <br />
            and healthier planet.
          </p>

          {/* Small floating cards */}
          <div className="floating-card card-one">
            <div className="mini-icon">◉</div>
            <div>
              <span>Air Quality</span>
              <strong>Good</strong>
            </div>
          </div>

          <div className="floating-card card-two">
            <div className="mini-icon">💧</div>
            <div>
              <span>Water Quality</span>
              <strong>Excellent</strong>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-card">

          <div className="login-title">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to Enviro Insights</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">
                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="forgot-password">
              <a href="#">
                Forgot password?
              </a>
            </div>

            {/* Environment */}
            {/* <div className="form-group">
              <label htmlFor="environment">
                Environment
              </label>

              <div className="input-wrapper">
                <span className="input-icon">
                  ◉
                </span>

                <select
                  id="environment"
                  value={environment}
                  onChange={(e) =>
                    setEnvironment(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select Environment
                  </option>

                  <option value="air">
                    Air
                  </option>

                  <option value="water">
                    Water
                  </option>

                  <option value="waste">
                    Waste
                  </option>

                  <option value="land">
                    Land
                  </option>
                </select>
              </div>
            </div> */}

            {/* Remember */}
            <div className="remember-row">
              <label className="remember">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="login-button"
            >
              <span>Login</span>
              <span className="arrow">→</span>
            </button>

          </form>

          {/* Divider */}
          {/* <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div> */}

          {/* SSO */}
          {/* <button className="sso-button">
            <span className="sso-icon">🔑</span>
            Continue with SSO
          </button> */}

          {/* Terms */}
          <p className="terms">
            By logging in, you agree to our{" "}
            <a href="#">Terms of Service</a>
            {" "}and{" "}
            <a href="#">Privacy Policy</a>.
          </p>

        </div>

      </section>

      {/* Footer */}
      <footer className="login-footer">
        <span>
          © 2026 Enviro Insights. All rights reserved.
        </span>

        <span>
          A Cleaner Tomorrow 🌱
        </span>
      </footer>

    </main>
  );
}