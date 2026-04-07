import { getCameraVideoStream } from '../camera/get-camera-video-stream'
import { getQRCodeFromVideo } from '../scan-library/get-qr-code-from-video'
import { bindStreamToVideo } from '../utils/bind-stream-to-video'
import { stopStream } from '../utils/stop-stream'
import { videoHasEnoughData } from '../utils/video-has-enough-data'

export interface QRScannerModel {
  start: () => void
  stop: () => void
}

export interface QRScannerOptions {
  onResult?: (data: string, model: QRScannerModel) => void
  onError?: (error: Error, model: QRScannerModel) => void
}

export function QRScannerWidget(options: QRScannerOptions = {}) {
  // browser api
  let video: HTMLVideoElement
  let stream: MediaStream | null = null

  // state
  let running = false

  // model 
  const model: QRScannerModel = { start, stop }

  function render() {
    return `
      <div class="qr-scanner">
        <video class="qr-scanner__video" autoplay playsinline></video>
      </div>
    `
  }

  function hydrate(root: HTMLElement) {
    video = root.querySelector(".qr-scanner__video")!
    start()
  }

  async function start() {
    try {
      // display the video from the camera on the screen
      stream = await getCameraVideoStream()
      await bindStreamToVideo(stream, video)

      running = true
      requestAnimationFrame(scan)
    } catch (error: any) {
      options.onError?.(error, model)
    }
  }

  function stop() {
    running = false

    if (stream) {
      // stop streaming from the camera
      stopStream(stream)
      stream = null
    }
  }

  function scan() {
    if (!running) return

    if (videoHasEnoughData(video)) {
      // get the code from the video frame
      const code = getQRCodeFromVideo(video)

      // if the qr code is parsed
      if (code?.data) {
        stop()
        return options.onResult?.(code.data, model)
      }
    }

    // recursively call self
    requestAnimationFrame(scan)
  }

  return { render, hydrate, start, stop }
}
