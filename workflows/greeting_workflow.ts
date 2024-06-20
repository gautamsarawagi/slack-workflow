// greeting_workflow.ts

import { DefineWorkflow, Schema,addUnhandledEventHandler } from "deno-slack-sdk/mod.ts";
import { DropDownValue1Function } from "../functions/greeting_function.ts";

const GreetingWorkflow = DefineWorkflow({
  callback_id: "greeting_workflow",
  title: "Send a greeting",
  description: "Send a greeting to channel",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity"],
  },
});

const inputForm1 = GreetingWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send a greeting",
    interactivity: GreetingWorkflow.inputs.interactivity,
    submit_label: "Move Further",
    fields: {
      elements: [
        {
          name: "recipient",
          title: "Recipient",
          type: Schema.slack.types.user_id,
        },
        {
          name: "channel",
          title: "Channel to send message to",
          type: Schema.slack.types.channel_id,
          default: GreetingWorkflow.inputs.channel,
        },
        {
          name: "message",
          title: "Message to recipient",
          type: Schema.types.string,
          long: true,
        },
        {
          name: "dropDownValue1",
          title: "Select a Value:",
          type: Schema.types.string,
          enum: ["value 1", "value 2", "value 3"],
        },
      ],
      required: ["recipient", "channel", "message", "dropDownValue1"],
    },
    addUnhandledEventHandler: (({body}) => {
      console.log("Hello this is happening")
    })
  },
);

const dropDownValue2Step = GreetingWorkflow.addStep(
  DropDownValue1Function,
  {
    interactivity: inputForm1.outputs.interactivity,
    dropDownValue1: inputForm1.outputs.fields.dropDownValue1,
  },
);

const inputForm2 = GreetingWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send a greeting",
    interactivity: dropDownValue2Step.outputs.interactivity, // Use interactivity from inputForm1
    submit_label: "Submit Form",
    fields: {
      elements: [
        {
          name: "dropDownValue2",
          title: "Select a Value 2:",
          type: Schema.types.string,
          enum: dropDownValue2Step.outputs.dropDownValue2,
        },
      ],
      required: ["dropDownValue2"],
    }
  },
);


export default GreetingWorkflow;