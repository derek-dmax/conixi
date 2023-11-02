<script>
import "@vueform/multiselect/themes/default.css";
import Layout from "../../../layouts/main.vue";

import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";

import animationData from "@/components/widgets/kbtmbyzy.json";
import { useStore } from "vuex"
import moment from "moment";
import { ActivityIcon, AwardIcon } from "@zhuowenli/vue-feather-icons";

export default {
  page: {
    title: "Task Details",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Task Details",
      tabSelect: "doc",
      items: [
        {
          text: "Tasks",
          href: "/",
        },
        {
          text: "Task Details",
          active: true,
        },
      ],
      value: null,
      defaultOptions: { animationData: animationData },
      store: useStore(),
      tasks: null,
      task: { text: null},
      startDate: null,
      dueDate: null,
    };
  },
  components: {
    Layout,
    PageHeader,
    ActivityIcon,
    AwardIcon,
  },
  computed: {
    docLength() {
      return this.task.documents ? Object.keys(this.task.documents).length : 0;
    },
    projectList() {
      return this.store.getters["projects/projectList"]
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.tasks = Object.assign({}, this.projectList[this.$route.params.id.split("_")[0]].tasks.data);

      for (var i = 0; i < Object.keys(this.tasks).length; i++) {
        if (this.tasks[i].id == this.$route.params.id.split("_")[1]) {
          this.task = Object.assign({}, this.tasks[i]);
          this.task.payment = this.task.payment.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
          this.task.project = this.projectList[this.$route.params.id.split("_")[0]].description;
          this.startDate = moment(this.task.startDate).subtract(this.task.duration, 'days').format('DD-MMM-yyyy')
          this.dueDate = moment(this.task.dueDate).format('DD-MMM-yyyy')
          break;
        }
      }
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xxl-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center">
          <div class="avatar-sm flex-shrink-0">
            <span
              class="avatar-title rounded-2 fs-2 bg-soft-primary text-primary"
            >
              <template v-if="task.value !== 0">
                <AwardIcon size="24" class="text-primary"></AwardIcon>
              </template>

              <template v-else>
                <ActivityIcon size="24" class="text-warning"></ActivityIcon>
              </template>
            </span>
          </div>
          <div class="flex-grow-1 overflow-hidden ms-3">
            <div class="mb-1">
              <span class="text-uppercase fw-medium text-muted text-truncate">
                {{ task.value !== 0 ? (task.duration === 0 ? 'Milestone' : 'Paid Task') : 'Work Task' }}
              </span>
            </div>
            <div class="d-flex align-items-center mb-1">
              <h4 class="fs-4 flex-grow-1 mb-0">
                <span>{{ task.text }}</span>
              </h4>
            </div>
          </div>
        </div>
            <div class="text-muted">
              <div class="mb-1 mt-2">
                Project: {{ task.project }}
              </div>

              <div class="mb-1" v-if="task.duration != 0">
                Start Date: {{ startDate }}
              </div>

              <div class="mb-1">
                Due Date: {{ dueDate }}
              </div>

              <div class="mb-1" v-if="task.duration != 0">
                Duration: {{ task.duration }} day(s)
              </div>

              <div class="mb-1" v-if="task.payment">
                Value: £ {{ task.payment }}
              </div>
            </div>
          </div>
        </div>
        <!--end card-->
      </div>
      <div class="col-xxl-8">
        <div class="card">
          <div class="card-header">
            <div>
              <ul
                class="
                  nav nav-tabs-custom
                  rounded
                  card-header-tabs
                  border-bottom-0
                "
                role="tablist"
              >
              <li class="nav-item active">
                  <a
                    class="nav-link"
                    data-bs-toggle="tab"
                    href="#messages-1"
                    role="tab"
                    @click="tabSelect = 'doc'"
                    :style = "{ textDecoration: tabSelect === 'doc' ? 'underline !important' : 'none', color: tabSelect === 'doc' ? 'black !important' : '' }"
                  >
                    Documents ({{ docLength }})
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="tab"
                    href="#home-1"
                    role="tab"
                    @click="tabSelect = 'chat'"
                    :style = "{ textDecoration: tabSelect === 'chat' ? 'underline !important' : 'none', color: tabSelect === 'chat' ? 'black !important' : '' }"
                  >
                    Comments ( {{ task.comments ? Object.keys(task.comments).length : 0 }})
                  </a>
                </li>
              </ul>
              <!--end nav-->
            </div>
          </div>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active" id="messages-1" role="tabpanel" v-if="tabSelect === 'doc'">
                <div class="table-responsive table-card">
                  <table class="table table-borderless align-middle mb-0">
                    <thead class="table-light text-muted">
                      <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Size</th>
                        <th scope="col">Upload Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="doc in task.documents" :key="doc.name">
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="avatar-sm">
                              <div
                                class="
                                  avatar-title
                                  bg-soft-primary
                                  text-primary
                                  rounded
                                  fs-20
                                "
                              >
                                <i class="ri-file-pdf-fill"></i>
                              </div>
                            </div>
                            <div class="ms-3 flex-grow-1">
                              <h6 class="fs-15 mb-0">
                                <a href="javascript:void(0)">{{ doc.name }}</a>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>{{ doc.type }}</td>
                        <td>{{ doc.size }}</td>
                        <td>{{ doc.date }}</td>
                        <td>
                          <div class="dropdown">
                            <a
                              href="javascript:void(0);"
                              class="btn btn-light btn-icon"
                              id="dropdownMenuLink1"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                            >
                              <i class="ri-equalizer-fill"></i>
                            </a>
                            <ul
                              class="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink1"
                              data-popper-placement="bottom-end"
                              style="
                                position: absolute;
                                inset: 0px 0px auto auto;
                                margin: 0px;
                                transform: translate(0px, 23px);
                              "
                            >
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  ><i
                                    class="
                                      ri-eye-fill
                                      me-2
                                      align-middle
                                      text-muted
                                    "
                                  ></i
                                  >View</a
                                >
                              </li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  ><i
                                    class="
                                      ri-download-2-fill
                                      me-2
                                      align-middle
                                      text-muted
                                    "
                                  ></i
                                  >Download</a
                                >
                              </li>
                              <li class="dropdown-divider"></li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  ><i
                                    class="
                                      ri-delete-bin-5-line
                                      me-2
                                      align-middle
                                      text-muted
                                    "
                                  ></i
                                  >Delete</a
                                >
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--end table-->
                </div>
              </div>
              <!--end tab-pane-->
              <div class="tab-pane" id="home-1" role="tabpanel">
                <h5 class="card-title mb-4">Comments</h5>
                <div
                  data-simplebar
                  style="height: 300px"
                  class="px-3 mx-n3 mb-2"
                >
                  <div class="d-flex mb-4" v-for="comment in task.comments" :key="comment.comment">
                    <div class="flex-shrink-0">
                      <img
                        :src="comment.image"
                        alt=""
                        class="avatar-xs rounded-circle"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h5 class="fs-13">
                        <router-link to="/pages/profile"
                          >{{ comment.user }} &nbsp;</router-link
                        >
                        <small class="text-muted ml-1">{{ comment.date }}</small>
                      </h5>
                      <p class="text-muted">
                        {{ comment.comment }}
                      </p>
                      <a
                        href="javascript: void(0);"
                        class="badge text-muted bg-light"
                        ><i class="mdi mdi-reply"></i> Reply</a
                      >
                    </div>
                  </div>
                </div>
                <form>
                  <div class="row g-3">
                    <div class="col-lg-12">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                        >Leave a Comment</label
                      >
                      <textarea
                        class="form-control bg-light border-light"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Enter comments"
                      ></textarea>
                    </div>
                    <!--end col-->
                    <div class="col-12 text-end">
                      <button
                        type="button"
                        class="
                          btn btn-ghost-secondary btn-icon
                          waves-effect
                          me-1
                        "
                      >
                        <i class="ri-attachment-line fs-16"></i>
                      </button>
                      <a href="javascript:void(0);" class="btn btn-success"
                        >Post Comments</a
                      >
                    </div>
                  </div>
                  <!--end row-->
                </form>
              </div>
              <!--end tab-pane-->
            </div>
            <!--end tab-content-->
          </div>
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
    <!--end row-->

  </Layout>
</template>