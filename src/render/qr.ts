import {MeCardStruct} from "../models/types";
import {formatAsMeCardString} from "../models";

import {renderSVG} from 'uqr'

export function renderMeCard(meCard: MeCardStruct) {
  const data = formatAsMeCardString(meCard)
  return wrapInHtml(renderSVG(data))
}

export function updateSvgElement(svg: HTMLElement, meCard: MeCardStruct) {
  const data = renderSVG(formatAsMeCardString(meCard))
  svg.innerHTML = data
}

function wrapInHtml(input: string) {
  const svg = document.createElement("svg")
  svg.innerHTML = input
  return svg
}