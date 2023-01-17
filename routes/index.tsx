import { Head } from "$fresh/runtime.ts";
import JsonToInterface from "../islands/JsonToInterface.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Json to Interface</title>
      </Head>
      <main class="bg-[#C09F80] text-[#565656] min-h-screen font-sans">
        <JsonToInterface />
      </main>
    </>
  );
}
