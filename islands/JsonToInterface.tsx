import { useState } from "preact/hooks";
import { example, exampleString, jsonToInterface } from "../utils.ts";
export default function JsonToInterface() {
  const interfaceExample = jsonToInterface(example);
  const [interfaceText, setInterface] = useState(interfaceExample);
  const [text, setText] = useState(exampleString);

  const changeText = (e) => {
    setText(e.target.value);
  };

  return (
    <div class="flex sm:justify-center items-center flex-col sm:flex-row sm:items-baseline sm:space-x-4 py-4">
      <div class="w-full h-full mx-auto p-7">
        <p class="text-3xl">JSON</p>
        <textarea
          class="bg-[#D7CEC7] my-auto h-96 w-full border rounded-xl resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none p-2 transition duration-300"
          value={text}
          onChange={changeText}
        />
        <div class="flex justify-end">
          <button
            class="rounded-full py-1 px-2 bg-[#D5D5D5]"
            onClick={() => {
              try {
                setInterface(jsonToInterface(JSON.parse(text)));
              } catch (e) {
                console.log(e);
                setInterface("Invalid JSON");
              }
            }}
          >
            Transform
          </button>
        </div>
      </div>

      <div class="w-full h-full mx-auto p-7">
        <p class="text-3xl">Interface</p>
        <textarea
          class="bg-[#D7CEC7] my-auto h-96 w-full border rounded-xl resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none p-2 transition ease-in-out duration-300"
          value={interfaceText}
        />
        <div class="flex justify-end">
        </div>
      </div>
    </div>
  );
}
