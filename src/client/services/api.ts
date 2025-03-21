import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export interface Link {
  _id: string
  name: string
  url: string
  icon: string
  color: string
  clicks: number
  order: number
  createdAt: string
}

export interface LinkStats {
  totalClicks: number
  links: Array<{
    name: string
    clicks: number
    color: string
    icon: string
  }>
}

export const linkApi = {
  getLinks: () => api.get<Link[]>('/links'),
  createLink: (data: Omit<Link, '_id' | 'clicks' | 'order' | 'createdAt'>) => 
    api.post<Link>('/links', data),
  updateLinkOrder: (linkIds: string[]) => 
    api.put('/links/order', { linkIds }),
  deleteLink: (id: string) => 
    api.delete(`/links/${id}`),
  incrementClicks: (id: string) => 
    api.post<Link>(`/links/${id}/clicks`),
  getStats: (startDate?: string, endDate?: string) => 
    api.get<LinkStats>('/links/stats', {
      params: { startDate, endDate }
    })
} 