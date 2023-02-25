import { MainConfigItem } from "./MainConfigItem"

export const MainConfig = () => {
  return (
           <div className="grid grid-cols-2 gap-4 mb-4">
             {/*Aca puedo trabajar la config de las propiedades*/}
               <MainConfigItem value={60} title="Rotation"/>
               <MainConfigItem value={'wa234eee'} title="Flip"/>
               <MainConfigItem value={'wa234i'} title="Flip"/>
               <MainConfigItem value={'wa234'} title="Flip"/>
               <MainConfigItem value={'wa234b'} title="Flip"/>
               <MainConfigItem value={60} title="Rotation"/>
               <MainConfigItem value={60} title="Rotation"/>
               <MainConfigItem value={10} title="Flip"/>
               <MainConfigItem value={60} title="Rotation"/>
               <MainConfigItem value={10} title="Flip"/>
               <MainConfigItem value={10} title="Flip"/>
               <MainConfigItem value={60} title="Rotation"/>
               <MainConfigItem value={10} title="Flip"/>
               <MainConfigItem value={60} title="Rotation"/>
               <MainConfigItem value={10} title="Flip"/>
           </div>
  )
}
