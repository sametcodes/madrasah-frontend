import { baseConfig } from '@madrasah/eslint-config/base'

const iconsConfig = [
  ...baseConfig,
  {
    rules: {
      'no-restricted-imports': 'off',
    },
  },
]

export default iconsConfig
