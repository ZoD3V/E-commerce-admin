SELECT *
FROM "Category"
WHERE "storeId" = $1
ORDER BY "createdAt" DESC