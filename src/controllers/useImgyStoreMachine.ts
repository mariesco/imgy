import { assign, createMachine } from 'xstate';

import { ImageViewed } from '@/entities/Images';
import { ImagesState, ResultOfApplyChangesToImageEvent,ResultOfApplyHistoryChangesToImageEvent , ResultOfSetImageForViewEvent } from '@/entities/ImagesStore';

import { SSRDataProps } from './useImgyStoreProvider';

type ImgyContext = ImagesState;

type ImgyEvent = {
   type: 'INIT_DATA_READY'; 
   ssrData: SSRDataProps;
} | { 
   type: 'GENERATED_URL';
   imageViewed: ImageViewed;
} | { 
   type: 'ADD_IMAGES';
} | { 
   type: 'APPLY_CHANGES_TO_IMG';
   finalImage: ResultOfApplyChangesToImageEvent;
} | { 
   type: 'APPLY_HISTORY_CHANGES_TO_IMG';
   historyChanges: ResultOfApplyHistoryChangesToImageEvent;
} | { 
   type: 'SELECT_IMG';
   selection: ResultOfSetImageForViewEvent;
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
  predictableActionArguments: true,
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
         entry: 'isNotLoading',
         on: {
            SELECT_IMG: {
               actions: 'loadNewUrlForImageViewed',
               target: 'success'
            },
            APPLY_HISTORY_CHANGES_TO_IMG: {
               actions: 'applyHistoryChangesToImageViewed',
               target: 'success'
            },
            APPLY_CHANGES_TO_IMG: {
               actions: 'applyChangesToImageViewed',
               target: 'success'
            },
            ADD_IMAGES: {
               target: 'init'
            }
         }
   },
   addingPropertiesToImage: {},
   addNewImage: {}
  }
},{
      actions: {
         loadInitialData:assign((_, event) => {
         if(event.type !== 'INIT_DATA_READY') return {}
         const {images, possibleChanges } = event.ssrData;
         return {
               images: images,
               imageViewed: {
                  image: {
                     id: images[0].id,
                     name: images[0].name,
                     url: `${images[0].url}?`,
                     selected: true 
                  },
                  changes: []
               },
               possibleChanges,
         }
      }),
         loadNewUrlForImageViewed:assign((_, event) => {
         if(event.type !== 'SELECT_IMG') return {}
         const {images, imageViewed} = event.selection;
         return {
               images,
               imageViewed,
               isLoadingImages: true 
         }
      }),
         applyChangesToImageViewed:assign((context, event) => {
         if(event.type !== 'APPLY_CHANGES_TO_IMG') return {}
         const { imageViewed } = event.finalImage;
         return {
               imageViewed,
               changesOfHistoryClicked: null,
               history: [imageViewed, ...context.history],
               isLoadingImages: true 
         }
      }),
         applyHistoryChangesToImageViewed:assign((context, event) => {
         if(event.type !== 'APPLY_HISTORY_CHANGES_TO_IMG') return {}
         const { changesOfHistoryClicked } = event.historyChanges;
         return {
               changesOfHistoryClicked,
               isLoadingImages: true 
         }
      }),
         isNotLoading:assign((__, _) => {
         return {
               isLoadingImages: false
         }
      }),
    }
});
