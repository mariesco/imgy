import { Change, ChangeTypeNum } from '@/entities/History';
import { ApplyChangesToImageInterface } from '@/entities/ImagesStore';
import { FC,  useState } from 'react';

type MainConfigItemProps = {
  change: Change;
  applyChangesToImage: ApplyChangesToImageInterface;
}


export const MainConfigItem: FC<MainConfigItemProps> = ({ change, applyChangesToImage }) => {
   const [val, setVal] = useState(change.value)

   function isTypeNum(change: Change): change is ChangeTypeNum {
     return (change as ChangeTypeNum).min !== undefined && (change as ChangeTypeNum).max !== undefined && (change as ChangeTypeNum).value !== undefined;
   }
 
   return (
      <div className="pt-4">
         {isTypeNum(change) ?
            <>
               <label htmlFor="default-range" className="block mb-4 text-md font-medium text-white">{change.name}</label>
               <input 
                  id="default-range" 
                  type="range" 
                  value={val} 
                  min={change.min}
                  max={change.max}
                  onClick={e => applyChangesToImage().apply([{name: change.name, value: parseFloat(e.target.value)} as Change])} 
                  onChange={e => setVal(parseFloat(e.target.value))} 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
            </>
         :
            <>
               <label htmlFor="options-props" className="block mb-2 text-md font-medium text-white">{change.name}</label>
               <select id="options-props" className="mr-4 cursor-pointer font-semibold border border-gray-800 text-sm rounded-lg block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                 <option defaultValue={'s'}>Choose a image</option>
                 <option value="US">United States</option>
                 <option value="CA">Canada</option>
                 <option value="FR">France</option>
                 <option value="DE">Germany</option>
               </select>
            </>
         }
      </div>
   )
}
