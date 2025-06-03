SELECT
    "Category".id,
    "Category"."name",
    "Category"."storeId",
    "Category"."bannerId",
    "Category"."createdAt",
    "Category"."updatedAt",
    "Banner".id AS banner_id,
    "Banner"."imgUrl",
    "Banner".label
FROM
    "Category"
JOIN
    "Banner" ON "Category"."bannerId" = "Banner"."id"
WHERE
    "Category"."storeId" = $1
