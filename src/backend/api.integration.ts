import { SCAN_QR_CODE_BACKEND_URL } from '../constants'

export interface ScanQRCodeResponse {
  message: string 
  success: boolean
}

export async function scanQRCodeAPIIntegration(image: File): Promise<string> {
  const formData = new FormData()
  formData.append("qr", image)

  const res = await fetch(SCAN_QR_CODE_BACKEND_URL, {
    method: "POST",
    body: formData
  })

  if (!res.ok) throw Error("Request failed")

  const data = await res.json() as ScanQRCodeResponse

  if (data.success === false) {
    throw new Error(data?.message || "Scan failed")
  }

  return data.message as string
}