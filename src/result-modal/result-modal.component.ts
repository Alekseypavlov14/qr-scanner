export interface ResultModalOptions {
  onOpen?: () => void
  onCopy?: () => void
  onContinue?: () => void
}

export function ResultModal(options: ResultModalOptions = {}) {
  // components
  let root: HTMLElement
  let background: HTMLDivElement
  let content: HTMLDivElement

  let messageElement: HTMLElement
  let openButton: HTMLButtonElement
  let copyButton: HTMLButtonElement

  // state
  let value = ""

  function render() {
    return `
      <div class="modal hidden">
        <div class="modal-background">
          <div class="modal-content">
            <div class="result-modal__message">
              <span class="result-modal__text"></span>
            </div>

            <div class="result-modal__actions">
              <button class="button primary result-modal__open">Open</button>
              <button class="button result-modal__copy">Copy</button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  function hydrate(container: HTMLElement) {
    root = container.querySelector(".modal")!
    background = container.querySelector(".modal-background")!
    content = container.querySelector(".modal-content")!

    messageElement = container.querySelector(".result-modal__text")!
    openButton = container.querySelector(".result-modal__open")!
    copyButton = container.querySelector(".result-modal__copy")!

    content.addEventListener('click', (e) => e.stopPropagation())
    background.addEventListener('click', () => {
      hideResult()
      options.onContinue?.()
    })

    openButton.addEventListener("click", () => {
      if (value.startsWith("http")) {
        window.open(value, "_blank")
        options.onOpen?.()
      }
    })

    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(value)
      options.onCopy?.()
    })
  }

  function showResult(text: string) {
    value = text
    root.classList.remove("hidden")
    messageElement.textContent = text
  }

  function hideResult() {
    root.classList.add("hidden")
  }

  return { render, hydrate, showResult, hideResult }
}