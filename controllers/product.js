import { ApiError, asyncHandler } from "../lib/async-handler.js";
import { Product } from "../models/Product.js";
import { addProductSchema, updateProductSchema } from "../schemas/product-schema.js";

export const createNewProduct = asyncHandler(async (req, res, next) => {
  const data = addProductSchema.parse(req.body);

  const product = await Product.create({ ...data, ownerId: req.user.id });

  res.status(200).json(product.toJSON())

})


export const getAllProduct = asyncHandler(async (req, res, next) => {
  const filter = {
    ownerId: req.user.id,
  };

  if (req.query.filter == "published") {
    filter.isPublished = true;
  }

  if (req.query.filter == "unpublished") {
    filter.isPublished = false;
  }

  const products = await Product
    .find(filter)
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(products);
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    ownerId: req.user.id,
  });

  if (!product) {
    return next(
      new ApiError(
        404,
        false,
        "Product Not found!"
      )
    );
  }

  return res
    .status(200)
    .json(product);
});
export const updateProduct = asyncHandler(async (req, res, next) => {
  const data = updateProductSchema.parse(req.body);

  const product = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
      ownerId: req.user.id
    },
    data,
    {
      returnDocument: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(new ApiError(404, false, "Product Not found!"))
  }

  return res.status(200).json(product.toJSON())

})

export const changePublished =
  asyncHandler(
    async (
      req,
      res,
      next
    ) => {
      const {
        published,
      } = req.body;

      if (
        typeof published !==
        "boolean"
      ) {
        return next(
          new ApiError(
            400,
            false,
            "Published must be a boolean"
          )
        );
      }

      const product =
        await Product.findOneAndUpdate(
          {
            _id: req.params.id,
            ownerId:
              req.user.id,
          },
          {
            isPublished:
              published,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!product) {
        return next(
          new ApiError(
            404,
            false,
            "Product not found!"
          )
        );
      }

      return res
        .status(200)
        .json(product);
    }
  );

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    ownerId: req.user.id
  });

  if (!product) {
    return next(new ApiError(404, false, "Product Not found!"))
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
})
