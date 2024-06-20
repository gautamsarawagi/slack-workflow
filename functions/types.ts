
import { DefineType, Schema } from "deno-slack-sdk/mod.ts";

export const ArrayOfNames = DefineType({
  name: "ArrayOfNames",
  type: Schema.types.array,
  items: {type: Schema.types.string }
});

export const TestType = DefineType({
  name: "TestType",
  type: Schema.types.object,
  properties: {
    deal_name: { type: Schema.types.string },
    partner_names: { type: ArrayOfNames }
}});
