import { PossibleChanges } from "@/entities/History";

export const URL_LIST_IMAGES = "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";

export const POSSIBLE_PROPS_FOR_CHANGE: PossibleChanges = [
  {
    title: 'Flip axis',
    name: 'flip',
    value: '',
    possibleValues: ['','h','v','hv']
  },
  {
    title: 'Orientation',
    name: 'orient',
    value: 0,
    min: 0,
    max: 8
  },
  {
    title: 'Rotation',
    name: 'rot',
    value: 0,
    min: 0,
    max: 359
  },
  {
    title: 'Brightness',
    name: 'bri',
    value: 0,
    min: -100,
    max: 0
  },
  {
    title: 'Contrast',
    name: 'con',
    value: 0,
    min: -100,
    max: 100
  },
  {
    title: 'Exposure',
    name: 'exp',
    value: 0,
    min: -100,
    max: 100
  }, 
  {
    title: 'Gamma',
    name: 'gam',
    value: 0,
    min: -100,
    max: 100
  }, 
  {
    title: 'Highlight',
    name: 'high',
    value: 0,
    min: -100,
    max: 0
  }
]
