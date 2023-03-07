import { FC,  useEffect,  useState } from 'react';

import { Change, ChangesApplieds, ChangeTypeNum, PossibleChange } from '@/entities/History';
import { ApplyChangesToImageInterface } from '@/entities/ImagesStore';

type MainConfigItemProps = {
  change: PossibleChange;
  changesApplieds: ChangesApplieds;
  applyChangesToImage: ApplyChangesToImageInterface;
}


export const MainConfigItem: FC<MainConfigItemProps> = ({ change, changesApplieds, applyChangesToImage }) => {
   const [val, setVal] = useState(change.value)

   useEffect(() => {
      let exist = changesApplieds.filter((ch) => ch.name === change.name)
      if(exist[0]){
         setVal(exist[0].value)
      } else {
         setVal(change.value)
      }
   }, [changesApplieds])

   function isTypeNum(change: Change): change is ChangeTypeNum {
     return (change as ChangeTypeNum).min !== undefined && (change as ChangeTypeNum).max !== undefined && (change as ChangeTypeNum).value !== undefined;
   }
 
   return (
      <div className="pt-4">
         {isTypeNum(change) ?
            <>
               <label htmlFor="default-range" className="block mb-4 text-md font-medium text-white">{change.title}</label>
               <input 
                  id="default-range" 
                  type="range" 
                  value={val} 
                  min={change.min}
                  max={change.max}
                  onClick={e => applyChangesToImage().apply([{name: change.name, value: parseFloat((e.target as HTMLInputElement).value)} as Change])} 
                  onChange={e => setVal(parseFloat(e.target.value))} 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
            </>
         :
            <>
               <label htmlFor="options-props" className="block mb-2 text-md font-medium text-white">{change.title}</label>
               <select 
                  id="stringed-possible-values" 
                  className="mr-4 cursor-pointer font-semibold border border-gray-800 text-sm rounded-lg block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={val}
                  onChange={e => applyChangesToImage().apply([{name: change.name, value: e.target.value} as Change])} 
               >
                  {change.possibleValues.map((possibleValue, i) => {
                     if(possibleValue === ''){
                        return (
                           <option key={i} value={''}>None</option>
                        )
                     } else {
                        return (
                           <option key={i} value={possibleValue}>{possibleValue}</option>
                        )
                     }
                  })}
               </select>
            </>
         }
      </div>
   )
}
