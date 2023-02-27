import { Images } from "@/entities/Images";
import { addImages } from "@/entities/ImagesModel";
import { ImagesStore } from "@/entities/ImagesStore";

type AddNewImageStore= Pick<ImagesStore, | "images">;

const AddNewImageUseCase = (store: AddNewImageStore) => {
  const addNewImage = (images: Images) => {
    return addImages(store.images, images)
  }

  return {
   addNewImage 
  }
};

export { AddNewImageUseCase };
