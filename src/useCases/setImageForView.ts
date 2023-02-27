import { selectOneImageAsMain } from "@/entities/ImagesModel";
import { ImagesStore } from "@/entities/ImagesStore";

type SetImageForViewStore = Pick<ImagesStore, "images">;

const SetImageForViewUseCase = (store: SetImageForViewStore) => {
  const setImageForView = (idSelected: number) => {
    return selectOneImageAsMain({
      images: store.images,
      idSelected
    })
  }

  return {
    setImageForView
  }
};

export { SetImageForViewUseCase };
