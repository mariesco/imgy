import { ImagesStore } from "@/entities/ImagesStore";

type GetImagesStore = Pick<ImagesStore, "loadInitialImages">;

const getImagesUseCase = (store: GetImagesStore) => {
  store.loadInitialImages();
};

export { getImagesUseCase };
