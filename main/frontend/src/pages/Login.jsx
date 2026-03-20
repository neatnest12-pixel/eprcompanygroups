import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const { isAdmin, isReady, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReady) {
    return null;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/admin");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-shell section-shell">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="Admin Login"
          title="Sign in to manage ERP Group Company listings."
          description="Use the admin credentials configured in your backend environment variables."
        />

        <div className="glass-panel mt-10 rounded-xl p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
