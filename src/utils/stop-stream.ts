export function stopStream(stream: MediaStream) {
  return stream.getTracks().forEach(t => t.stop())
}
