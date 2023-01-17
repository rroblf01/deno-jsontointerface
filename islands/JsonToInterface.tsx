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
      <div class="w-full max-w-sm mx-auto">
        <textarea
          class="h-24 w-full border rounded-xl resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
          value={text}
          onChange={changeText}
        />
        <div class="flex justify-end">
          <button
            class="rounded-full py-1 px-2 text-white bg-black"
            onClick={() => {
              setInterface(jsonToInterface(JSON.parse(text)));
            }}
          >
            Transform
          </button>
        </div>
      </div>

      <div class="w-full max-w-sm mx-auto">
        <textarea
          class=" h-24 w-full border rounded-xl resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
          value={interfaceText}
        />
        <div class="flex justify-end">
        </div>
      </div>
    </div>
  );
}
