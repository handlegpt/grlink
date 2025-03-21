import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkTemplate, linkTemplates } from '../config/linkTemplates'
import LinkEditForm from './LinkEditForm'

interface AddLinkModalProps {
  onClose: () => void
  onSubmit: (data: { name: string; url: string; icon: string; color: string }) => void
}

const AddLinkModal = ({ onClose, onSubmit }: AddLinkModalProps) => {
  const { t } = useTranslation()
  const [selectedTemplate, setSelectedTemplate] = useState<LinkTemplate | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredTemplates = linkTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTemplateSelect = (template: LinkTemplate) => {
    setSelectedTemplate(template)
  }

  const handleSubmit = (data: { name: string; url: string; icon: string; color: string }) => {
    onSubmit(data)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-lg w-full ${
          isMobile ? 'h-[90vh]' : 'max-h-[90vh]'
        } overflow-hidden flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('profile.addLink')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!selectedTemplate ? (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('profile.selectTemplate')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => handleTemplateSelect(template)}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-white transition-colors ${template.color} hover:opacity-90 active:scale-95`}
                  >
                    <span className="text-xl">{template.icon}</span>
                    <span className="truncate">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <LinkEditForm
              initialData={{
                name: selectedTemplate.name,
                url: selectedTemplate.urlPrefix || '',
                icon: selectedTemplate.icon,
                color: selectedTemplate.color
              }}
              onSubmit={handleSubmit}
              onCancel={() => setSelectedTemplate(null)}
              placeholder={selectedTemplate.placeholder}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AddLinkModal 