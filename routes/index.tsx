import { Head } from "$fresh/runtime.ts";
import JsonToInterface from "../islands/JsonToInterface.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Json to Interface</title>
      </Head>
      <main class="bg-gray-500 min-h-screen font-sans">
        <JsonToInterface />
      </main>
    </>
  );
}
