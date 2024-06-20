// greeting_function.ts

import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const DropDownValue1Function = DefineFunction({
  callback_id: "drop_down_value_1_function",
  title: "Process DropDownValue1 Selection",
  description: "Process selection of dropDownValue1 and update dropDownValue2 options",
  source_file: "functions/greeting_function.ts",
  event: "on_change",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      dropDownValue1: {
        type: Schema.types.string,
        description: "The value selected from dropDownValue1",
      },
    },
    required: ["dropDownValue1", "interactivity"],
  },
  output_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      dropDownValue2: {
        type: Schema.types.array,
        items: {
          type: Schema.types.string,
        },
        description: "The options for dropDownValue2",
      },
    },
    required: ["interactivity", "dropDownValue2"],
  },
});

export default SlackFunction(
  DropDownValue1Function,
  async ({ inputs }) => {
    const { dropDownValue1, interactivity } = inputs;

    let secondDropdownOptions: string[] = [];

    switch (dropDownValue1) {
      case "value 1":
        secondDropdownOptions = ["value1_option1", "value1_option2"];
        break;
      case "value 2":
        secondDropdownOptions = ["value2_option1", "value2_option2"];
        break;
      case "value 3":
        secondDropdownOptions = ["value3_option1", "value3_option2"];
        break;
      default:
        secondDropdownOptions = ["default 1", "default 2", "default 3"];
        break;
    }

    console.log(secondDropdownOptions);

    return { outputs: { dropDownValue2: secondDropdownOptions, interactivity } };
  },
);
