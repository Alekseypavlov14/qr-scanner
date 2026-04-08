export interface PermissionButtonOptions {
  onClick?: () => void
}

export function PermissionButton(options: PermissionButtonOptions = {}) {
  let root: HTMLElement
  let button: HTMLButtonElement

  function render() {
    return `
      <button class="button permission-button hidden">
        Enable Camera
      </button>
    `
  }

  function hydrate(container: HTMLElement) {
    root = container
    button = root.querySelector('.permission-button')!

    button.addEventListener('click', () => {
      options.onClick?.()
    })
  }

  function showButton() {
    button.classList.remove('hidden')
  }

  function hideButton() {
    button.classList.add('hidden')
  }

  return {
    render,
    hydrate,
    showButton,
    hideButton,
  }
}
