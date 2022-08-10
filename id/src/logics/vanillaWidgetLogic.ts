import { actions, kea, path, reducers } from 'kea'
import { AppProps } from 'types'
import type { vanillaWidgetLogicType } from './vanillaWidgetLogicType'

// This logic is used only to store and pass down the props when running the widget on vanilla JS.
export const vanillaWidgetLogic = kea<vanillaWidgetLogicType>([
  path(['logic', 'vanillaWidgetLogic']),
  actions({
    updateParams: (paramsToUpdate: Partial<AppProps>) => ({ paramsToUpdate }),
  }),
  reducers({
    params: [
      {} as AppProps,
      {
        updateParams: (state, { paramsToUpdate }) => ({ ...state, ...paramsToUpdate }),
      },
    ],
  }),
])
