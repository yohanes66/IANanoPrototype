import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UIProvider } from './context/UIContext'
import { WalletProvider } from './context/WalletContext'
import { PortfolioProvider } from './context/PortfolioContext'
import { MarketProvider } from './context/MarketContext'
import { DesignVariantProvider } from './context/DesignVariantContext'
import MobileFrame from './components/templates/MobileFrame'

// Pages
import HomePage from './pages/home/HomePage'
import ResearchHubPage from './pages/home/ResearchHubPage'
import InsightDetailPage from './pages/home/InsightDetailPage'
import SocialFeedPage from './pages/home/SocialFeedPage'
import SocialPostDetailPage from './pages/home/SocialPostDetailPage'
import UserProfilePage from './pages/home/UserProfilePage'
import RewardsCenterPage from './pages/home/RewardsCenterPage'

import MarketPage from './pages/market/MarketPage'
import AssetDetailPage from './pages/market/AssetDetailPage'
import OverviewTab from './pages/market/tabs/OverviewTab'
import WatchlistTab from './pages/market/tabs/WatchlistTab'
import CryptoTab from './pages/market/tabs/CryptoTab'
import USTab from './pages/market/tabs/USTab'
import CommoditiesTab from './pages/market/tabs/CommoditiesTab'
import HKTab from './pages/market/tabs/HKTab'
import CNTab from './pages/market/tabs/CNTab'
import Web3Tab from './pages/market/tabs/Web3Tab'
import FuturesTab from './pages/market/tabs/FuturesTab'

import GrowPage from './pages/grow/GrowPage'
import EarnDetailPage from './pages/grow/EarnDetailPage'
import GadaiDigitalPage from './pages/grow/GadaiDigitalPage'
import BondsPage from './pages/grow/BondsPage'
import AutomatePage from './pages/grow/AutomatePage'
import CopyTradePage from './pages/grow/CopyTradePage'
import DCAPage from './pages/grow/DCAPage'
import BundlePage from './pages/grow/BundlePage'
import CicilEmasPage from './pages/grow/CicilEmasPage'
import CollateralPage from './pages/grow/CollateralPage'

import PortfolioPage from './pages/portfolio/PortfolioPage'
import AIInsightPage from './pages/portfolio/AIInsightPage'

import InspirationPage from './pages/inspiration/InspirationPage'

import WalletPage from './pages/wallet/WalletPage'
import FXTransferPage from './pages/wallet/FXTransferPage'
import TopUpPage from './pages/wallet/TopUpPage'
import TransactionHistoryPage from './pages/wallet/TransactionHistoryPage'
import CryptoSendPage from './pages/wallet/CryptoSendPage'

export default function App() {
  return (
    <BrowserRouter>
      <DesignVariantProvider>
      <UIProvider>
        <WalletProvider>
          <PortfolioProvider>
            <MarketProvider>
              <MobileFrame>
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/insights" element={<ResearchHubPage />} />
                  <Route path="/insights/:id" element={<InsightDetailPage />} />
                  <Route path="/social" element={<SocialFeedPage />} />
                  <Route path="/social/:postId" element={<SocialPostDetailPage />} />
                  <Route path="/social/user/:userId" element={<UserProfilePage />} />
                  <Route path="/rewards" element={<RewardsCenterPage />} />

                  {/* Market */}
                  <Route path="/market" element={<MarketPage />}>
                    <Route index element={<OverviewTab />} />
                    <Route path="watchlist" element={<WatchlistTab />} />
                    <Route path="crypto" element={<CryptoTab />} />
                    <Route path="us" element={<USTab />} />
                    <Route path="hk" element={<HKTab />} />
                    <Route path="cn" element={<CNTab />} />
                    <Route path="commodities" element={<CommoditiesTab />} />
                    <Route path="web3" element={<Web3Tab />} />
                    <Route path="futures" element={<FuturesTab />} />
                  </Route>
                  <Route path="/market/asset/:ticker" element={<AssetDetailPage />} />

                  {/* Grow */}
                  <Route path="/grow" element={<GrowPage />} />
                  <Route path="/grow/earn/:id" element={<EarnDetailPage />} />
                  <Route path="/grow/gadai" element={<GadaiDigitalPage />} />
                  <Route path="/grow/bonds" element={<BondsPage />} />
                  <Route path="/grow/automate" element={<AutomatePage />} />
                  <Route path="/grow/automate/copy-trade" element={<CopyTradePage />} />
                  <Route path="/grow/automate/dca" element={<DCAPage />} />
                  <Route path="/grow/automate/bundle" element={<BundlePage />} />
                  <Route path="/grow/cicil" element={<CicilEmasPage />} />
                  <Route path="/grow/collateral" element={<CollateralPage />} />

                  {/* Inspiration */}
                  <Route path="/inspiration" element={<InspirationPage />} />

                  {/* Portfolio */}
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/portfolio/insights" element={<AIInsightPage />} />

                  {/* Wallet */}
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/wallet/fx-transfer" element={<FXTransferPage />} />
                  <Route path="/wallet/topup" element={<TopUpPage />} />
                  <Route path="/wallet/history" element={<TransactionHistoryPage />} />
                  <Route path="/wallet/crypto/send" element={<CryptoSendPage />} />
                </Routes>
              </MobileFrame>
            </MarketProvider>
          </PortfolioProvider>
        </WalletProvider>
      </UIProvider>
      </DesignVariantProvider>
    </BrowserRouter>
  )
}
