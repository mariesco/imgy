import { ChangesApplieds, History } from "./History";
import { Images, ImageViewed } from "./Images";

interface ImagesState {
  // State
  images: Images;
  imageViewed: ImageViewed;
  history: History;
  changesOfHistoryClicked: ChangesApplieds | null;
  isLoadingImages: boolean;
}

interface ImagesStore extends ImagesState {
  //Store with Actions
  loadInitialImages(): Promise<Images>;
  addNewImage(images: Images): Images;
  setImageForView(idSelected: number): void;
  applyChangesToImage(changes: ChangesApplieds): ImageViewed;
}

export type { ImagesStore };
