import { ChangesApplieds, History, PossibleChanges } from "./History";
import { Images, ImageViewed } from "./Images";

interface SetImageForViewInterface {
  (): {
    set: (idSelected: number) => void
  }
}

interface ResultOfSetImageForViewEvent {
    images: Images,
    imageViewed: ImageViewed;
}

interface ApplyChangesToImageInterface {
  (): {
    apply: (changes: ChangesApplieds) => void
  }
}

interface ResultOfApplyChangesToImageEvent {
    imageViewed: ImageViewed;
}

interface ImagesState {
  // State
  images: Images;
  history: History;
  imageViewed: ImageViewed;
  isLoadingImages: boolean;
  possibleChanges: PossibleChanges;
  changesOfHistoryClicked: ChangesApplieds | null;
}

interface ImagesActions {
  //Actions
  addNewImage(images: Images): Images;
  setImageForView: SetImageForViewInterface;
  applyChangesToImage: ApplyChangesToImageInterface;
}

interface ImagesStore extends ImagesState, ImagesActions {}


type ResultOfDispatchers = ResultOfSetImageForViewEvent | ResultOfApplyChangesToImageEvent;

type ImagesDispatcher = Record<keyof ImagesActions, ({
  result
  }: {
    result: ResultOfDispatchers 
  }) => void>;

interface ImagesStoreDestructured {
  store: ImagesState;
  dispatcher: ImagesDispatcher;
}

export type { 
  ImagesState, 
  ImagesActions, 
  ImagesDispatcher, 

  ImagesStore, 
  ImagesStoreDestructured, 


  SetImageForViewInterface,
  ResultOfSetImageForViewEvent,

  ApplyChangesToImageInterface,
  ResultOfApplyChangesToImageEvent
};
