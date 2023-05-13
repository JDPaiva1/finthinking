import type { App } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string) => string;
  }
}

// plugins/i18n
export default {
  install: (app: App, options: any) => {
    // inject a globally available $t() method
    app.config.globalProperties.$t = (key: string) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i];
      }, options) ?? key;
    };
  }
};
