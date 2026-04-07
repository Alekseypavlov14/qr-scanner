export type ToastType = 'success' | 'error' | 'info'

export const toastSuccess: ToastType = 'success'
export const toastError: ToastType = 'error'
export const toastInfo: ToastType = 'info'

export function Toast() {
  // DOM refs
  let container: HTMLDivElement

  function render() {
    return `<div class="toast-container"></div>`
  }

  function hydrate(root: HTMLElement) {
    container = root.querySelector('.toast-container')!
  }

  function show(message: string, type: ToastType = 'info', duration = 2000) {
    const toast = document.createElement('div')
    toast.className = `toast ${type}`
    toast.textContent = message

    container.appendChild(toast)

    requestAnimationFrame(() => {
      toast.classList.add('visible')
    })

    setTimeout(() => {
      toast.classList.remove('visible')
      setTimeout(() => toast.remove(), 200)
    }, duration)
  }

  // shorthands
  function success(message: string) {
    return show(message, toastSuccess)
  }
  function error(message: string) {
    return show(message, toastError)
  }
  function info(message: string) {
    return show(message, toastInfo)
  }

  return { render, hydrate, show, success, error, info }
}