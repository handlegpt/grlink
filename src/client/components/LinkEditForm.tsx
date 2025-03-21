import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LinkPreview from './LinkPreview'

interface LinkEditFormProps {
  initialData: {
    name: string
    url: string
    icon: string
    color: string
  }
  onSubmit: (data: { name: string; url: string; icon: string; color: string }) => void
  onCancel: () => void
  placeholder?: string
}

interface LinkFormData {
  name: string;
  url: string;
  icon: string;
  color: string;
}

const LinkEditForm: React.FC<LinkEditFormProps> = ({ initialData, onSubmit, onCancel, placeholder }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<LinkFormData>({
    name: initialData.name,
    url: initialData.url,
    icon: initialData.icon,
    color: initialData.color
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...initialData,
      ...formData
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.linkName')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.linkUrl')}
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder || 'https://'}
            required
          />
        </div>

        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-end space-x-3'}`}>
          <button
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 ${
              isMobile ? 'w-full' : ''
            }`}
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
              isMobile ? 'w-full' : ''
            }`}
          >
            {t('common.save')}
          </button>
        </div>
      </form>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {t('profile.preview')}
        </h3>
        <LinkPreview {...formData} />
      </div>
    </div>
  )
}

export default LinkEditForm 