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

interface ApplyHistoryChangesToImageInterface {
  (): {
    apply: (changes: ChangesApplieds) => void
  }
}


interface ResultOfApplyHistoryChangesToImageEvent{
    changesOfHistoryClicked: ChangesApplieds;
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
  // addNewImages(images: Images): Images; 
  // TODO: Integrate dispatcher with this useCase correctly
  addNewImages(): void;
  setImageForView: SetImageForViewInterface;
  applyChangesToImage: ApplyChangesToImageInterface;
  applyHistoryChangesToImage: ApplyHistoryChangesToImageInterface;
}

interface ImagesStore extends ImagesState, ImagesActions {}


type ResultOfDispatchers = ResultOfSetImageForViewEvent | ResultOfApplyChangesToImageEvent | ResultOfApplyChangesToImageEvent;

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
  ResultOfApplyChangesToImageEvent,

  ApplyHistoryChangesToImageInterface,
  ResultOfApplyHistoryChangesToImageEvent
};
