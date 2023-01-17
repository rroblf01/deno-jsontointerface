export const example = {
  "id": 1,
  "goal": "Read books",
  "titles": ["The Hobbit", "The Lord of the Rings", "The Silmarillion"],
  "completed": false,
};

export const exampleString = `{
  "id": 1,
  "goal": "Read books",
  "titles": [ "The Hobbit", "The Lord of the Rings", "The Silmarillion" ],
  "completed": false
}`;

const handleArray = (value: any[], key: string) => {
  let interfaceString = "";
  const interfaceToLater = [];
  const typesToLate: string[] = [];
  const repeatedKeys: string[] = [];
  const typeOfArray = value.map((v) => typeof v);

  const simplestypes = ["string", "number", "boolean"];
  if (
    typeOfArray.every((v) => v === typeOfArray[0]) &&
    !Array.isArray(value[0]) && simplestypes.includes(typeOfArray[0])
  ) {
    interfaceString += `${typeof value[0]}[]`;
  } else {
    interfaceString += `Array<`;
    value.forEach((v) => {
      if (Array.isArray(v)) {
        const result = handleArray(v, key);

        typesToLate.push(result.interfaceString);
        interfaceToLater.push(...result.interfaceToLater);
      } else if (typeof v === "object") {
        let auxKey = key;
        while (repeatedKeys.includes(auxKey)) {
          auxKey += "_" + key;
        }
        typesToLate.push(`${auxKey}Class`);
        interfaceToLater.push({ key: auxKey, value: v });
        repeatedKeys.push(auxKey);
      } else {
        typesToLate.push(`${typeof v}`);
      }
    });
    interfaceString += typesToLate.filter((v, i) =>
      typesToLate.indexOf(v) === i
    ).join(" | ") + ">";
  }
  return { interfaceString, interfaceToLater };
};

export const jsonToInterface = (
  json: any = example,
  name: string = "Example",
) => {
  const interfaceToLater = [];

  let interfaceString = "";
  const simplestypes = ["string", "number", "boolean"];
  for (const key in json) {
    const value = json[key];
    if (Array.isArray(value)) {
      const result = handleArray(value, key);
      interfaceString += `\t${key}: ` + result.interfaceString +
        "\n";
      interfaceToLater.push(...result.interfaceToLater);
    } else if (simplestypes.includes(typeof value)) {
      interfaceString += `\t${key}: ${typeof value};\n`;
    } else if (typeof value === "object") {
      interfaceString += `\t${key}: ${key}Class;\n`;
      interfaceToLater.push({ key, value });
    }
  }
  interfaceString += "}";

  const repeat: string[] = interfaceToLater.filter((
    v,
    i,
  ) => (interfaceToLater.indexOf(v) === i)).map((
    v,
  ) => v.key);

  const keysRepeated: string[] = [];

  interfaceToLater.forEach(({ key, value }) => {
    interfaceString += "\n\n" +
      jsonToInterface(value, `${key}Class`);
  });

  return `interface ${name} {\n` + interfaceString;
};
