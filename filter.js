const fs = require("fs")
const rawData = fs.readFileSync("data.json", "utf8")
const data = JSON.parse(rawData)
function getResourceIdsWithFilter(data) {
  if (!Array.isArray(data)) {
    console.error("Dữ liệu đầu vào không hợp lệ.")
    return []
  }
  return data
    .filter(
      (item) =>
        item.node?.translatableContent?.some((content) => content.value === "Color") &&
        item.node?.translations &&
        item.node.translations.length > 0
    )
    .map((item) => ({
      resourceId: item.node.resourceId,
      translations: item.node.translations.map((t) => t.value).join(", "), // Ghép các giá trị translation
    }))
}
function exportToCSV(data) {
  const filteredData = getResourceIdsWithFilter(data)
  if (filteredData.length === 0) {
    console.log("Không có sản phẩm nào thỏa mãn điều kiện.")
    return
  }

  // Chuẩn bị nội dung CSV với tiêu đề cột
  const csvContent = [
    "resourceId,translations",
    ...filteredData.map(({ resourceId, translations }) => `"${resourceId}","${translations}"`),
  ].join("\n")

  try {
    fs.writeFileSync("output.csv", csvContent, "utf8")
    console.log("File output.csv đã được tạo thành công!")
  } catch (error) {
    console.error("Lỗi khi ghi file CSV:", error)
  }
}
exportToCSV(data)
