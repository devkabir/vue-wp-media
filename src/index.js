import WpMedia from './WpMedia.vue'

const plugin = {
    install(app) {
        app.component('wp-media', WpMedia)
        app.component('WpMedia', WpMedia)
    }
}

export default plugin
export { WpMedia }