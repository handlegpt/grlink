import express from 'express'
import { Link } from '../models/Link'
import { linkApi } from '../services/api'

const router = express.Router()

// 获取所有链接
router.get('/', async (req, res) => {
  try {
    const links = await linkApi.getAll()
    res.json(links)
  } catch (error) {
    res.status(500).json({ error: '获取链接失败' })
  }
})

// 创建新链接
router.post('/', async (req, res) => {
  try {
    const link = await linkApi.create(req.body)
    res.status(201).json(link)
  } catch (error) {
    res.status(500).json({ error: '创建链接失败' })
  }
})

// 更新链接
router.put('/:id', async (req, res) => {
  try {
    const link = await linkApi.update(req.params.id, req.body)
    res.json(link)
  } catch (error) {
    res.status(500).json({ error: '更新链接失败' })
  }
})

// 删除链接
router.delete('/:id', async (req, res) => {
  try {
    await linkApi.delete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: '删除链接失败' })
  }
})

// 更新链接顺序
router.put('/:id/reorder', async (req, res) => {
  try {
    const { order } = req.body
    const link = await linkApi.update(req.params.id, { order })
    res.json(link)
  } catch (error) {
    res.status(500).json({ error: '更新链接顺序失败' })
  }
})

// 记录链接点击
router.post('/:id/click', async (req, res) => {
  try {
    const link = await linkApi.recordClick(req.params.id)
    res.json(link)
  } catch (error) {
    res.status(500).json({ error: '记录点击失败' })
  }
})

// 获取点击统计数据
router.get('/stats', async (_req, res) => {
  try {
    const { startDate, endDate } = _req.query
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