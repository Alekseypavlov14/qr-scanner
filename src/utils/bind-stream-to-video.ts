export function bindStreamToVideo(stream: MediaStream | null, video: HTMLVideoElement) {
  video.srcObject = stream
  return video.play()
}
