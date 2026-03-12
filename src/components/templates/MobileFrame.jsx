import BottomNav from '../organisms/BottomNav'
import BuySheet from '../organisms/BuySheet'
import CetakEmasSheet from '../organisms/CetakEmasSheet'
import ToastContainer from './ToastContainer'
import LoadingOverlay from './LoadingOverlay'
import { useLocation } from 'react-router-dom'

const HIDE_NAV_PATHS = ['/wallet/fx-transfer', '/wallet/topup', '/wallet/withdraw', '/wallet/crypto/send']

export default function MobileFrame({ children }) {
  const location = useLocation()
  const hideNav = HIDE_NAV_PATHS.some(p => location.pathname.startsWith(p)) ||
    location.pathname.includes('/market/asset/') ||
    location.pathname.includes('/insights/') ||
    location.pathname.startsWith('/grow/automate/')

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="relative w-full max-w-[390px] h-screen bg-[#F5F5F5] overflow-hidden shadow-2xl flex flex-col">
        {/* Status Bar */}
        <div className="bg-white h-10 flex items-center justify-between px-5 flex-shrink-0">
          <span className="text-xs font-bold text-gray-900">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="4" width="3" height="8" rx="1" fill="#111" opacity=".3"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#111" opacity=".5"/><rect x="9" y="1" width="3" height="11" rx="1" fill="#111" opacity=".8"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111"/></svg>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="none"><path d="M12 3C16.97 3 21.36 5.36 24 9C21.36 12.64 16.97 15 12 15C7.03 15 2.64 12.64 0 9C2.64 5.36 7.03 3 12 3Z" fill="#111" opacity=".3"/><path d="M12 5C16 5 19.5 6.8 21.8 9.6C19.5 12.4 16 14 12 14C8 14 4.5 12.4 2.2 9.6C4.5 6.8 8 5 12 5Z" fill="#111" opacity=".5"/><circle cx="12" cy="9" r="3" fill="#111"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#111" strokeOpacity=".35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#111"/><path d="M23 4v4a2 2 0 000-4z" fill="#111" opacity=".4"/></svg>
          </div>
        </div>

        {/* Main scrollable content */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden ${hideNav ? '' : 'pb-16'}`}>
          {children}
        </div>

        {/* Bottom Nav */}
        {!hideNav && <BottomNav />}

        {/* Global Sheets */}
        <BuySheet />
        <CetakEmasSheet />

        {/* Toast & Loading */}
        <ToastContainer />
        <LoadingOverlay />
      </div>
    </div>
  )
}
