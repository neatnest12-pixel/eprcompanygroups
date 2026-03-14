import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

const emptyAuthState = {
  name: "",
  email: "",
  phone: "",
  password: ""
};

export function getEmptyAuthState() {
  return { ...emptyAuthState };
}

export default function LoginModal({
  open,
  mode,
  onModeChange,
  formState,
  setFormState,
  onSubmit,
  onClose,
  error
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "login" ? "Welcome back" : "Create your account"}
    >
      <div className="mb-6 flex gap-2 rounded-lg bg-slate-100 p-1">
        <button
          type="button"
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${
            mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500"
          }`}
          onClick={() => onModeChange("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${
            mode === "register" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500"
          }`}
          onClick={() => onModeChange("register")}
        >
          Signup
        </button>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {mode === "register" ? (
          <Input
            placeholder="Full name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            required
          />
        ) : null}
        <Input
          type="email"
          placeholder="Email address"
          value={formState.email}
          onChange={(event) =>
            setFormState((current) => ({ ...current, email: event.target.value }))
          }
          required
        />
        {mode === "register" ? (
          <Input
            placeholder="Phone number"
            value={formState.phone}
            onChange={(event) =>
              setFormState((current) => ({ ...current, phone: event.target.value }))
            }
            required
          />
        ) : null}
        <Input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(event) =>
            setFormState((current) => ({ ...current, password: event.target.value }))
          }
          required
        />
        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full">
          {mode === "login" ? "Login" : "Create account"}
        </Button>
      </form>
    </Modal>
  );
}
