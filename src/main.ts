import jsQR from "jsqr";

const video = document.getElementById("video") as HTMLVideoElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });

  video.srcObject = stream;
  video.play();

  requestAnimationFrame(scan);
}

function scan() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const code = jsQR(
      imageData.data,
      imageData.width,
      imageData.height
    );

    if (code) {
      console.log("QR:", code.data);
      alert(code.data);
      return; // stop after first scan
    }
  }

  requestAnimationFrame(scan);
}

startCamera();