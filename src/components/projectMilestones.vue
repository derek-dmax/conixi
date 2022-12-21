<template>
  <div class="row">
    <div class="left col-5">
      <div class="dz-title col-2">Tasks</div>
      <draggable v-model="leftItems" transition="100" class="drop-zone">
        <template v-slot:item="{ item }">
          <div class="draggable-item">
            <div class="d-flex" id="centredsubmenu">
              <div class="flex-grow-1 tasks_name">
                {{
                  item.id +
                  ". " +
                  item.text +
                  (item.start_date ? " (" + item.start_date.format("Do MMM") + ")" : "")
                }}
              </div>
              <div class="flex-shrink-0 ms-4">
                <ul class="list-inline tasks-list-menu mb-0">
                  <li class="list-inline-item" title="View Task">
                    <router-link to="/apps/tasks-details"><i
                        class="ri-eye-fill align-bottom me-2 text-muted"></i></router-link>
                  </li>
                  <li class="list-inline-item" data-bs-toggle="modal" title="Edit Task" href="#showmodal"
                    @click="editdata(task)">
                    <a href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a>
                  </li>
                  <li class="list-inline-item" title="Delete Task">
                    <a class="remove-item-btn" @click="deletedata(task)">
                      <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <!-- <pre>{{ JSON.stringify(leftItems, undefined, 4) }}</pre> -->
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
              sowPaid: item.status === 'Paid',
              sowDue: item.status === 'Completed',
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
              v-if="item.status === 'Paid' && !item.changePayment"
              class="col-1 badge text-bg-success statusBadge"
              >PAID</span
            >
            <span
              class="col-1 badge text-bg-warning statusBadge"
              v-if="item.status === 'Completed'"
              >DUE</span
            >
          </div>
        </template>
      </draggable>
      <!-- <pre>{{ JSON.stringify(rightItems, undefined, 4) }}</pre> -->
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
.tasks-list-menu {
    opacity: 0;
}
.tasks-list-menu:hover {
    opacity: 1 !important;
}
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
div#centredsubmenu {
    clear:both;
    float:left;
    margin:0;
    padding:0;
    width:100%;
    z-index:10; /* This makes the dropdown menus appear above the page content below */
    position:relative;
 }
 </style>
