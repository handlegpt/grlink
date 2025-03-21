import express from 'express'
import { Link } from '../models/Link'
import { linkApi } from '../services/api'

const router = express.Router()

// 获取所有链接
router.get('/', async (req, res) => {
  try {
    const links = await Link.find().sort({ order: 1 })
    res.json(links)
  } catch (error) {
    res.status(500).json({ message: '获取链接失败' })
  }
})

// 创建新链接
router.post('/', async (req, res) => {
  try {
    const link = new Link(req.body)
    await link.save()
    res.status(201).json(link)
  } catch (error) {
    res.status(400).json({ message: '创建链接失败' })
  }
})

// 更新链接
router.put('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!link) {
      return res.status(404).json({ message: '链接不存在' })
    }
    res.json(link)
  } catch (error) {
    res.status(400).json({ message: '更新链接失败' })
  }
})

// 删除链接
router.delete('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id)
    if (!link) {
      return res.status(404).json({ message: '链接不存在' })
    }
    res.json({ message: '链接已删除' })
  } catch (error) {
    res.status(400).json({ message: '删除链接失败' })
  }
})

// 记录点击
router.post('/:id/click', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    if (!link) {
      return res.status(404).json({ message: '链接不存在' })
    }
    link.clicks += 1
    await link.save()
    res.json(link)
  } catch (error) {
    res.status(400).json({ message: '记录点击失败' })
  }
})

// 更新链接顺序
router.put('/:id/reorder', async (req, res) => {
  try {
    const { order } = req.body
    const link = await Link.findByIdAndUpdate(
      req.params.id,
      { order },
      { new: true }
    )
    if (!link) {
      return res.status(404).json({ message: '链接不存在' })
    }
    res.json(link)
  } catch (error) {
    res.status(400).json({ message: '更新链接顺序失败' })
  }
})

// 获取点击统计数据
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const query: any = {}
    
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    }

    const stats = await Link.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalClicks: { $sum: '$clicks' },
          links: {
            $push: {
              name: '$name',
              clicks: '$clicks',
              color: '$color',
              icon: '$icon'
            }
          }
        }
      }
    ])

    res.json(stats[0] || { totalClicks: 0, links: [] })
  } catch (error) {
    res.status(500).json({ message: '获取统计数据失败' })
  }
})

export default router 