import type { History as HistoryType, HistoryItem as HistoryItemType } from '@/entities/History'
import type { FC } from 'react';

import { Inter } from 'next/font/google'

import { HistoryItem } from './HistoryItem'
import { ApplyHistoryChangesToImageInterface } from '@/entities/ImagesStore';

const inter = Inter({subsets: ['latin']})

type HistoryProps = {
  history: HistoryType;
  applyHistoryChangesToImage: ApplyHistoryChangesToImageInterface;
}

export const History: FC<HistoryProps> = ({ history, applyHistoryChangesToImage }) => {
  return (
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900">
              <p className={`${inter.className} py-2 px-4 border-b-2 border-gray-700 mb-2 text-2xl font-medium`}>
                History 
              </p>
             <ul className="space-y-2">
                {history?.map((historyItem: HistoryItemType) => {
                   return (
                     <HistoryItem 
                        value={historyItem}
                        applyHistoryChangesToImage={applyHistoryChangesToImage}
                        />
                   );
                })}
             </ul>
          </div>
  )
}
