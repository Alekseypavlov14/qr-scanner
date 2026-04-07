import { QRScannerWidget } from "./qr-scanner/qr-scanner.component"
import { ResultModal } from "./result-modal/result-modal.component"
import { Toast } from './toast/toast.component'
import "./style.css"

const scannerRoot = document.getElementById("qr-scanner")!
const modalRoot = document.getElementById("result-modal")!
const toastRoot = document.getElementById("toast")!

// init toasts
const toast = Toast()
toastRoot.innerHTML = toast.render()
toast.hydrate(toastRoot)

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
    modal.showResult(data)
    model.stop()
  },
  onError: (data) => {
    toast.error(data.message)
  }
})
scannerRoot.innerHTML = scanner.render()
scanner.hydrate(scannerRoot)
