import { clientOnly } from "@solidjs/start";
import { Meteors } from "~/components/ui/effects/meteors";

const LogoutButton = clientOnly(() => import("~/routes/(auth)/logout"));
const AsteroidPanel = clientOnly(() => import("~/components/panel/asteroids"));

export default function Home() {
  return (
    <div class="min-h-screen bg-gray-100">
      <Meteors number={75} />
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex justify-between px-4 py-6 sm:px-0">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">
            Near Earth Asteroids Tracker
          </h1>
          <LogoutButton />
        </div>
        <AsteroidPanel />
      </div>
    </div>
  );
}
