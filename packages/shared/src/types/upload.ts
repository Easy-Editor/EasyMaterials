/** UploadSetter 上传类型 */
export interface UploadValue {
  raw: {
    name: string
    size: number
    type: string
    width: number
    height: number
  }
  base64: string
}
