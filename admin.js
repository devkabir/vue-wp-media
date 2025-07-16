const { createApp, ref } = Vue;
const { WpMedia } = VueWpMedia;

const App = {
  template: `
  <WpMedia class="button button-primary" v-model="img" button-text="Choose Image" title="Select an Image" button-label="Use this image" /> 
  <pre>{{img}}</pre>
  <WpMedia class="button button-primary" v-model="csv" button-text="Choose csv" title="Select an csv" button-label="Use this csv" mediaType="text" />
  <pre>{{csv}}</pre>
  <WpMedia class="button button-primary" v-model="application" button-text="Choose application" title="Select an application" button-label="Use this application" mediaType="application" />
  <pre>{{application}}</pre>
  `,
  components: { WpMedia },
  setup() {
    const img = ref({});
    const csv = ref({});
    const application = ref({});
    return { img, csv, application };
  },
};

createApp(App).mount("#app");
