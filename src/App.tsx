import { useState } from 'react'
import FloorPlan from './2nd-floor-plan'
import StairDetail from './stair-detail'
import Stair3D from './stair-3d'
import PartitionFrame from './partition-frame'

type View = 'floor' | 'detail' | '3d' | 'partition'

export default function App() {
  const [view, setView] = useState<View>('floor')

  const tabs: { id: View; label: string }[] = [
    { id: 'floor', label: 'План 2 этажа' },
    { id: 'partition', label: 'Каркас перегородки' },
    { id: 'detail', label: 'Детали лестницы' },
    { id: '3d', label: '3D модель' },
  ]

  return (
    <div style={{ background: '#1a1a2e', minHeight: '100vh' }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        padding: '16px 20px',
        background: '#0d1520',
        borderBottom: '1px solid #ffffff15'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            style={{
              padding: '10px 20px',
              background: view === tab.id ? '#ff9800' : '#1e2d4a',
              color: view === tab.id ? '#000' : '#e0e0e0',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: view === tab.id ? 'bold' : 'normal',
              fontSize: 14,
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {view === 'floor' && <FloorPlan />}
      {view === 'partition' && <PartitionFrame />}
      {view === 'detail' && <StairDetail />}
      {view === '3d' && <Stair3D />}
    </div>
  )
}
