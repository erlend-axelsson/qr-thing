export type HeadingLevel = 1|2|3|4|5|6
export function renderTitle(title: string, level: HeadingLevel = 1) {
  const titleElement = document.createElement(`h${level}`)
  titleElement.innerText = title
  titleElement.id = "title"
  return titleElement;
}