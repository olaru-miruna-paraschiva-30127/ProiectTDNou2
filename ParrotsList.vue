<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Parrots List</h4>

      <table>
      <tr
       class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(parrot, index) in parrots"
                :key="index"
                @click="setActiveParrot(parrot, index)"
      >
      <td>{{ parrot.name }} </td>
      <td>{{ parrot.age }} </td>
       <td>{{ parrot.color }} </td>
        <td>{{ parrot.sold }} </td>
         <td>{{ parrot.datOfBringingToTheStore }} </td>
        <td>{{ parrot.areaOfOrigin }} </td>
        <td>{{ parrot.gender }} </td>
        <td>{{ parrot.sizeAtMaturity }} </td>
        <td>{{ parrot.specificFood }} </td>
        <td>{{ parrot.canImitateOtherAnimals }} </td>

        <td> <button class="badge badge-danger mr-2" @click="deleteParrot">
                   Delete
                 </button> </td>
                 <td>

                 <router-link

                                to="'/parrots/' + currentParrot.id"

                               class="badge badge-warning"
                               >Edit</router-link
                             >



                             </td>
      </tr>
      </table>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllParrots">
        Remove All
      </button>
    </div>
    <div class="col-md-6">

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParrotDataService from "@/services/ParrotDataService";
import Parrot from "@/types/Parrot";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "parrots-list",
  data() {
    return {
      parrots: [] as Parrot[],
      currentParrot: {} as Parrot,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveParrots() {
      ParrotDataService.getAll()
        .then((response: ResponseData) => {
          this.parrots = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveParrots();
      this.currentParrot = {} as Parrot;
      this.currentIndex = -1;
    },

    setActiveParrot(parrot: Parrot, index = -1) {
      this.currentParrot = parrot;
      this.currentIndex = index;
    },

    removeAllParrots() {
      ParrotDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      ParrotDataService.findByName(this.name)
        .then((response: ResponseData) => {
          this.parrots = response.data;
          this.setActiveParrot({} as Parrot);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    deleteParrot() {
          ParrotDataService.delete(this.currentParrot.id)
            .then((response: ResponseData) => {
              console.log(response.data);
              this.$router.push({ name: "parrots" });
              this.refreshList();
            })
            .catch((e: Error) => {
              console.log(e);
            });
        },


  },
  mounted() {
    this.retrieveParrots();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
