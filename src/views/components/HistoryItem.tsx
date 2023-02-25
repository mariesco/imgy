import React, { FC } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({subsets: ['latin']});

type HistoryItemProps = {
   value: string;
}

export const HistoryItem:FC<HistoryItemProps> = ({ value }) => {
   return (
         <li>
            <a href="#" className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
               <span className={`${inter.className} ml-3`}>{value}</span>
            </a>
         </li>
   )
}
