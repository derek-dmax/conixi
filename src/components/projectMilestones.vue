<template>
  <div class="row">
    <div class="left col-5">
      <div class="dz-title">Tasks</div>
      <draggable v-model="leftItems" transition="100" class="drop-zone">
        <template v-slot:item="{ item }">
          <div class="draggable-item">
            {{
              item.id +
              ". " +
              item.text +
              (item.start_date ? " (" + item.start_date.format("Do MMM") + ")" : "")
            }}
            <span v-if="item.payment"><i class="ri-star-fill text-warning"></i></span>
            <div class="progress progress-sm">
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </template>
      </draggable>
      <pre>{{ JSON.stringify(leftItems, undefined, 4) }}</pre>
    </div>

    <div class="right col-7">
      <div class="dz-title">Payment Milestones</div>
      <draggable
        v-model="rightItems"
        transition="100"
        class="drop-zone"
        @change="recChanges = true"
      >
        <template v-slot:item="{ item }">
          <div
            class="draggable-item row"
            :class="{
              sowPaid: item.status === 'paid',
              sowDue: item.status === 'due',
            }"
          >
            <span class="col-5">
              {{ item.id + ". " + item.text }}
            </span>
            <span class="col-3">
              {{ item.start_date ? item.start_date.format("Do MMM") : "" }}</span
            >
            <span class="col-2">
              <span
                v-if="!item.changePayment"
                @click="
                  updProjectTask({
                    id: currId,
                    taskId: item.id,
                    updates: { changePayment: true },
                  })
                "
                style="cursor: pointer; text-align: right"
              >
                £{{ item.payment ? item.payment.toLocaleString("en-US") : "" }}
              </span>
              <input
                v-else
                style="
                  padding-top: 1px !important;
                  padding-bottom: 1px !important;
                  margin-top: -3px;
                  padding-left: 8px !important;
                  padding-right: 8px !important;
                  margin-left: -20px; min-width: 90px
                "
                type="number"
                class="form-control"
                id="{'changePayment_' + item.id}"
                placeholder="Pay Amt"
                @change="
                  recChanges = true;
                  updateProjectTask({
                    id: currId,
                    taskId: item.id,
                    updates: { payment: currPayment, changePayment: false },
                  });
                "
                v-model="currPayment"
              />
            </span>
            <span
              class="col-1"
              v-if="!item.changePayment"
              @click="
                updProjectTask({
                  id: currId,
                  taskId: item.id,
                  updates: { changePayment: true },
                })
              "
              style="cursor: pointer"
              ><i class="mdi mdi-square-edit-outline"></i
            ></span>
            <span
              class="col-1"
              v-else
              @click="
                updProjectTask({
                  id: currId,
                  taskId: item.id,
                  updates: { changePayment: false },
                })
              "
              style="cursor: pointer"
            >
              <i class="mdi mdi-close-box-outline"></i>
            </span>
            <span
              v-if="item.status === 'paid' && !item.changePayment"
              class="col-1 badge text-bg-success statusBadge"
              >PAID</span
            >
            <span
              class="col-1 badge text-bg-warning statusBadge"
              v-if="item.status === 'due'"
              >DUE</span
            >
          </div>
        </template>
      </draggable>

      <pre>{{ JSON.stringify(rightItems, undefined, 4) }}</pre>
    </div>
  </div>
</template>

<script setup>
import draggable from "vue3-draggable";
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
let projectList = computed(() => store.getters["projects/projectList"]);

/*/
    props
*/
const props = defineProps(["currId"]);
let currPayment = ref(null);

let selProject = projectList.value[props.currId];
const updateProjectTask = (payload) =>
  store.dispatch("projects/updateProjectTask", payload);
const leftItems = selProject.tasks.filter((task) => !task.payment);
let rightItems = selProject.tasks.filter((task) => task.payment);
const updProjectTask = (payload) => {
  if (payload.changePayment)
    currPayment = selProject.tasks.filter((task) => task.id == payload.taskId).payment;
  updateProjectTask(payload);
};
</script>

<style>
.statusBadge {
  font-size: 0.7rem;
  margin-top: -20px;
  max-height: 24px;
  max-width: 51px;
}
.dz-title {
  text-transform: uppercase;
  font-size: 0.7rem;
  margin-bottom: -12px;
  margin-left: 8px;
  padding: 0;
}
.draggable-item {
  display: flex;
  justify-content: left;
  background-color: rgb(241, 241, 241);
  box-shadow: 0px 2px 5px #aaa;
  margin: 1%;
  padding: 1%;
}
.sowPaid {
  background-color: rgb(209, 237, 209) !important;
}
.sowDue {
  background-color: rgb(237, 230, 209) !important;
}
.drop-zone {
  display: flex;
  flex-direction: column;
  border: 1px grey dashed;
  box-shadow: 0px 3px 5px #aaa;
  margin: 10px;
  padding: 10px;
  min-height: 600px;
}
pre {
  background-color: #eee;
  margin: 30px;
  padding: 10px;
  width: 400px;
  min-height: 200px;
}
</style>
