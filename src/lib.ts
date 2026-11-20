import {createClient} from '@supabase/supabase-js';
import type {Lang,Product,Promotion,Variant} from './types';
const url=import.meta.env.VITE_SUPABASE_URL || '';
const key=import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const configured=Boolean(url&&key);
export const db=createClient(url||'https://example.supabase.co',key||'not-configured');
export const money=(n:number)=>'₹'+Number(n).toLocaleString('en-IN',{maximumFractionDigits:2});
export const label=(obj:Record<string,unknown>,field:string,lang:Lang)=>String(obj[field+'_'+lang]||obj[field+'_en']||'');
export const quantity=(grams:number)=>grams>=1000&&grams%1000===0?`${grams/1000}kg`:`${grams}g`;
export const slugify=(name:string)=>name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||`product-${Date.now()}`;
export function activePrice(variant:Variant,promos:Promotion[],now=new Date()):number {
 const p=promos.filter(x=>x.active&&x.product_id===variant.product_id&&(!x.variant_id||x.variant_id===variant.id)&&new Date(x.starts_at)<=now&&new Date(x.ends_at)>=now&&Number(x.discount_price)<Number(variant.price)).sort((a,b)=>Number(a.discount_price)-Number(b.discount_price))[0];
 return p?Number(p.discount_price):Number(variant.price);
}
export function whatsappLink(phone:string,product?:Product,variant?:Variant,price?:number,lang:Lang='en'){
 const number=phone.replace(/\D/g,'');
 if(!number)return '#';
 const text=product&&variant?(lang==='hi'?`नमस्ते, मुझे ${label(product as unknown as Record<string,unknown>,'name',lang)} ${quantity(variant.grams)} (${money(price??Number(variant.price))}) के बारे में जानकारी चाहिए।`:`Hello, I am interested in ${product.name_en}, ${quantity(variant.grams)}, listed at ${money(price??Number(variant.price))}. Is it available?`):(lang==='hi'?'नमस्ते, मुझे ड्राई फ्रूट्स के बारे में जानकारी चाहिए।':'Hello, I would like to know more about your dry fruits.');
 return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
export function unwrap<T>(result:{data:T|null;error:{message:string}|null}):T {if(result.error)throw new Error(result.error.message);if(result.data===null)throw new Error('No data returned');return result.data;}
