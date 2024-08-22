import path from 'path'
import fs from 'fs'

const file = () => {
  const read = <T>(relativeFilePath: string): T => {
    const filePath = path.resolve(process.cwd(), relativeFilePath)

    try {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data) as T
    } catch (error) {
      throw new Error(`Erro ao ler o arquivo ${filePath}: ${error.message}`)
    }
  }

  return {
    read
  }
}

export default file
