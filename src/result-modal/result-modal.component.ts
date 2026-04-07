export interface ResultModalOptions {
  onOpen?: () => void
  onCopy?: () => void
}

export function ResultModal(options: ResultModalOptions = {}) {
  // components
  let root: HTMLElement
  let messageEl: HTMLElement
  let openBtn: HTMLButtonElement
  let copyBtn: HTMLButtonElement

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
    messageEl = container.querySelector(".result-modal__text")!
    openBtn = container.querySelector(".result-modal__open")!
    copyBtn = container.querySelector(".result-modal__copy")!

    openBtn.addEventListener("click", () => {
      if (value.startsWith("http")) {
        window.open(value, "_blank")
        options.onOpen?.()
      }
    })

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(value)
      options.onCopy?.()
    })

    document.addEventListener("click", (e) => {
      if (!e.target) return hideResult()
      if (!root.contains(e.target as Node)) hideResult()
    })
  }

  function showResult(text: string) {
    value = text
    messageEl.textContent = text
    root.classList.remove("hidden")
  }

  function hideResult() {
    root.classList.add("hidden")
  }

  return { render, hydrate, showResult, hideResult }
}