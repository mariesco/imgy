import { PossibleChanges } from "@/entities/History"
import { ApplyChangesToImageInterface } from "@/entities/ImagesStore"
import { FC } from "react"
import { MainConfigItem } from "./MainConfigItem"

type MainConfigProps = {
  possibleChanges: PossibleChanges,
  applyChangesToImage: ApplyChangesToImageInterface;
}

export const MainConfig: FC<MainConfigProps> = ({ possibleChanges, applyChangesToImage }) => {
  return (
           <div className="grid grid-cols-2 gap-4 mb-4">
             {/*Aca puedo trabajar la config de las propiedades*/}
             {/*Agregar min max, y un title mejor no?*/}

             {possibleChanges.map(ch => {
               return (
                <MainConfigItem 
                  change={ch}
                  applyChangesToImage={applyChangesToImage}
                  />
               )
             })}
           </div>
  )
}
