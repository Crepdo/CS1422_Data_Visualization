<template>
  <div>
    <main id="mainContent">
      <div class="container">
        <div class="row justify-content-center py-5">
          <h3>HW2 Dimensionality Reduction </h3>
          <div class="row justify-content-center py-5">
            <BaseCharComponent
              v-for="chartResource in chartResourcesAssets"
              :key="chartResource.id"
              :title="chartResource.title"
              :apiUrl="chartResource.apiUrl"
              :highlight="highlight"
            />
          </div>
          <label for="exampleFormControlSelect1"
            >High light number : </label
          >
          <div>
            <select v-model.number="highlight">
              <option>All</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
          </div>
        </div>
      </div>
    </main>
    <BaseWarningMessage
      v-if="WarningMessageOpen"
      :text="WarningMessageText"
      @onWarningClose="handleWarningClose"
    />
  </div>
</template>

<script>
import CONSTANTS from "@/constants";
import BaseCharComponent from "@/components/BaseCharComponent";
import BaseWarningMessage from "@/components/BaseWarningMessage";

export default {
  name: "Chart",

  components: {
    BaseCharComponent,
    BaseWarningMessage,
  },

  created() {
    this.chartResourcesAssets = [
      {
        title: "PCA",
        apiUrl: CONSTANTS.ENDPOINT.PCA,
        id: 0,
      },
      {
        title: "MDS",
        apiUrl: CONSTANTS.ENDPOINT.MDS,
        id: 1,
      },
      {
        title: "t-SNE",
        apiUrl: CONSTANTS.ENDPOINT.TSNE,
        id: 2,
      },
    ];
    this.highlight = -1;
  },

  data() {
    return {
      chartResourcesAssets: [
        {
          title: "",
          apiUrl: "",
          id: 0,
        },
      ],
      highlight: -1,
      WarningMessageOpen: false,
      WarningMessageText: "",
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #cecece;
  padding-top: 7rem;
  padding-bottom: 7rem;
}

.container {
  max-width: 100%;
}
</style>
