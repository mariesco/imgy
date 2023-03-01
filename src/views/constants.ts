import { PossibleChanges } from "@/entities/History";

export const URL_LIST_IMAGES = "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";

export const POSSIBLE_PROPS_FOR_CHANGE: PossibleChanges = [
  {
    name: 'flip',
    value: '',
    possibleValues: ['h','v','hv']
  },
  {
    name: 'orient',
    value: 0,
    min: 0,
    max: 8
  },
  {
    name: 'rot',
    value: 0,
    min: 0,
    max: 359
  },
  {
    name: 'bri',
    value: 0,
    min: -100,
    max: 0
  },
  {
    name: 'con',
    value: 0,
    min: -100,
    max: 100
  },
  {
    name: 'exp',
    value: 0,
    min: -100,
    max: 100
  }, 
  {
    name: 'gam',
    value: 0,
    min: -100,
    max: 100
  }, 
  {
    name: 'high',
    value: 0,
    min: -100,
    max: 0
  }
]
