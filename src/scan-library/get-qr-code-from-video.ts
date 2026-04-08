import { BrowserQRCodeReader } from '@zxing/browser'

const codeReader = new BrowserQRCodeReader()

export async function getQRCodeFromVideo(video: HTMLVideoElement): Promise<string | null> {
  try {
    // decode from the current video frame
    const result = await codeReader.decodeOnceFromVideoElement(video)
    return result.getText()
  } catch {
    return null
  }
}
