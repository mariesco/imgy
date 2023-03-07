import type { History as HistoryType } from '@/entities/History'
import { ApplyHistoryChangesToImageInterface } from '@/entities/ImagesStore';
import React,{ FC } from 'react'
import { History } from './History'

type HistorySidebarProps = {
  history: HistoryType;
  applyHistoryChangesToImage: ApplyHistoryChangesToImageInterface;
}

export const HistorySidebar: FC<HistorySidebarProps>  = ({ history, applyHistoryChangesToImage }) => {
  return (
    <>
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-700" aria-label="Sidebar">
        <History 
          history={history}
          applyHistoryChangesToImage={applyHistoryChangesToImage}
          />
        </aside>
    </>
  )
}
