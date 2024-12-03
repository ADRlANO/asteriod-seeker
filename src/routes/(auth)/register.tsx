import { clientOnly } from "@solidjs/start";

const RegisterForm = clientOnly(
  () => import("~/components/forms/register-from")
);

export default function RegisterUI() {
  return <RegisterForm />;
}
