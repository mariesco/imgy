import type { Change, HistoryItem as HistoryItemType } from '@/entities/History'
import React, { FC, useState } from 'react'
import { Inter } from 'next/font/google'
import { ApplyHistoryChangesToImageInterface } from '@/entities/ImagesStore';

const inter = Inter({subsets: ['latin']});

type HistoryItemProps = {
   value: HistoryItemType; 
   applyHistoryChangesToImage: ApplyHistoryChangesToImageInterface;
}

export const HistoryItem:FC<HistoryItemProps> = ({ value, applyHistoryChangesToImage}) => {

   const [isHovered, setIsHovered] = useState<boolean>(false);
   const MAX_PROPS_VIEWED = 3;

   const renderItemChange = (change: Change) => {
      return (
         <li className={`${inter.className} ml-3`}>
         {change.name}: {change.value}
         </li>
      )
   }

   return (
      <li 
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={() => {
            applyHistoryChangesToImage().apply(value.changes);
         }}
         className="cursor-pointer hover:bg-gray-700 rounded-lg">
            <ol role="list" className="list-disc pl-3 p-2 text-base font-normal text-white">
               <>
               {value.changes.map((change, i) => {
                  if(i < MAX_PROPS_VIEWED) return renderItemChange(change)
                  else {
                     if(isHovered) return renderItemChange(change)
                  }
               })}
               {value.changes.length > MAX_PROPS_VIEWED && !isHovered && '...'}
               </>
            </ol>
      </li>
   )
}
