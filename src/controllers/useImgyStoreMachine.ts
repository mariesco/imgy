import { assign, createMachine } from 'xstate';

import { ChangesApplieds } from '@/entities/History';
import { Images, ImageViewed } from '@/entities/Images';
import { ImagesState } from '@/entities/ImagesStore';

import { SSRDataProps } from './useImgyStoreProvider';

type ImgyContext = ImagesState;

type ImgyEvent = {
   type: 'INIT_DATA_READY'; 
   ssrData: SSRDataProps;
} | { 
   type: 'GENERATED_URL';
   imageViewed: ImageViewed;
} | { 
   type: 'APPLY_CHANGES_TO_IMG';
   changes: ChangesApplieds;
} | { 
   type: 'NEW_IMG';
   newImages: Images;
}


type ImgyTypestate = {
   value: 'init';
   context: ImgyContext & {
      images: [],
      imageViewed: {},
      isLoadingImages: true,
      history: [],
      changesOfHistoryClicked: null,
      possibleChanges: []
   }
} | {
   value: 'newUrl';
   context: ImgyContext;
} | {
   value: 'success';
   context: ImgyContext & {
      isLoadingImages: false
   };
} | {
   value: 'addingPropertiesToImage';
   context: ImgyContext;
} | {
   value: 'addNewImage';
   context: ImgyContext;
}

export const ImgyStoreMachine = createMachine<ImgyContext, ImgyEvent, ImgyTypestate>({
  schema: {
    context: {} as ImgyContext,
    events: {} as ImgyEvent
  },
  initial: 'init',
  context: {
    images: [],
    imageViewed: {
         image: {
            id: 0,
            name: '',
            url: '',
            selected:true
         },
         changes: []
      },
    isLoadingImages: true,
    history: [],
    changesOfHistoryClicked: null,
    possibleChanges: []
  },
  states: {
   init: {
      on:{
         INIT_DATA_READY: {
               actions: 'loadInitialData',
               target: 'success'
         }
      }
   },
   newUrl: {
      on: {
         GENERATED_URL: {
               actions: 'loadNewUrlForImageViewed',
               target: 'success'
         }
      }
   },
   success: {
         entry: 'isNotLoading'
   },
   addingPropertiesToImage: {},
   addNewImage: {}
  }
},{
      actions: {
         loadInitialData:assign((context, event) => {
         if(event.type !== 'INIT_DATA_READY') return {}
         const {images, possibleChanges } = event.ssrData;
         return {
               images: images,
               imageViewed: {
                  image: images[0],
                  changes: []
               },
               possibleChanges,
         }
      }),
         isNotLoading:assign((context, event) => {
         return {
               isLoadingImages: false
         }
      }),
         loadNewUrlForImageViewed:assign((context, event) => {
            //Continuar
         return {
               isLoadingImages: false
         }
      }),
    }
});
