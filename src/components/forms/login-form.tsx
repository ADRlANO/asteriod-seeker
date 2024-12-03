import { isEmpty } from "lodash-es";
import { useNavigate } from "@solidjs/router";
import { createForm, getValue, required } from "@modular-forms/solid";

import { Button } from "~/components/ui/button";
import { ControlledText } from "~/components/fields/controlled-text";
import { loginUser } from "~/lib/db/utils";
import { useLocalStorage } from "~/lib/store";

const formInitialValues = { email: "", password: "" };

async function login(credentials: typeof formInitialValues) {
  "use server";

  return loginUser(credentials);
}

export default function LoginForm() {
  const [_user, set_user] = useLocalStorage("user");
  const navigate = useNavigate();
  const [form, { Form, Field }] = createForm({
    initialValues: formInitialValues,
  });

  const shouldDisableSubmit = () =>
    isEmpty(getValue(form, "email")) || isEmpty(getValue(form, "password"));

  return (
    <Form
      class="flex h-screen items-center justify-center flex-col gap-5 bg-slate-800 text-white"
      onSubmit={async (values) => {
        console.log("SUBMIT LOGIN User", values);
        const [error, data] = await login(values);

        console.log("LOGIN User ERROR :>> ", error);
        console.log("LOGIN User SUCCESS :>> ", data);

        set_user(data);

        if (data) {
          return navigate(`/?token=${String(data.token)}`);
        }
      }}
    >
      <div class="grid gap-2">
        <Field
          name="email"
          type="string"
          validate={[required("Email is required")]}
        >
          {(field, props) => (
            <ControlledText
              label="Email"
              value={field.value}
              onInput={props.onInput}
              error={field.error}
            />
          )}
        </Field>
        <Field
          name="password"
          type="string"
          validate={[required("Password is required")]}
        >
          {(field, props) => (
            <ControlledText
              label="Password"
              type="password"
              value={field.value}
              onInput={props.onInput}
            />
          )}
        </Field>
      </div>
      <div class="flex gap-3">
        <Button type="submit" disabled={shouldDisableSubmit()} class="grid">
          Login
        </Button>
        <Button variant="ghost" onClick={() => navigate("/register")}>
          Create Account
        </Button>
      </div>
    </Form>
  );
}
