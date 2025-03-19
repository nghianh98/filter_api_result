const fs = require("fs")

// Đọc dữ liệu từ file JSON
let rawData
try {
  rawData = fs.readFileSync("data.json", "utf8")
} catch (error) {
  console.error("Lỗi khi đọc file data.json:", error)
  process.exit(1)
}

const data = JSON.parse(rawData)

function getResourceIdsWithFilter(data) {
  if (!Array.isArray(data)) {
    console.error("Dữ liệu đầu vào không hợp lệ.")
    return []
  }

  return data
    .filter(
      (item) => item.node?.translations?.some((t) => t.value === "Argent") // Kiểm tra value "Or" trong translations
      // (item) => item.node?.translations?.some((t) => t.value) // Kiểm tra nếu có bất kỳ value nào
    )
    .map((item) => ({ resourceId: item.node.resourceId }))
}

function exportToCSV(data) {
  const filteredData = getResourceIdsWithFilter(data)
  if (filteredData.length === 0) {
    console.log("Không có sản phẩm nào thỏa mãn điều kiện.")
    return
  }

  // Chuẩn bị nội dung CSV với tiêu đề cột
  const csvContent = [
    "resourceId",
    ...filteredData.map(({ resourceId }) => `"${resourceId}"`),
  ].join("\n")

  try {
    fs.writeFileSync("output.csv", csvContent, "utf8")
    console.log("File output.csv đã được tạo thành công!")
  } catch (error) {
    console.error("Lỗi khi ghi file CSV:", error)
  }
}

exportToCSV(data)
