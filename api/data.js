import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // 默认数据结构（如果数据库是空的，就用这个）
    const defaultData = {
        points: 0,
        tasks: [
            { id: 1, name: "刷牙洗脸", val: 1, icon: "🚿" },
            { id: 2, name: "阅读20分钟", val: 2, icon: "📚" },
            { id: 3, name: "整理玩具", val: 2, icon: "🧸" },
            { id: 4, name: "户外运动", val: 3, icon: "⚽" }
        ],
        shop: [
            { id: 101, name: "看动画片", val: 10, icon: "📺" },
            { id: 102, name: "吃冰激凌", val: 15, icon: "🍦" }
        ],
        logs: []
    };

    try {
        if (req.method === 'GET') {
            // 从数据库读取数据
            const data = await kv.get('kid_star_data');
            return res.status(200).json(data || defaultData);
        } else if (req.method === 'POST') {
            // 保存数据到数据库
            await kv.set('kid_star_data', req.body);
            return res.status(200).json({ success: true });
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database Connection Error' });
    }
}