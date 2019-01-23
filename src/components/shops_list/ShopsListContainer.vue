<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="shop in shops" :key="shop._id">
      <Shops-component :shop="shop"></Shops-component>
    </div>
    <div class="section" v-if="shops.length === 0">
      <p>{{ noShopLabel }}</p>
    </div>
  </div>
</template>

<script>
import ShopsComponent from "../Shops";
import { mapState } from 'vuex';
export default {
  name: "Shops-list-component",

  components: {
    "Shops-component": ShopsComponent
  },
  computed: mapState(["shops"]),

  data() {
    return {
      error: "",
      text: "",
      id: "",
      noShopLabel: "No Shop found",
      ShopsFiltered: []
    };
  },
  mounted() {
    this.$store.dispatch("loadShops");
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
}
</style>
