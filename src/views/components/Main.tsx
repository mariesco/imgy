import { History } from "./History"
import { MainConfig } from "./MainConfig"
import { MainHead } from "./MainHead"
import { MainViewedImage } from "./MainViewedImage"

export const Main = () => {
   return (
      <div className="p-4 sm:ml-64 h-full">
        <div>
            <MainHead/>
            <MainViewedImage/>
            <MainConfig/>
           <div className="sm:hidden">
               <History/>
            </div>
        </div>
      </div>
   )
}
