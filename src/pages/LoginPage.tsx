import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { authApi } from "../api/auth";
import { SEO } from "../components/SEO";
import BrandLogo from "../components/BrandLogo";
import { Lock, User, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import "../styles/tokens.css";
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authApi.login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg-container">
      <SEO title="Login | AIRAT Pulse" description="Secure login to AIRAT Pulse admin portal." />
      
      <motion.div 
        className="lg-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg-header">
          <BrandLogo size={64} className="brand-logo--lg lg-logo" />
          <h1>Admin Access</h1>
          <p>Sign in to manage blog publications</p>
        </div>

        <form className="lg-form" onSubmit={handleLogin}>
          <div className="lg-field">
            <label htmlFor="username">Username</label>
            <div className="lg-input-wrap">
              <User size={20} />
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="lg-field">
            <label htmlFor="password">Password</label>
            <div className="lg-input-wrap">
              <Lock size={20} />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              className="lg-error"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}

          <button className="lg-submit" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="lg-spinner" />
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="lg-footer">
          <p>
            <ShieldCheck size={14} style={{ display: "inline", marginRight: "6px" }} />
            Secure Authentication active
          </p>
        </div>
      </motion.div>
    </div>
  );
}
