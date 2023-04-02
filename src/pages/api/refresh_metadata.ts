import { NextApiRequest, NextApiResponse } from 'next';
import Config from '@/config/app';

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time)
    )
}

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {

    const req_url = `https://api.opensea.io/asset/${Config.som.address}/`;
    const update_flag = '/?force_update=true';
    let updated_count = 0;

    for (let i = 0; i < Config.totalCount; i++) {
        const res = await fetch(req_url + String(i + 1) + update_flag);
        if (res.status) updated_count++;
        sleep(300)
    }
    res.json(updated_count);
}
