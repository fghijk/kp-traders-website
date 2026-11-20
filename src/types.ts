export type Lang='en'|'hi';
export type Category={id:string;name_en:string;name_hi:string;sort_order:number};
export type Variant={id:string;product_id:string;grams:number;price:number;active:boolean;sort_order:number};
export type ProductImage={id:string;product_id:string;url:string;storage_path:string|null;sort_order:number};
export type Product={id:string;slug:string;category_id:string|null;name_en:string;name_hi:string;description_en:string;description_hi:string;price_per_kg:number;active:boolean;featured:boolean;created_at:string;product_variants:Variant[];product_images:ProductImage[]};
export type Promotion={id:string;product_id:string;variant_id:string|null;title_en:string;title_hi:string;discount_price:number;starts_at:string;ends_at:string;active:boolean};
export type Settings={id:number;shop_name:string;tagline_en:string;tagline_hi:string;about_en:string;about_hi:string;phone:string;whatsapp:string;address:string;hours:string;instagram:string;facebook:string;maps_url:string;logo_url:string;hero_url:string;announcement_en:string;announcement_hi:string};
