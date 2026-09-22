<script setup>
import { data as data } from "../blog.data.ts";

const latest = data[0];
</script>

<template>
  <div class="articles-page flex flex-col gap-8">
    <Hero
      v-if="latest"
      :src="latest.banner"
      :href="latest.url"
      title="Latest releases and blogs"
    />

    <div class="flex flex-col gap-4">
      <h1 class="!m-0 !border-0 !pt-0 text-3xl sm:text-4xl font-black">
        Recent blogs
      </h1>

      <div class="articles flex flex-col gap-4 justify-center">
        <div v-for="(article, index) in data" :key="index">
          <VPArticle
            :title="article.title"
            :description="article.description"
            :authors="article.authors"
            :tags="article.tags"
            :href="article.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>
