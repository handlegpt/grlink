import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../services/api'
import { linkApi } from '../services/api'
import axios from 'axios'

interface LinkPreviewProps extends Link {
  onClicksUpdate?: (clicks: number) => void
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ _id, name, url, icon, color, clicks, onClicksUpdate }) => {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = async () => {
    try {
      await axios.post(`/api/links/${_id}/click`)
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error recording click:', error)
    }
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: color + '20' }}>
            <i className={icon} style={{ color }}></i>
          </div>
          <span className="text-gray-800 font-medium">{name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{clicks} {t('clicks')}</span>
          <i className="fas fa-chevron-right text-gray-400"></i>
        </div>
      </button>
    </div>
  )
}

export default LinkPreview 