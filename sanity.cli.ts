import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '76ahey7l',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'lt13hjsnr0rm9kh21w5g8njs',
  }
})
