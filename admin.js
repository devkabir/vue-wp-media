const { createApp, ref } = Vue
const { WpMedia } = VueWpMedia

const App = {
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 30px;">
        <h2>Vue WP Media - Theme Customizer</h2>
        <p>Use the customizer below to style the media button according to your theme:</p>
      </div>
      
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd;">
        <h2>Standard Examples</h2>
        
        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
          <div>
            <h3>Primary:</h3>
            <WpMedia 
              @select="onSelect" 
              button-text="Choose Image"
              title="Select an Image"
              button-label="Use this image"
            />
          </div>
          
          <div>
            <h3>Secondary:</h3>
            <WpMedia 
              @select="onSelect" 
              variant="secondary"
              button-text="Browse Media"
              width="150px"
            />
          </div>
          
          <div>
            <h3>Outline:</h3>
            <WpMedia 
              @select="onSelect" 
              variant="outline"
              button-text="Select File"
              media-type="application"
              title="Select a File"
              button-label="Use this file"
            />
          </div>
        </div>
        
        <div v-if="img" style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
          <h3>Selected Image:</h3>
          <img :src="img" style="max-width: 100%; height: auto; border-radius: 4px;" />
        </div>
      </div>
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