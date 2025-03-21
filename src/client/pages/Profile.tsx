import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../services/api'
import AddLinkModal from '../components/AddLinkModal'
import LinkPreview from '../components/LinkPreview'

const Profile = () => {
  const { t } = useTranslation()
  const [links, setLinks] = useState<Link[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links')
        const data = await response.json()
        setLinks(data)
      } catch (error) {
        console.error('获取链接失败:', error)
      }
    }

    fetchLinks()
  }, [])

  const handleAddLink = async (link: Link) => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      })
      const newLink = await response.json()
      setLinks([...links, newLink])
    } catch (error) {
      console.error('添加链接失败:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('profile.title')}
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {t('profile.addLink')}
        </button>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <LinkPreview key={link._id} {...link} />
        ))}
      </div>

      <AddLinkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddLink}
      />
    </div>
  )
}

export default Profile 