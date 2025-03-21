export interface LinkTemplate {
  name: string
  icon: string
  color: string
  urlPrefix?: string
  placeholder?: string
}

export const linkTemplates: LinkTemplate[] = [
  // 社交媒体
  {
    name: 'GitHub',
    icon: '🐙',
    color: 'bg-gray-800',
    urlPrefix: 'https://github.com/',
    placeholder: '用户名'
  },
  {
    name: 'Twitter',
    icon: '🐦',
    color: 'bg-blue-400',
    urlPrefix: 'https://twitter.com/',
    placeholder: '用户名'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700',
    urlPrefix: 'https://linkedin.com/in/',
    placeholder: '用户名'
  },
  {
    name: 'Instagram',
    icon: '📸',
    color: 'bg-pink-600',
    urlPrefix: 'https://instagram.com/',
    placeholder: '用户名'
  },
  {
    name: 'Facebook',
    icon: '👥',
    color: 'bg-blue-600',
    urlPrefix: 'https://facebook.com/',
    placeholder: '用户名'
  },
  {
    name: 'YouTube',
    icon: '🎥',
    color: 'bg-red-600',
    urlPrefix: 'https://youtube.com/',
    placeholder: '频道名'
  },
  {
    name: 'TikTok',
    icon: '🎵',
    color: 'bg-black',
    urlPrefix: 'https://tiktok.com/@',
    placeholder: '用户名'
  },
  {
    name: 'Reddit',
    icon: '🤖',
    color: 'bg-orange-600',
    urlPrefix: 'https://reddit.com/user/',
    placeholder: '用户名'
  },
  {
    name: 'Pinterest',
    icon: '📌',
    color: 'bg-red-700',
    urlPrefix: 'https://pinterest.com/',
    placeholder: '用户名'
  },
  {
    name: 'Snapchat',
    icon: '👻',
    color: 'bg-yellow-400',
    urlPrefix: 'https://snapchat.com/add/',
    placeholder: '用户名'
  },
  // 作品集网站
  {
    name: 'Behance',
    icon: '🎨',
    color: 'bg-blue-500',
    urlPrefix: 'https://behance.net/',
    placeholder: '用户名'
  },
  {
    name: 'Dribbble',
    icon: '🏀',
    color: 'bg-pink-500',
    urlPrefix: 'https://dribbble.com/',
    placeholder: '用户名'
  },
  {
    name: 'Portfolio',
    icon: '🎯',
    color: 'bg-purple-600',
    placeholder: '作品集网站地址'
  },
  // 博客平台
  {
    name: 'Medium',
    icon: '📝',
    color: 'bg-gray-700',
    urlPrefix: 'https://medium.com/@',
    placeholder: '用户名'
  },
  {
    name: 'WordPress',
    icon: '📚',
    color: 'bg-blue-500',
    placeholder: '博客地址'
  },
  // 其他
  {
    name: 'Email',
    icon: '📧',
    color: 'bg-green-500',
    urlPrefix: 'mailto:',
    placeholder: '邮箱地址'
  },
  {
    name: 'Website',
    icon: '🌐',
    color: 'bg-indigo-600',
    placeholder: '网站地址'
  },
  {
    name: 'Custom',
    icon: '🔗',
    color: 'bg-gray-600',
    placeholder: '自定义链接'
  }
] 