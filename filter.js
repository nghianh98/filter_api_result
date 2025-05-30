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

function extractColorKeys(data) {
  if (!Array.isArray(data)) {
    console.error("Dữ liệu đầu vào không hợp lệ.")
    return []
  }

  const keys = []

  data.forEach((item) => {
    const contents = item.node?.translatableContent
    if (Array.isArray(contents)) {
      contents.forEach((entry) => {
        if (entry.value === "Size,Taille,Größe" && entry.key) {
          keys.push(entry.key)
        }
      })
    }
  })

  return keys
}

const keys = extractColorKeys(data)

try {
  fs.writeFileSync("output.json", JSON.stringify(keys, null, 2), "utf8")
  console.log("File output.json đã được tạo thành công!")
} catch (error) {
  console.error("Lỗi khi ghi file JSON:", error)
}
