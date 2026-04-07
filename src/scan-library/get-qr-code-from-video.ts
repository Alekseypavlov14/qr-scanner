import jsQR from 'jsqr'

export function getQRCodeFromVideo(video: HTMLVideoElement) {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  ctx!.drawImage(video, 0, 0, canvas.width, canvas.height)

  const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)

  return jsQR(
    imageData.data,
    imageData.width,
    imageData.height
  )
}