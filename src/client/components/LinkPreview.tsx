import { Link } from '../services/api'

interface LinkPreviewProps extends Link {}

const LinkPreview: React.FC<LinkPreviewProps> = ({
  name,
  url,
  icon,
  color,
  clicks,
  createdAt
}) => {
  return (
    <div
      className="flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      style={{ backgroundColor: color + '20' }}
    >
      <div className="flex-shrink-0">
        <i className={`${icon} text-2xl`} style={{ color }} />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{url}</p>
        <div className="mt-2 text-xs text-gray-400">
          <span>点击次数: {clicks}</span>
          <span className="mx-2">|</span>
          <span>创建时间: {new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default LinkPreview 