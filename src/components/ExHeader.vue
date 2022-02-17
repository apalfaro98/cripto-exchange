<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <ex-icon class="mr-2" />
          <router-link to="/" class="font-semibold text-xl tracking-tight"
            >Crypto Exchange</router-link
          >
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow">
            <router-link
              v-for="link in links"
              :key="link.title"
              class="block mt-4 sm:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
              :to="link.to"
              >{{ link.title }}</router-link
            >
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import ExIcon from "./ExIcon";

export default {
  name: "ExHeader",
  components: { ExIcon },
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
