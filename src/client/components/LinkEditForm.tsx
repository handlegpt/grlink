import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../services/api'
import LinkPreview from './LinkPreview'

interface LinkFormData {
  name: string
  url: string
  icon: string
  color: string
}

interface LinkEditFormProps {
  link: Link
  onSubmit: (data: Link) => void
  onCancel: () => void
  placeholder?: string
}

const LinkEditForm: React.FC<LinkEditFormProps> = ({ link, onSubmit, onCancel, placeholder }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<LinkFormData>({
    name: link.name,
    url: link.url,
    icon: link.icon,
    color: link.color
  })
  const [isMobile, setIsMobile] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...link,
      ...formData
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.name')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.url')}
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.icon')}
          </label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.color')}
          </label>
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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