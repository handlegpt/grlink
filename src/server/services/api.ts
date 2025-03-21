import { ILink, Link } from '../models/Link'

export interface LinkApi {
  getAll(): Promise<ILink[]>
  create(data: Partial<ILink>): Promise<ILink>
  update(id: string, data: Partial<ILink>): Promise<ILink>
  delete(id: string): Promise<void>
  recordClick(id: string): Promise<ILink>
}

class LinkApiImpl implements LinkApi {
  async getAll(): Promise<ILink[]> {
    return Link.find().sort({ order: 1 })
  }

  async create(data: Partial<ILink>): Promise<ILink> {
    const link = new Link(data)
    return link.save()
  }

  async update(id: string, data: Partial<ILink>): Promise<ILink> {
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

  async recordClick(id: string): Promise<ILink> {
    const link = await Link.findById(id)
    if (!link) {
      throw new Error('链接不存在')
    }
    link.clicks += 1
    return link.save()
  }
}

export const linkApi: LinkApi = new LinkApiImpl() 