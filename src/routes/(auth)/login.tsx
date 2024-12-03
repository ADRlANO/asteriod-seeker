import { clientOnly } from "@solidjs/start";

const LoginForm = clientOnly(() => import("~/components/forms/login-form"));

export default function LoginUI() {
  return <LoginForm />;
}
