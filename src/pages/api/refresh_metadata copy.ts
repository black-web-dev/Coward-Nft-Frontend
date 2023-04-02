import { NextApiRequest, NextApiResponse } from 'next';
import { httpGet } from '@/utils/http.utils';
import Config from '@/config/app';

//#########################   CONFIG   ####################################

const base_url = "https://api.opensea.io/api/v1/asset/"    // For testnets use "https://testnets-api.opensea.io/api/v1/asset/"*/
const smart_contract_address = Config.som.address;
const token_number = 100;
const not_updated_list: any[] = [];    //If only few tokens are not updated, insert their token_num in here
const time_limit = 60 * 60;     // One hour by default

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time)
    )
}

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {

    let num_updated = 0
    let num_cycles = 0
    let not_updated: any[] = [];
    // not_updated = not_updated_list.length > 0 ? not_updated_list : (Array(1 - token_number + 1).fill(1).map((_, idx) => 1 + idx))
    
    // not_updated = [33,25,51,46,69,44,78,56,34,77,91,14,72,76,36,54,21,83,85,71,2,86,7,57,43,11,53,67,60,88,28,97,55,73,79,89,63,10,27,92,1,17,16,62,96,48,12,20,68,93,5,31,65,19,39,81,9,38,59,45,29,37,13,4,49,52,26,41,61,8,66,80,24,18,87,82,74,90,22,70,47,94,42,6,40,99,58,98,64,75,23,35,50,32,100,15,3,95,30,84];

    let start_time = new Date().getTime();
    console.log(start_time)
    console.log("List : ", not_updated)

    while (new Date().getTime() - start_time < time_limit) {
        let temp_lis: any[] = [];
        num_updated = 0;

        for (let i = 0; i < token_number; i++) {
            const tokenId = i + 1;

            console.log("tokenId : ", tokenId);

            const url = base_url + smart_contract_address + "/" + tokenId + "/?force_update=true&format=json"
            const result = await httpGet(url);

            if (result['image_original_url'] && result['image_original_url'] != null) {
                num_updated++;
                console.log(`${tokenId} Token updated`);
            } else if (result['success']) {
                break;
            } else {
                console.log(tokenId)
                temp_lis.push(tokenId)
            }

            await sleep(1000);
        }
        num_cycles++;
        console.log(`\n ############# Completed cycle ${num_cycles} ##  Updated = ${num_updated / not_updated.length}`)
        console.log(`Remaining : ${temp_lis}`);

        if (temp_lis.length == 0) {
            break;
        }
        not_updated = temp_lis;
        await sleep(2000)
    }

    console.log(`\n\n############# All tokens Updated`);
    console.log(`             Done in ${new Date().getTime() - start_time} seconds. `)

    res.json('success');
}
