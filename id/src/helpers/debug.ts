import { widgetLogic } from 'logics/widgetLogic'

export const debug = (...args: Parameters<typeof console.log>) => {
  if (!widgetLogic.props.debug) {
    return
  }

  console.log(...args)
}
