import z from "zod"

export const addProductSchema = z.object({
  productName: z.string().min(2),
  productType: z.enum([
    "Foods",
    "Electronics",
    "Fashion",
    "Books",
    "Beauty",
    "Home",
    "Sports",
    "Other",
  ]),
  quantityStock: z.coerce.number().min(0),
  mrp: z.coerce.number().min(0),
  sellingPrice: z.coerce.number().min(0),
  brandName: z.string().min(2),
  exchangeEligibility: z.boolean(),
  images: z.array(z.string()),
})

export const updateProductSchema = z.object({
  productName: z.string().min(2).optional(),
  productType: z.enum([
    "Foods",
    "Electronics",
    "Fashion",
    "Books",
    "Beauty",
    "Home",
    "Sports",
    "Other",
  ]).optional(),
  quantityStock: z.coerce.number().min(0).optional(),
  mrp: z.coerce.number().min(0).optional(),
  sellingPrice: z.coerce.number().min(0).optional(),
  brandName: z.string().min(2).optional(),
  exchangeEligibility: z.boolean().optional(),
  images: z.array(z.string()).optional(),
})
