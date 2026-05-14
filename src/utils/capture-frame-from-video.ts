export function captureFrameAsFile(video: HTMLVideoElement): Promise<File> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("No canvas context")

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Failed to capture frame"))

        const file = new File([blob], "qr.png", { type: "image/png" })
        resolve(file)
      }, "image/png")
    } catch (e) {
      reject(e)
    }
  })
}
