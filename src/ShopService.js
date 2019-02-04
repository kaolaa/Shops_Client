import axios from "axios";


const url = 'http://localhost:2000/api/shops';

class ShopService {

    // Get Shops
    static getShops() {
        return  new Promise(async (resolve,reject)=> 
        {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.data.map(shop => ({
                    ...shop
                    
             })));
            } catch (error) {
                reject(error);
            } 
        })
    }
}

export default ShopService;