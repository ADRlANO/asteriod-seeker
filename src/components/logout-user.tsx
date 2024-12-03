import { Show } from "solid-js";
import { isEmpty } from "lodash-es";
import { useNavigate, useSearchParams } from "@solidjs/router";

import { Button } from "~/components/ui/button";
import { useLocalStorage } from "~/lib/store";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [user, set_user] = useLocalStorage("user");
  const [_search_params, set_search_params] = useSearchParams();

  function logout() {
    set_user(null);
    set_search_params({ token: null });
    navigate("/");
  }

  return (
    <Show when={!isEmpty(user())} fallback={null}>
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </Show>
  );
}
