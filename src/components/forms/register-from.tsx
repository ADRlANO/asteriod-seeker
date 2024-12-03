import bcrypt from "bcrypt";
import { createForm, getValue } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { isEmpty } from "lodash-es";
import { ControlledText } from "~/components/fields/controlled-text";
import { handleAsync, createUser } from "~/lib/db/utils";

import { Button } from "~/components/ui/button";
import { useLocalStorage } from "~/lib/store";

async function register(formValues: any) {
  "use server";

  const hashed_password = await bcrypt.hash(formValues.password, 10);
  const new_user = { ...formValues, password: hashed_password };

  return handleAsync(() => createUser(new_user));
}

const formInitialValues = { name: "", email: "", password: "" };

export default function RegisterForm() {
  const navigate = useNavigate();
  const [_user, set_user] = useLocalStorage("user");

  const [form, { Form, Field }] = createForm({
    initialValues: formInitialValues,
  });

  const shouldDisableRegister = () =>
    isEmpty(getValue(form, "email")) || isEmpty(getValue(form, "password"));

  return (
    <Form
      class="flex h-screen items-center justify-center flex-col gap-5 bg-slate-800 text-white"
      onSubmit={async (values) => {
        console.log("SUBMIT CREATE User", values);
        const [error, data] = await register(values);

        set_user(data);

        console.log("CREATE User ERROR :>> ", error);
        console.log("CREATE User SUCCESS :>> ", data);

        if (data) {
          return navigate(`/?token=${String(data.token)}`);
        }
      }}
    >
      <div class="grid gap-2">
        <Field name="name" type="string">
          {(field, props) => (
            <ControlledText
              label="Name"
              value={field.value}
              onInput={props.onInput}
            />
          )}
        </Field>
        <Field name="email" type="string">
          {(field, props) => (
            <ControlledText
              label="Email"
              value={field.value}
              onInput={props.onInput}
            />
          )}
        </Field>
        <Field name="password" type="string">
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
      <Button type="submit" disabled={shouldDisableRegister()} class="grid">
        Register
      </Button>
    </Form>
  );
}
