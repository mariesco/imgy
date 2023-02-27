import { ChangesApplieds } from "./History";

export type Image = {
  id: number;
  url: string;
  name: string;
  selected: boolean;
}

export type ImageViewed = {
  image: Image,
  changes: ChangesApplieds
}

export type Images = Image[];
