import { registerEnumType } from "type-graphql";

export enum DIRECTION {
  ASC,
  DESC
}

registerEnumType(DIRECTION, {
  name: "DIRECTION"
});
