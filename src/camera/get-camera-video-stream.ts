export function getCameraVideoStream() {
  return navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  })
}
