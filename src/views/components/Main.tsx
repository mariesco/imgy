import useImgyStoreImplementation from "@/controllers/useImgyStoreImplementation"
import { SSRDataProps } from "@/controllers/useImgyStoreProvider"
import { useImgyViewModel } from "@/controllers/useImgyViewModel"
import { History } from "./History"
import { HistorySidebar } from "./HistorySidebar"
import { MainConfig } from "./MainConfig"
import { MainHead } from "./MainHead"
import { MainViewedImage } from "./MainViewedImage"

export const Main = ({ssrData}: {ssrData: SSRDataProps}) => {

  const {store, dispatcher} = useImgyStoreImplementation({ssrData});

   const {
     images,
     imageViewed,
     isLoadingImages,
     history,
     changesOfHistoryClicked,
     possibleChanges,
     addNewImage,
     setImageForView,
     applyChangesToImage
   } = useImgyViewModel({store, dispatcher});

   return (
      <>
         <HistorySidebar/>
         <div className="p-4 sm:ml-64 h-full">
            <div>
                <MainHead images={images} setImageForView={setImageForView}/>
                <MainViewedImage isLoadingImages={isLoadingImages}  imageViewed={imageViewed}/>
                <MainConfig possibleChanges={possibleChanges} applyChangesToImage={applyChangesToImage} />
               <div className="sm:hidden">
                   <History/>
                </div>
            </div>
         </div>
      </>
   )
}
