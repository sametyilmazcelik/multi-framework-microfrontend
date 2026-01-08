import { defineCustomElement } from 'vue';
import AboutComponent from './AboutComponent.ce.vue';

const AboutElement = defineCustomElement(AboutComponent);
customElements.define('mf-vue-about', AboutElement);


