<template>
  <div>
    <main id="mainContent">

      <div class="container">
        <div class="row justify-content-center py-5">
          <h3>PCAChart</h3>
        </div>
      <div>
        <BaseCharComponent
        v-for="chartResource in chartResourcesAssets"
        :key="chartResource.id"
        :title="chartResource.title"
        :apiUrl="chartResource.apiUrl"
        />
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
    BaseWarningMessage
  },

  created() {
    this.chartResourcesAssets = [
      {
        title: "PCA",
        apiUrl: CONSTANTS.ENDPOINT.PCA,
        id: 0
      },
      {
        title: "MDS",
        apiUrl: CONSTANTS.ENDPOINT.MDS,
        id: 1
      },
      {
        title: "t-SNE",
        apiUrl: CONSTANTS.ENDPOINT.TSNE,
        id: 2
      }
    ]
  },

  data() {
    return {
      chartResourcesAssets: [
        {
          title: "",
          apiUrl: "",
          id:0
        }
      ],
      WarningMessageOpen: false,
      WarningMessageText: ""
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
</style>
