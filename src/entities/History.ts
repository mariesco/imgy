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

export type PossiblePropertiesForChange = Change[];
export type ChangesApplieds = Change[];

export type History = ImageViewed[];

type ParseChangesToObject<Query extends string> =
  Query extends `${infer Key}=${infer Value}&${infer Rest}` ?
    { [K in Key]: Value } & ParseChangesToObject<Rest> :
  Query extends `${infer Key}=${infer Value}` ?
    { [K in Key]: Value } :
  {};

// Ejemplo de uso FALTA PROBAR
const query: string = 'rotate=60&flip=30&orientation=vertical&color=red';
const finalObject = {} as ParseChangesToObject<typeof query>; // Expected: { rotate: "60", flip: "30", orientation: "vertical", color: "red" }
