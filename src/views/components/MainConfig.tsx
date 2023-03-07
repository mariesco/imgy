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
             {possibleChanges.map((ch, i) => {
               return (
                <MainConfigItem 
                  key={i}
                  change={ch}
                  applyChangesToImage={applyChangesToImage}
                  />
               )
             })}
           </div>
  )
}
