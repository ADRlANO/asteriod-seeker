import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main>
      <Title>Not Found. We're lost</Title>
      <HttpStatusCode code={404} />
    </main>
  );
}
