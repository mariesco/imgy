import { ChangesApplieds, History, PossibleChanges } from "./History";
import { Images, ImageViewed } from "./Images";

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
  setImageForView(idSelected: number): void;
  applyChangesToImage(changes: ChangesApplieds): ImageViewed;
}

interface ImagesStore extends ImagesState, ImagesActions {}

type ImagesDispatcher = Record<keyof ImagesActions, () => void>;

interface ImagesStoreDestructured {
  store: ImagesState;
  dispatcher: ImagesDispatcher;
}

export type { ImagesState, ImagesActions, ImagesDispatcher, ImagesStore, ImagesStoreDestructured };
