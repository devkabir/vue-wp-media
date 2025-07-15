import { createApp, ref } from 'vue'
import { WpMedia } from './dist/vue-wp-media.umd.js' // optional if library exports component

const App = {
    template: `
    <div>
      <WpMedia @select="onSelect" />
      <img v-if="img" :src="img" style="max-width: 300px; margin-top: 10px;" />
    </div>
  `,
    components: { WpMedia },
    setup() {
        const img = ref('')
        const onSelect = url => {
            img.value = url
        }
        return { img, onSelect }
    }
}

createApp(App).mount('#app')