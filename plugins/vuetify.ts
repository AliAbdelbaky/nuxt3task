// plugins/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";

import { ThemeDefinition, VuetifyOptions } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#c8a45d",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#000",
    surface: "#FFFFFF",
    primary: "#f00",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};
const theme = {
  defaultTheme: "light",
  themes: { light, dark },
};

const vuetifyOptions: VuetifyOptions = {
  ssr: true,
  components,
  directives,
  theme,
};

export default defineNuxtPlugin(({ vueApp, provide }) => {
  const vuetify = createVuetify(vuetifyOptions);

  vueApp.use(vuetify);
  provide("vuetify", vuetify);
});
