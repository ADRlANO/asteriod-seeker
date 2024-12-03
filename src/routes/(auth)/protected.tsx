import Guard from "./auth-guard";

export default function Protected() {
  return <Guard>This is a protected page</Guard>;
}
