import { useState } from 'react'
import DetailPage from '../../components/templates/DetailPage'
import TierBadge from '../../components/molecules/TierBadge'
import TabPill from '../../components/molecules/TabPill'
import { REWARDS_DATA } from '../../mock-data/rewards'
import { useUI } from '../../context/UIContext'

const SECTION_TABS = [
  { id: 'missions', label: 'Misi' },
  { id: 'store', label: 'Reward Store' },
  { id: 'tiers', label: 'Tier' },
]

export default function RewardsCenterPage() {
  const [activeTab, setActiveTab] = useState('missions')
  const { addToast } = useUI()

  const handleRedeem = (item) => {
    if (REWARDS_DATA.points < item.cost) {
      addToast('Poin tidak cukup', 'error')
    } else {
      addToast(`${item.name} berhasil ditukarkan! 🎁`, 'success')
    }
  }

  return (
    <DetailPage title="Rewards Center">
      <div className="pb-4">
        {/* Tier Card */}
        <div className="mx-4 mt-4">
          <div className="bg-gradient-to-r from-yellow-400 to-brand rounded-card p-5 shadow-orange text-white">
            <div className="flex items-center justify-between mb-3">
              <TierBadge tier={REWARDS_DATA.userTier} size="md" />
              <div className="text-right">
                <p className="text-2xl font-extrabold">{REWARDS_DATA.points.toLocaleString('id-ID')}</p>
                <p className="text-xs text-yellow-100">poin</p>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs text-yellow-100 mb-1">
                <span>Gold</span>
                <span>{REWARDS_DATA.nextTierPoints.toLocaleString()} untuk Platinum</span>
              </div>
              <div className="bg-white/30 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(REWARDS_DATA.points / REWARDS_DATA.nextTierPoints) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-yellow-100">Butuh {(REWARDS_DATA.nextTierPoints - REWARDS_DATA.points).toLocaleString()} poin lagi untuk Platinum</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-4 mb-4">
          <TabPill tabs={SECTION_TABS} activeTab={activeTab} onSelect={setActiveTab} size="md" />
        </div>

        {/* Missions */}
        {activeTab === 'missions' && (
          <div className="px-4 space-y-3">
            {REWARDS_DATA.missions.map(mission => (
              <div key={mission.id} className={`bg-white rounded-card shadow-card p-4 ${mission.completed ? 'opacity-60' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${mission.completed ? 'bg-positive/10' : 'bg-brand-light'}`}>
                    {mission.completed ? '✅' : mission.category === 'trading' ? '📈' : mission.category === 'social' ? '👥' : '📅'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">{mission.title}</p>
                      <span className="text-xs font-bold text-brand">+{mission.points} poin</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{mission.desc}</p>
                    {!mission.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{mission.progress}/{mission.total}</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-brand rounded-full" style={{ width: `${(mission.progress / mission.total) * 100}%` }} />
                        </div>
                      </div>
                    )}
                    {mission.completed && <p className="text-xs text-positive font-semibold mt-1">✓ Selesai</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Store */}
        {activeTab === 'store' && (
          <div className="px-4 space-y-3">
            <div className="bg-brand-light rounded-xl p-3 flex items-center gap-2 border border-brand/20">
              <span className="text-xl">⭐</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Poin Anda</p>
                <p className="text-sm font-extrabold text-brand">{REWARDS_DATA.points.toLocaleString()} poin</p>
              </div>
            </div>
            {REWARDS_DATA.store.map(item => (
              <div key={item.id} className="bg-white rounded-card shadow-card p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.category === 'voucher' ? '🎫' : '🎟️'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.brand}</p>
                  <p className="text-xs font-bold text-brand mt-0.5">{item.cost.toLocaleString()} poin</p>
                </div>
                <button
                  onClick={() => handleRedeem(item)}
                  className={`px-3 py-2 rounded-pill text-xs font-bold ${REWARDS_DATA.points >= item.cost ? 'bg-surface-dark text-white active:opacity-80' : 'bg-gray-100 text-gray-400'}`}
                >
                  Tukar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tiers */}
        {activeTab === 'tiers' && (
          <div className="px-4 space-y-3">
            {REWARDS_DATA.tiers.map(tier => (
              <div key={tier.name} className={`bg-white rounded-card shadow-card p-4 border-2 ${REWARDS_DATA.userTier === tier.name ? 'border-brand' : 'border-transparent'}`}>
                <div className="flex items-center gap-3">
                  <TierBadge tier={tier.name} size="md" />
                  {REWARDS_DATA.userTier === tier.name && (
                    <span className="text-xs font-bold text-brand bg-brand-light px-2 py-0.5 rounded-pill">Tier Anda</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {tier.minPoints.toLocaleString()} {tier.maxPoints ? `– ${tier.maxPoints.toLocaleString()}` : '+'} poin
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DetailPage>
  )
}
