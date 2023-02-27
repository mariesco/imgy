import { selectOneImageAsMain } from "@/entities/ImagesModel";
import { ImagesStore } from "@/entities/ImagesStore";

type SetImageForViewStore = Pick<ImagesStore, "setImageForView" | "images">;

const SetImageForViewUseCase = (store: SetImageForViewStore, idSelected: number) => {
  const setImageForView = () => {
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
