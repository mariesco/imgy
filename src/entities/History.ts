import { ImageViewed } from "./Images";

export type ChangeTypeNum = {
  name: string;
  min: number;
  max: number;
  value: number;
}

export type ChangeTypeString = {
  name: string;
  value: string;
  possibleValues: string[];
}

export type Change = ChangeTypeNum | ChangeTypeString;

export type ChangesApplieds = Change[];
export type PossibleChange = Change & {title: string};
export type PossibleChanges = PossibleChange[];

export type History = ImageViewed[];

export type HistoryItem = History extends (infer U)[] ? U : never;

export type ParseChangesToObject<Query extends string> =
  Query extends `${infer Key}=${infer Value}&${infer Rest}` ?
    { [K in Key]: Value } & ParseChangesToObject<Rest> :
  Query extends `${infer Key}=${infer Value}` ?
    { [K in Key]: Value } :
  {};
