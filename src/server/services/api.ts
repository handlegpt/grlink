import { Link } from '../models/Link'

export interface LinkApi {
  getAll(): Promise<Link[]>
  create(data: Partial<Link>): Promise<Link>
  update(id: string, data: Partial<Link>): Promise<Link>
  delete(id: string): Promise<void>
  recordClick(id: string): Promise<Link>
}

class LinkApiImpl implements LinkApi {
  async getAll(): Promise<Link[]> {
    return Link.find().sort({ order: 1 })
  }

  async create(data: Partial<Link>): Promise<Link> {
    const link = new Link(data)
    return link.save()
  }

  async update(id: string, data: Partial<Link>): Promise<Link> {
    const link = await Link.findByIdAndUpdate(id, data, { new: true })
    if (!link) {
      throw new Error('链接不存在')
    }
    return link
  }

  async delete(id: string): Promise<void> {
    const result = await Link.findByIdAndDelete(id)
    if (!result) {
      throw new Error('链接不存在')
    }
  }

  async recordClick(id: string): Promise<Link> {
    const link = await Link.findById(id)
    if (!link) {
      throw new Error('链接不存在')
    }
    link.clicks += 1
    return link.save()
  }
}

export const linkApi: LinkApi = new LinkApiImpl() 