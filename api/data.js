import { Redis } from '@upstash/redis';

// 这行代码会自动读取环境变量里的 UPSTASH_REDIS_REST_URL 和 TOKEN
const redis = Redis.fromEnv();

export default async function handler(req, res) {
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
            const data = await redis.get('kid_star_data');
            return res.status(200).json(data || defaultData);
        } else if (req.method === 'POST') {
            await redis.set('kid_star_data', req.body);
            return res.status(200).json({ success: true });
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database Connection Error' });
    }
}