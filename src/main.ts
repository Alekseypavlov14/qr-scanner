import { QRScannerWidget, type QRScannerModel } from "./qr-scanner/qr-scanner.component"
import { isCameraTemporaryDenied } from './camera/is-camera-temporary-denied'
import { PermissionButton } from './permission-button/permission-button.component'
import { ResultModal } from "./result-modal/result-modal.component"
import { playSound } from './sounds/play-sound'
import { Toast } from './toast/toast.component'
import "./style.css"

const scannerRoot = document.getElementById("qr-scanner")!
const modalRoot = document.getElementById("result-modal")!
const toastRoot = document.getElementById("toast")!
const permissionButtonRoot = document.getElementById("permission")!

// contains methods for scanning
let scannerModel: QRScannerModel

// init toasts
const toast = Toast()
toastRoot.innerHTML = toast.render()
toast.hydrate(toastRoot)

// init permission button
const permissionButton = PermissionButton({
  onClick: () => scannerModel.start()
})
permissionButtonRoot.innerHTML = permissionButton.render()
permissionButton.hydrate(permissionButtonRoot)

// init modal
const modal = ResultModal({
  onOpen: () => {
    toast.info("Redirecting...")
  },
  onCopy: () => {
    toast.info("Copied")
  }
})
modalRoot.innerHTML = modal.render()
modal.hydrate(modalRoot)

// init scanner
const scanner = QRScannerWidget({
  onResult: (data: string, model) => {
    playSound('/scan-sound.wav')
    modal.showResult(data)
    model.stop()
  },
  onError: (data) => {
    toast.error(data.message)

    isCameraTemporaryDenied().then(result => {
      if (result) permissionButton.showButton()
      else toast.error("Enable camera in settings")
    })
  }
})
scannerRoot.innerHTML = scanner.render()
scanner.hydrate(scannerRoot)
scannerModel = scanner.model
