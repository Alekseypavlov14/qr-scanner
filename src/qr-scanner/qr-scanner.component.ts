import { getCameraVideoStream } from '../camera/get-camera-video-stream'
import { getQRCodeFromVideo } from '../scan-library/get-qr-code-from-video'
import { videoHasEnoughData } from '../utils/video-has-enough-data'
import { bindStreamToVideo } from '../utils/bind-stream-to-video'
import { stopStream } from '../utils/stop-stream'

export interface QRScannerModel {
  start: () => void
  stop: () => void
}

export interface QRScannerOptions {
  onResult?: (data: string, model: QRScannerModel) => void
  onError?: (error: Error, model: QRScannerModel) => void
}

// scans per second
const TPS = 5

export function QRScannerWidget(options: QRScannerOptions = {}) {
  // refs and state
  let video: HTMLVideoElement
  let stream: MediaStream | null = null
  let intervalId: number | null = null
  let running = false

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
      stream = await getCameraVideoStream()
      await bindStreamToVideo(stream, video)
      
      running = true
      intervalId = window.setInterval(scan, 1000 / TPS)
    } catch (error: any) {
      options.onError?.(error, model)
    }
  }

  function stop() {
    running = false

    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    if (stream) {
      stopStream(stream)
      stream = null
    }
  }

  async function scan() {
    if (!running || !videoHasEnoughData(video)) return

    const code = await getQRCodeFromVideo(video)
    if (!code) return

    stop()
    options.onResult?.(code, model)
  }

  return { render, hydrate, model, start, stop }
}
