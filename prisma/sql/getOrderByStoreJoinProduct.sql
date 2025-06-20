SELECT
    "Order".id,
    "Order"."storeId",
    "Order"."productId",
    "Order".amount,
    "Order".status,
    "Order".phone,
    "Order".transaction_code,
    "Order"."createdAt",
    "Order"."updatedAt",
    "Product".id,
    "Product".name AS product,
    "Product".price
FROM
    "Order"
JOIN
    "Product" ON "Order"."productId" = "Product".id
WHERE "Order"."storeId" = $1
