export type Category = {
id: number
title: string
prefix: string
img: string
}
export type Product = {
id: string | number
title: string
description?: string
price: number
image?: string
img?: string
category?: string
cat_prefix?: string
}
export type CartItem = { product: Product; qty: number }
export type User = { id: string; name: string; email: string; token: string }