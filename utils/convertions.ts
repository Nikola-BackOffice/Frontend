import { OptionsArray } from "@/types/Forms";


export function parseJsonToTypedObject(json: string): OptionsArray {
  const parsed = JSON.parse(json);

  // Ensure the parsed JSON is properly typed
  if (
    !Array.isArray(parsed) ||
    !parsed.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'label' in item &&
        'value' in item &&
        typeof item.label === 'string' &&
        typeof item.value === 'string'
    )
  ) {
    throw new Error('Invalid JSON format. Expected an array of { label: string; value: string }');
  }

  return parsed as OptionsArray;
}

// Example usage:
const jsonInput = `[
  {
    "value": "sebastián goza",
    "label": "Sebastián Goza"
  },
  {
    "value": "nicolás espinoza",
    "label": "Nicolás Espinoza"
  },
  {
    "value": "carlos taiba",
    "label": "Carlos Taiba"
  },
  {
    "value": "ignacio correa",
    "label": "Ignacio Correa"
  },
  {
    "value": "samuel clavel",
    "label": "Samuel Clavel"
  },
  {
    "value": "pedro popelka",
    "label": "Pedro Popelka"
  },
  {
    "value": "killian cooreman",
    "label": "Killian Cooreman"
  }
]`;

const ingenieroChoices = parseJsonToTypedObject(jsonInput);
console.log(ingenieroChoices);
