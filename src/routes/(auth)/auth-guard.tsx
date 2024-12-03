import jwt from "jsonwebtoken";
import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import {
  Show,
  onMount,
  ParentProps,
  createEffect,
  createResource,
} from "solid-js";

export default function Guard(props: ParentProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [is_token_valid] = createResource(() =>
    verifyToken(searchParams.token as string)
  );
  createEffect(() => {
    console.log("Is Token Valid? :>> ", is_token_valid());
    console.log("Path >>", location.pathname);
  });

  return (
    <Show
      when={is_token_valid()}
      fallback={<RedirectToLogin redirectURL={location.pathname} />}
    >
      {props.children}
    </Show>
  );
}

interface RedirectToLoginProps {
  redirectURL: string;
}

function RedirectToLogin(props: RedirectToLoginProps) {
  const navigate = useNavigate();
  onMount(() => {
    navigate(`/login?redirectURL=${props.redirectURL}`);
  });
  return <>Pagina protegida: Redirigiendo a /login...</>;
}

function verifyToken(token: string) {
  "use server";

  try {
    const verified_token = jwt.verify(token, process.env.JWT_SECRET);
    console.log("SUCCESS verified_token :>> ", verified_token);
    return true;
  } catch (err) {
    console.log("ERROR :>> ", err);
    return false;
  }
}
