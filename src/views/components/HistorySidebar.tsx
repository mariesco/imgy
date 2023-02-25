import React from 'react'
import { History } from './History'

export const HistorySidebar = () => {
  return (
    <>
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-700" aria-label="Sidebar">
        <History/>
        </aside>
    </>
  )
}
