import {db,unwrap} from './lib';
import type {Category,Product,Promotion,Settings} from './types';
export const products=async(includeInactive=false):Promise<Product[]>=>{
 let q=db.from('products').select('*,product_variants(*),product_images(*)').order('created_at',{ascending:false});
 if(!includeInactive)q=q.eq('active',true);
 const rows=unwrap(await q) as Product[];
 return rows.map(p=>({...p,product_variants:p.product_variants.filter(v=>includeInactive||v.active).sort((a,b)=>a.grams-b.grams),product_images:p.product_images.sort((a,b)=>a.sort_order-b.sort_order)}));
};
export const categories=async():Promise<Category[]>=>unwrap(await db.from('categories').select('*').order('sort_order')) as Category[];
export const promotions=async():Promise<Promotion[]>=>unwrap(await db.from('promotions').select('*')) as Promotion[];
export const settings=async():Promise<Settings>=>unwrap(await db.from('shop_settings').select('*').eq('id',1).single()) as Settings;
