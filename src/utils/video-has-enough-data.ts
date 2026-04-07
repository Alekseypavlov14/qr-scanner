export function videoHasEnoughData(video: HTMLVideoElement) {
  return video.readyState === video.HAVE_ENOUGH_DATA
}
