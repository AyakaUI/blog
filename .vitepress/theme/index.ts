// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import Banner from "../components/Banner.vue";
import DeviceScreenshot from "../components/DeviceScreenshot.vue";

import VPArticle from "../components/VPArticle.vue";
import VPArticles from "../components/VPArticles.vue";
import InArticleAd from "../components/InArticleAd.vue";
import SideAd from "../components/SideAd.vue";

import DeviceCard from "../components/DeviceCard.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(InArticleAd),
      "aside-outline-after": () => h(SideAd),
    });
  },
  enhanceApp({ app }) {
    app.component("Banner", Banner);
    app.component("DeviceScreenshot", DeviceScreenshot);
    app.component("VPArticle", VPArticle);
    app.component("VPArticles", VPArticles);
    app.component("InArticleAd", InArticleAd);
    app.component("DeviceCard", DeviceCard);
  },
} satisfies Theme;

