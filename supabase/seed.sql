-- DEMO products and prices only. Safe to rerun.
insert into public.categories(name_en,name_hi,sort_order) values('Nuts','मेवे',1),('Dried Fruits','सूखे फल',2),('Gift Packs','गिफ्ट पैक',3) on conflict(name_en) do nothing;
insert into public.products(slug,name_en,name_hi,description_en,description_hi,category_id,price_per_kg,featured) values
('premium-kaju','Premium Kaju','प्रीमियम काजू','Whole cashews for snacking and gifting.','स्नैकिंग और उपहार के लिए काजू।',(select id from public.categories where name_en='Nuts'),950,true),
('classic-badam','Classic Badam','बादाम','Almonds for everyday snacking.','रोज़ाना के लिए बादाम।',(select id from public.categories where name_en='Nuts'),800,true),
('green-pista','Green Pista','पिस्ता','Pistachios with a rich nutty taste.','स्वादिष्ट पिस्ता।',(select id from public.categories where name_en='Nuts'),1500,true),
('sweet-kishmish','Sweet Kishmish','किशमिश','Sweet raisins for snacks and recipes.','मिठास भरी किशमिश।',(select id from public.categories where name_en='Dried Fruits'),450,true),
('akhrot','Akhrot','अखरोट','Walnut kernels.','अखरोट की गिरी।',(select id from public.categories where name_en='Nuts'),1100,false),
('anjeer','Anjeer','अंजीर','Dried figs.','सूखे अंजीर।',(select id from public.categories where name_en='Dried Fruits'),1200,false),
('khajoor','Khajoor','खजूर','Sweet dates.','मीठे खजूर।',(select id from public.categories where name_en='Dried Fruits'),500,false),
('mixed-dry-fruits','Mixed Dry Fruits','मिक्स ड्राई फ्रूट्स','A tasty mix of dry fruits.','ड्राई फ्रूट्स का मिश्रण।',(select id from public.categories where name_en='Gift Packs'),1000,false)
on conflict(slug) do nothing;
insert into public.product_variants(product_id,grams,price,sort_order)
select p.id,v.grams,round(p.price_per_kg*v.grams/1000+case when v.grams=100 then 15 when v.grams=250 then 20 else 0 end,2),v.idx from public.products p cross join (values(100,1),(250,2),(500,3),(1000,4)) as v(grams,idx) on conflict(product_id,grams) do nothing;
-- Demo products intentionally use no external product images. Upload real shop photos through the owner dashboard.
