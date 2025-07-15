const { createApp, ref } = Vue;
const { WpMedia } = VueWpMedia;

const App = {
  template: `
  <WpMedia class="button button-primary" v-model="img" button-text="Choose Image" title="Select an Image" button-label="Use this image" /> 
  <pre>{{img}}</pre>
  <WpMedia class="button button-primary" v-model="file" button-text="Choose File" title="Select an File" button-label="Use this file" mediaType="file" /> 
  <pre>{{file}}</pre>
  `,
  components: { WpMedia },
  setup() {
    const img = ref({});
    const file = ref({});
    return { img, file };
  },
};

createApp(App).mount("#app");
