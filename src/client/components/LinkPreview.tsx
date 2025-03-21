import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../services/api'
import { linkApi } from '../services/api'

interface LinkPreviewProps extends Link {
  onClicksUpdate?: (clicks: number) => void
}

const LinkPreview = ({ _id, name, url, icon, color, clicks, onClicksUpdate }: LinkPreviewProps) => {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)

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
      const response = await linkApi.incrementClicks(_id)
      onClicksUpdate?.(response.data.clicks)
    } catch (error) {
      console.error('Failed to increment clicks:', error)
    }
  }

  return (
    <div className={`${color} rounded-lg p-4 text-white transition-all hover:opacity-90 active:scale-98`}>
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{name}</div>
          <div className="text-sm opacity-80 truncate">
            {url || t('profile.linkUrl')}
          </div>
        </div>
        <span className="text-xl opacity-70">→</span>
      </div>
      <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
        <span className="truncate">{url}</span>
        <span className="ml-2">{clicks} {t('profile.clicks')}</span>
      </div>
    </div>
  )
}

export default LinkPreview 