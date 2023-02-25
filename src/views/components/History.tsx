import { Inter } from 'next/font/google'
import { HistoryItem } from './HistoryItem'

const inter = Inter({subsets: ['latin']})

export const History = () => {
  return (
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900">
              <p className={`${inter.className} py-2 px-4 border-b-2 border-gray-700 mb-2 text-2xl font-medium`}>
                History 
              </p>
             <ul className="space-y-2">
                <HistoryItem value={'Dashboard'}/>
                <HistoryItem value={'History'}/>
                <HistoryItem value={'Value'}/>
                <HistoryItem value={'WEy'}/>
                <HistoryItem value={'WASS'}/>
                <HistoryItem value={'Dashboard'}/>
                <HistoryItem value={'History'}/>
                <HistoryItem value={'Value'}/>
                <HistoryItem value={'WEy'}/>
                <HistoryItem value={'WASS'}/>
                <HistoryItem value={'Dashboard'}/>
                <HistoryItem value={'History'}/>
                <HistoryItem value={'Value'}/>
                <HistoryItem value={'WEy'}/>
                <HistoryItem value={'WASS'}/>
                <HistoryItem value={'Dashboard'}/>
                <HistoryItem value={'History'}/>
                <HistoryItem value={'Value'}/>
                <HistoryItem value={'WEy'}/>
                <HistoryItem value={'WASS'}/>
                <HistoryItem value={'Dashboard'}/>
                <HistoryItem value={'History'}/>
                <HistoryItem value={'Value'}/>
                <HistoryItem value={'WEy'}/>
                <HistoryItem value={'WASS'}/>
                <HistoryItem value={'Dashboard'}/>
                <HistoryItem value={'History'}/>
                <HistoryItem value={'Value'}/>
                <HistoryItem value={'WEy'}/>
                <HistoryItem value={'WASS'}/>
             </ul>
          </div>
  )
}
