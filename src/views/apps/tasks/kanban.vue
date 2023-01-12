  import Multiselect from "@vueform/multiselect";
<script>
import { VueDraggableNext } from "vue-draggable-next";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapGetters, mapActions } from "vuex"

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import moment from "moment";

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/gsqxdxog.json";
import "flatpickr/dist/flatpickr.css";

export default {
  page: {
    title: "Task Status",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Task Status",
      items: [
        {
          text: "Tasks",
          href: "/",
        },
        {
          text: "Task Status",
          active: true,
        },
      ],
      pages: [],
      page: null,
      filtersearchQuery1: null,
      filtervalue1: null,
      filterdate1: new Date(),
      rangeDateconfig: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: "M j, Y",
          altInput: true,
          dateFormat: "d M, Y",
          mode: "range",
        },
      showTable: false,
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },
      date: null,
      date1: null,
      defaultOptions: { animationData: animationData },
      allTask: [],
      resultQuery: [],
      allTasks: [],
      projectKeys: [],
      unassigned: [
        {
          title: "Design New Landing Page",
          description:
            "The dashboard is the front page of the Administration UI.",
          features: ["Layout", "Admin", "Dashboard"],
          users: [
            require("@/assets/images/users/avatar-7.jpg"),
            require("@/assets/images/users/avatar-6.jpg"),
            require("@/assets/images/users/avatar-1.jpg"),
          ],
          id: "#VL2436",
          watch: "04",
          message: "19",
          file: "2",
          date: " 07 Jan, 2022",
        },
      ],
      todo: [],
      inprogress: [],
      completed: [],
      approved: [],
      paid: [],
      enabled: true,

      dragging: false,
    };
  },
  methods: {
    log(event) {
      console.log(event);
    },
    ...mapActions("projects", ["updateProject", "deleteProject"]),
    changeProgress(task, increment) {
      console.log(task, increment)
      if(task.progress + increment > -1 && task.progress + increment < 101) task.progress += increment
    }
  },
  created() {
    this.userType = localStorage.getItem("userType");
    this.userName = localStorage.getItem("userName");
    this.userOrg = localStorage.getItem("userOrg");
    this.userTitle = localStorage.getItem("userTitle");
    this.resultQuery = this.allTask
    this.projectKeys = Object.keys(this.projectList);
    this.projectKeys.forEach((key) => {
      let tasks = []
      if (this.userType === "supplier") {
        if (this.projectList[key].suppliers[0].name !== this.userOrg) {
          this.deleteProject(key);
          this.projectKeys = Object.keys(this.projectList);
        }
      }
      if (this.projectList[key]) {
        tasks = JSON.parse(JSON.stringify(this.projectList[key].tasks.data))
        tasks.forEach(task => {
          task.project = this.projectList[key].label
          task.dueDate = moment(task.start_date).add(task.duration, "days").format('Do MMM')
        })
        this.allTasks = [...this.allTasks, ...tasks]
      }
    })
    this.todo = this.allTasks.filter(task => task.status == "New" && task.type !== "project")
    this.inprogress = this.allTasks.filter(task => task.status == "In Progress" && task.type !== "project")
    this.completed = this.allTasks.filter(task => task.status == "Completed" && task.type !== "project")
    this.approved = this.allTasks.filter(task => task.status == "Approved" && task.type !== "project")
    this.paid = this.allTasks.filter(task => task.status == "Paid")
    console.log(this.todo)
  },
  components: {
    Layout,
    PageHeader,
    draggable: VueDraggableNext,
    lottie: Lottie,
    Multiselect,
    flatPickr,
  },
  computed: {
    ...mapGetters("projects", ["projectList"]),
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row" style="position: relative; top:-66px;" @click="showTable = !showTable">
      <i class="ri-list-check" v-if="!showTable" title="Show tasks as table"></i>
      <i class="ri-layout-grid-fill" v-else title="Show tasks as board"></i>
    </div>

    <div class="tasks-board mb-3" id="kanbanboard" style="margin-top:-20px;" v-if="!showTable">
      <div class="tasks-list my-0">
        <div class="d-flex mb-0">
          <div class="flex-grow-1">
            <h6 class="fs-14 text-uppercase fw-semibold mb-0">
              To Do
              <small class="badge bg-primary align-bottom ms-1">{{todo.length}}</small>
            </h6>
          </div>
          <div class="flex-shrink-0">
            <div class="dropdown card-header-dropdown">
              <a
                class="text-reset dropdown-btn"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="fw-medium text-muted fs-12"
                  >Priority<i class="mdi mdi-chevron-down ms-1"></i
                ></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="#">Priority</a>
                <a class="dropdown-item" href="#">Date Added</a>
              </div>
            </div>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3" style="min-height:500px;">
          <div id="todo-task" class="tasks">
            <draggable :list="todo" class="dragArea" group="dragData" style="min-height:400px">
              <div
                class="card tasks-box my-2"
                v-for="(data, index) of todo"
                :key="index"
              >
                <div class="card-body pb-1">
                  <div class="d-flex mb-0">
                    <h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                      <router-link to="/apps/tasks-details">{{
                        data.text
                      }}</router-link>
                    </h6>
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="text-muted"
                        id="dropdownMenuLink1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="ri-more-fill"></i
                      ></a>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <router-link
                            class="dropdown-item"
                            to="/apps/tasks-details"
                            ><i
                              class="ri-eye-fill align-bottom me-2 text-muted"
                            ></i>
                            View</router-link
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            ><i
                              class="
                                ri-edit-2-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            href="#deleteRecordModal"
                            ><i
                              class="
                                ri-delete-bin-5-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!--end card-body-->
              </div>
              <!--end card-->
            </draggable>
          </div>
        </div>
      </div>
      <!--end tasks-list-->
      <div class="tasks-list my-0">
        <div class="d-flex mb-0">
          <div class="flex-grow-1">
            <h6 class="fs-14 text-uppercase fw-semibold mb-0">
              In Progress
              <small class="badge bg-warning align-bottom ms-1">{{inprogress.length}}</small>
            </h6>
          </div>
          <div class="flex-shrink-0">
            <div class="dropdown card-header-dropdown">
              <a
                class="text-reset dropdown-btn"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="fw-medium text-muted fs-12"
                  >Priority<i class="mdi mdi-chevron-down ms-1"></i
                ></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="#">Priority</a>
                <a class="dropdown-item" href="#">Date Added</a>
              </div>
            </div>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3">
          <div id="inprogress-task" class="tasks">
            <draggable :list="inprogress" class="dragArea" group="dragData" style="min-height:90px">
              <div
                class="card tasks-box my-2"
                v-for="(data, index) of inprogress"
                :key="index"
              >
                <div class="card-body pb-1">
                  <div class="d-flex mb-0">
                    <h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                      <router-link to="/apps/tasks-details">{{
                        data.text
                      }}</router-link>
                    </h6>
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="text-muted"
                        id="dropdownMenuLink1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="ri-more-fill"></i
                      ></a>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <router-link
                            class="dropdown-item"
                            to="/apps/tasks-details"
                            ><i
                              class="ri-eye-fill align-bottom me-2 text-muted"
                            ></i>
                            View</router-link
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            ><i
                              class="
                                ri-edit-2-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            href="#deleteRecordModal"
                            ><i
                              class="
                                ri-delete-bin-5-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="mb-0">
                    <div class="d-flex mb-0">
                      <div class="flex-grow-1">
                        <h6 class="text-muted mb-0">
                          <span class="text-secondary">{{ data.progress }}%</span>
                        </h6>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-muted">{{ data.dueDate }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-1"><i class="ri-indeterminate-circle-line" @click="changeProgress(data, -5)"></i></div>
                      <div class="col-9">
                        <div class="progress rounded-3 progress-sm mt-2" style="margin-right:-15px">
                          <div
                            class="progress-bar bg-danger"
                            role="progressbar"
                            :style="{ width: data.progress + '%' }"
                            aria-valuenow="15"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div class="col-1"><i class="ri-add-circle-line" @click="changeProgress(data, 5)"></i></div>
                    </div>
                  </div>
                </div>
                <!--end card-body-->
              </div>
              <!--end card-->
            </draggable>
          </div>
        </div>
      </div>
      <!--end tasks-list-->
      <div class="tasks-list my-0">
        <div class="d-flex mb-0">
          <div class="flex-grow-1">
            <h6 class="fs-14 text-uppercase fw-semibold mb-0">
              Complete
              <small class="badge bg-info align-bottom ms-1">{{completed.length}}</small>
            </h6>
          </div>
          <div class="flex-shrink-0">
            <div class="dropdown card-header-dropdown">
              <a
                class="text-reset dropdown-btn"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="fw-medium text-muted fs-12"
                  >Priority<i class="mdi mdi-chevron-down ms-1"></i
                ></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="#">Priority</a>
                <a class="dropdown-item" href="#">Date Added</a>
              </div>
            </div>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3">
          <div id="completed-task" class="tasks">
            <draggable :list="completed" class="dragArea" group="dragData" style="min-height:90px">
              <div
                class="card tasks-box my-2"
                v-for="(data, index) of completed"
                :key="index"
              >
                <div class="card-body pb-1">
                  <div class="d-flex mb-0">
                    <h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                      <router-link to="/apps/tasks-details">{{
                        data.text
                      }}</router-link>
                    </h6>
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="text-muted"
                        id="dropdownMenuLink1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="ri-more-fill"></i
                      ></a>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <router-link
                            class="dropdown-item"
                            to="/apps/tasks-details"
                            ><i
                              class="ri-eye-fill align-bottom me-2 text-muted"
                            ></i>
                            View</router-link
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            ><i
                              class="
                                ri-edit-2-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            href="#deleteRecordModal"
                            ><i
                              class="
                                ri-delete-bin-5-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="mb-0">
                    <div class="d-flex mb-0">
                      <div class="flex-grow-1">
                        <h6 class="text-muted mb-0">
                          <span class="text-secondary">100%</span>
                        </h6>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-muted">{{ data.dueDate }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end card-body-->
              </div>
              <!--end card-->
            </draggable>
          </div>
        </div>
      </div>
      <!--end tasks-list-->
      <div class="tasks-list">
        <div class="d-flex mb-0">
          <div class="flex-grow-1">
            <h6 class="fs-14 text-uppercase fw-semibold mb-0">
              Approved <small class="badge bg-success align-bottom ms-1">1</small>
            </h6>
          </div>
          <div class="flex-shrink-0">
            <div class="dropdown card-header-dropdown">
              <a
                class="text-reset dropdown-btn"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="fw-medium text-muted fs-12"
                  >Priority<i class="mdi mdi-chevron-down ms-1"></i
                ></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="#">Priority</a>
                <a class="dropdown-item" href="#">Date Added</a>
              </div>
            </div>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3">
          <div id="completed-task" class="tasks">
            <draggable :list="approved">
              <div
                class="card tasks-box my-2"
                v-for="(data, index) of approved"
                :key="index"
              >
                <div class="card-body pb-1">
                  <div class="d-flex mb-0">
                    <h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                      <router-link to="/apps/tasks-details">{{
                        data.text
                      }}</router-link>
                    </h6>
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="text-muted"
                        id="dropdownMenuLink1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="ri-more-fill"></i
                      ></a>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <router-link
                            class="dropdown-item"
                            to="/apps/tasks-details"
                            ><i
                              class="ri-eye-fill align-bottom me-2 text-muted"
                            ></i>
                            View</router-link
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            ><i
                              class="
                                ri-edit-2-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            href="#deleteRecordModal"
                            ><i
                              class="
                                ri-delete-bin-5-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="mb-0">
                    <div class="d-flex mb-0">
                      <div class="flex-grow-1">
                        <h6 class="text-muted mb-0">
                          <span class="text-secondary">100%</span>
                        </h6>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-muted">{{ data.dueDate }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end card-body-->
              </div>
              <!--end card-->
            </draggable>
          </div>
        </div>
      </div>
      <!--end tasks-list-->
      <div class="tasks-list">
        <div class="d-flex mb-0">
          <div class="flex-grow-1">
            <h6 class="fs-14 text-uppercase fw-semibold mb-0">
              Paid <small class="badge bg-success align-bottom ms-1">1</small>
            </h6>
          </div>
          <div class="flex-shrink-0">
            <div class="dropdown card-header-dropdown">
              <a
                class="text-reset dropdown-btn"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="fw-medium text-muted fs-12"
                  >Priority<i class="mdi mdi-chevron-down ms-1"></i
                ></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="#">Priority</a>
                <a class="dropdown-item" href="#">Date Added</a>
              </div>
            </div>
          </div>
        </div>
        <div data-simplebar class="tasks-wrapper px-3 mx-n3">
          <div id="completed-task" class="tasks">
            <draggable :list="paid">
              <div
                class="card tasks-box my-2"
                v-for="(data, index) of paid"
                :key="index"
              >
                <div class="card-body pb-1">
                  <div class="d-flex mb-0">
                    <h6 class="fs-15 mb-0 flex-grow-1 text-truncate">
                      <router-link to="/apps/tasks-details">{{
                        data.text
                      }}</router-link>
                    </h6>
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="text-muted"
                        id="dropdownMenuLink1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="ri-more-fill"></i
                      ></a>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <router-link
                            class="dropdown-item"
                            to="/apps/tasks-details"
                            ><i
                              class="ri-eye-fill align-bottom me-2 text-muted"
                            ></i>
                            View</router-link
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            ><i
                              class="
                                ri-edit-2-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            href="#deleteRecordModal"
                            ><i
                              class="
                                ri-delete-bin-5-line
                                align-bottom
                                me-2
                                text-muted
                              "
                            ></i>
                            Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="mb-0">
                    <div class="d-flex mb-0">
                      <div class="flex-grow-1">
                        <h6 class="text-muted mb-0">
                          <span class="text-secondary">100%</span>
                        </h6>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-muted">{{ data.dueDate }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end card-body-->
              </div>
              <!--end card-->
            </draggable>
          </div>
        </div>
      </div>
      <!--end tasks-list-->
    </div>
    <!--end task-board-->

    <div class="card" id="tasksList" v-else>
      <div class="card-body border border-dashed border-end-0 border-start-0">
        <form>
          <div class="row g-3">
            <div class="col-xxl-5 col-sm-12">
              <div class="search-box">
                <input type="text" class="form-control search bg-light border-light"
                  placeholder="Search for tasks..." v-model="filtersearchQuery1"/>
                <i class="ri-search-line search-icon"></i>
              </div>
            </div>
            <!--end col-->

            <div class="col-xxl-3 col-sm-4">
              <flat-pickr v-model="filterdate1" placeholder="Select date" :config="rangeDateconfig"
                      class="form-control"></flat-pickr>
            </div>
            <!--end col-->

            <div class="col-xxl-3 col-sm-4">
              <div class="input-light">
                <Multiselect v-model="filtervalue1" :close-on-select="true" :searchable="true" :create-option="true"
                  :options="[
                    { value: 'All', label: 'All' },
                    { value: 'New', label: 'New' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Inprogress', label: 'Inprogress' },
                    { value: 'Completed', label: 'Completed' },
                  ]" />
              </div>
            </div>
            <!--end col-->
            <div class="col-xxl-1 col-sm-4">
              <button type="button" class="btn btn-primary w-100" @click="SearchData">
                <i class="ri-equalizer-fill me-1 align-bottom"></i>
                Filters
              </button>
            </div>
            <!--end col-->
          </div>
          <!--end row-->
        </form>
      </div>
      <!--end card-body-->
      <div class="card-body">
        <div class="table-responsive table-card mb-4">
          <table class="table align-middle table-nowrap mb-0" id="tasksTable">
            <thead class="table-light text-muted">
              <tr>
                <th scope="col" style="width: 40px">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkAll" value="option" />
                  </div>
                </th>
                <th class="sort" data-sort="id">ID</th>
                <th class="sort" data-sort="project_name">Project</th>
                <th class="sort" data-sort="tasks_name">Task</th>
                <th class="sort" data-sort="client_name">Payment</th>
                <th class="sort" data-sort="assignedto">Assigned To</th>
                <th class="sort" data-sort="due_date">Due Date</th>
                <th class="sort" data-sort="status">Status</th>
                <th class="sort" data-sort="priority">Priority</th>
              </tr>
            </thead>
            <tbody class="list form-check-all">
              <tr v-for="(task, index) of allTasks" :key="index">
                <th scope="row">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="chk_child" value="option1" />
                  </div>
                </th>
                <td class="id">
                  <router-link to="/apps/tasks-details" class="fw-medium link-primary">{{ task.id }}
                  </router-link>
                </td>
                <td class="project_name">
                  <router-link to="/apps/projects-overview" class="fw-medium link-primary">{{ projectList["FAB0d41d5b5d22c"].label }}
                  </router-link>
                </td>
                <td>
                  <div class="d-flex">
                    <div class="flex-grow-1 tasks_name">
                      {{ task.text }}
                    </div>
                    <div class="flex-shrink-0 ms-4">
                      <ul class="list-inline tasks-list-menu mb-0">
                        <li class="list-inline-item">
                          <router-link to="/apps/tasks-details"><i
                              class="ri-eye-fill align-bottom me-2 text-muted"></i></router-link>
                        </li>
                        <li class="list-inline-item" data-bs-toggle="modal" href="#showmodal"
                          @click="editdata(task)">
                          <a href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a>
                        </li>
                        <li class="list-inline-item">
                          <a class="remove-item-btn" @click="deletedata(task)">
                            <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td class="client_name"><span v-if="task.payment">£{{ task.payment }}</span></td>
                <td class="assignedto">
                  <div class="avatar-group">
                    <a href="javascript: void(0);" v-for="(task, index) of task.subItem" :key="index"
                      class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"
                      data-bs-placement="top" title="Frank">
                      <img :src="task.image_src" alt="" class="rounded-circle avatar-xxs" />
                    </a>
                  </div>
                </td>
                <td class="due_date">{{ task.dueDate }}</td>
                <td class="status">
                  <span class="badge" :class="{
                      'badge-soft-secondary':task.status=='In Progress',
                      'badge-soft-info':task.status=='New',
                      'badge-soft-success':task.status=='Completed',
                      'badge-soft-success':task.status=='Paid',
                      'badge-soft-warning':task.status=='Pending',
                    }">{{
                    task.status
                  }}</span>
                </td>
                <td class="priority">
                  <span class="badge text-uppercase" :class="{
                      'bg-danger':task.priority=='High',
                      'bg-success':task.priority=='Low',
                      'bg-warning':task.priority=='Medium',
                    }">{{ task.priority }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <!--end table-->
          <div class="noresult" style="display: none">
            <div class="text-center">
              <lottie colors="primary:#121331,secondary:#08a88a" :options="defaultOptions" :height="75"
                :width="75" />
              <h5 class="mt-2">Sorry! No Result Found</h5>
              <p class="text-muted mb-0">
                We've searched more than 200k+ tasks We did not find any
                tasks for you search.
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <div class="pagination-wrap hstack gap-2">
            <a class="page-item pagination-prev disabled" href="#" v-if="page != 1" @click="page--">
              Previous
            </a>
            <ul class="pagination listjs-pagination mb-0">
              <li :class="{
                  active: pageNumber == page,
                  disabled: pageNumber == '...',
                }" v-for="(pageNumber, index) in pages.slice(
                  page - 1,
                  page + 5
                )" :key="index" @click="page = pageNumber">
                <a class="page" href="#">{{ pageNumber }}</a>
              </li>
            </ul>
            <a class="page-item pagination-next" href="#" @click="page++" v-if="page < pages.length">
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="addmemberModal"
      tabindex="-1"
      aria-labelledby="addmemberModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-warning">
            <h5 class="modal-title" id="addmemberModalLabel">Add Member</h5>
            <button
              type="button"
              class="btn-close"
              id="btn-close-member"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row g-3">
                <div class="col-lg-12">
                  <label for="submissionidInput" class="form-label"
                    >Submission ID</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="submissionidInput"
                    placeholder="Submission ID"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="profileimgInput" class="form-label"
                    >Profile Images</label
                  >
                  <input
                    class="form-control"
                    type="file"
                    id="profileimgInput"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-6">
                  <label for="firstnameInput" class="form-label"
                    >First Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="firstnameInput"
                    placeholder="Enter firstname"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-6">
                  <label for="lastnameInput" class="form-label"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="lastnameInput"
                    placeholder="Enter lastname"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="designationInput" class="form-label"
                    >Designation</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="designationInput"
                    placeholder="Designation"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="titleInput" class="form-label">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="titleInput"
                    placeholder="Title"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-6">
                  <label for="numberInput" class="form-label"
                    >Phone Number</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="numberInput"
                    placeholder="Phone number"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-6">
                  <label for="joiningdateInput" class="form-label"
                    >Joining Date</label
                  >

                  <flat-pickr
                    v-model="date"
                    :config="config"
                    placeholder="Select date"
                    class="form-control"
                  ></flat-pickr>
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="emailInput" class="form-label">Email ID</label>
                  <input
                    type="email"
                    class="form-control"
                    id="emailInput"
                    placeholder="Email"
                  />
                </div>
                <!--end col-->
              </div>
              <!--end row-->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              <i class="ri-close-line align-bottom me-1"></i> Close
            </button>
            <button type="button" class="btn btn-success" id="addMember">
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end add member modal-->

    <div
      class="modal fade"
      id="createboardModal"
      tabindex="-1"
      aria-labelledby="createboardModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-info">
            <h5 class="modal-title" id="createboardModalLabel">Add Board</h5>
            <button
              type="button"
              class="btn-close"
              id="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="#">
              <div class="row">
                <div class="col-lg-12">
                  <label for="boardName" class="form-label">Board Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="boardName"
                    placeholder="Enter board name"
                  />
                </div>
                <div class="mt-4">
                  <div class="hstack gap-2 justify-content-end">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-success"
                      id="addNewBoard"
                    >
                      Add Board
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--end add board modal-->

    <div
      class="modal fade"
      id="creatertaskModal"
      tabindex="-1"
      aria-labelledby="creatertaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-info">
            <h5 class="modal-title" id="creatertaskModalLabel">
              Create New Task
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="#">
              <div class="row g-3">
                <div class="col-lg-12">
                  <label for="projectName" class="form-label"
                    >Project Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="projectName"
                    placeholder="Enter project name"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="sub-tasks" class="form-label">Task Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="sub-tasks"
                    placeholder="Task title"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="task-description" class="form-label"
                    >Task Description</label
                  >
                  <textarea
                    class="form-control"
                    id="task-description"
                    rows="3"
                  ></textarea>
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="formFile" class="form-label">Tasks Images</label>
                  <input class="form-control" type="file" id="formFile" />
                </div>
                <!--end col-->
                <div class="col-lg-12">
                  <label for="tasks-progress" class="form-label"
                    >Add Team Member</label
                  >
                  <div data-simplebar style="height: 95px">
                    <ul class="list-unstyled vstack gap-2 mb-0">
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="anna-adame"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="anna-adame"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-1.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2"> Anna Adame </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="frank-hook"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="frank-hook"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-3.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2"> Frank Hook </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="alexis-clarke"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="alexis-clarke"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-6.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2">
                              Alexis Clarke
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="herbert-stokes"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="herbert-stokes"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-2.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2">
                              Herbert Stokes
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="michael-morris"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="michael-morris"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-7.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2">
                              Michael Morris
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="nancy-martino"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="nancy-martino"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-5.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2">
                              Nancy Martino
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="thomas-taylor"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="thomas-taylor"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-8.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2">
                              Thomas Taylor
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check d-flex align-items-center">
                          <input
                            class="form-check-input me-3"
                            type="checkbox"
                            value=""
                            id="tonya-noble"
                          />
                          <label
                            class="form-check-label d-flex align-items-center"
                            for="tonya-noble"
                          >
                            <span class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-10.jpg"
                                alt=""
                                class="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span class="flex-grow-1 ms-2"> Tonya Noble </span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!--end col-->
                <div class="col-lg-4">
                  <label for="due-date" class="form-label">Due Date</label>

                  <flat-pickr
                    v-model="date1"
                    placeholder="Select date"
                    class="form-control"
                  ></flat-pickr>
                </div>
                <!--end col-->
                <div class="col-lg-4">
                  <label for="categories" class="form-label">Tags</label>
                  <input
                    type="text"
                    class="form-control"
                    id="categories"
                    placeholder="Enter tag"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-4">
                  <label for="tasks-progress" class="form-label"
                    >Tasks Progress</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    maxlength="3"
                    id="tasks-progress"
                    placeholder="Enter progress"
                  />
                </div>
                <!--end col-->
                <div class="mt-4">
                  <div class="hstack gap-2 justify-content-end">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-success">
                      Add Task
                    </button>
                  </div>
                </div>
                <!--end col-->
              </div>
              <!--end row-->
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--end add board modal-->

    <div
      class="modal fade zoomIn"
      id="deleteRecordModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mt-2 text-center">
              <lottie
                class="avatar-xl"
                colors="primary:#405189,secondary:#f06548"
                :options="defaultOptions"
                :height="100"
                :width="100"
              />
              <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p class="text-muted mx-4 mb-0">
                  Are you sure you want to remove this tasks ?
                </p>
              </div>
            </div>
            <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
              <button
                type="button"
                class="btn w-sm btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn w-sm btn-danger"
                id="delete-record"
              >
                Yes, Delete It!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end modal -->
  </Layout>
</template>
<style>
.page-title-box {
  padding-left: 60px !important;
}
</style>