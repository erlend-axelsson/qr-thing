export function renderButton(buttonText: string, clickHandler?: ((this: GlobalEventHandlers, ev: MouseEvent) => any)) {
  const button = document.createElement("button")
  button.id = "button"
  button.innerText = buttonText
  button.onclick = clickHandler ? clickHandler : null
  return button
}