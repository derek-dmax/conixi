<script>
import { MoreHorizontalIcon } from "@zhuowenli/vue-feather-icons";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import { mapGetters, mapActions } from "vuex";

export default {
  page: {
    title: "Project List",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Project List",
      items: [
        {
          text: "Projects",
          href: "/",
        },
        {
          text: "Project List",
          active: true,
        },
      ],
      projectListWidgets1: [
        {
          id: 1,
          time: "Updated 3hrs ago",
          img: require("@/assets/images/brands/slack.png"),
          label: "Conixi - Admin & Dashboard",
          caption: "Build project dashboard plus admin section.",
          number: "18/42",
          progressBar: "34%",
          subItem: [
            {
              id: 1,
              imgFooter: require("@/assets/images/users/avatar-2.jpg"),
            },
            {
              id: 2,
              imgNumber: "+",
            },
          ],
          date: "10 Jul, 2022",
        },
        {
          id: 2,
          time: "Last update : 08 May",
          img: require("@/assets/images/brands/dribbble.png"),
          label: "Redesign - Landing page",
          caption: "Resign a landing page design. as per abc minimal design.",
          number: "22/56",
          progressBar: "54%",
          subItem: [
            {
              id: 1,
              imgFooter: require("@/assets/images/users/avatar-3.jpg"),
            },
            {
              id: 2,
              imgNumber: "S",
              bgColor: "secondary",
            },
            {
              id: 3,
              imgFooter: require("@/assets/images/users/avatar-4.jpg"),
            },
            {
              id: 4,
              imgNumber: "+",
            },
          ],
          date: "18 May, 2022",
        },
        {
          id: 3,
          time: "Updated 2hrs ago",
          img: require("@/assets/images/brands/mail_chimp.png"),
          label: "Chat Application",
          caption:
            "Create a Chat application for business messaging needs. Collaborate efficiently with secure direct messages and group chats.",
          number: "14/20",
          progressBar: "65%",
          subItem: [
            {
              id: 1,
              imgFooter: require("@/assets/images/users/avatar-5.jpg"),
            },
            {
              id: 2,
              imgNumber: "M",
              bgColor: "warning",
            },
            {
              id: 3,
              imgNumber: "+",
            },
          ],
          date: "21 Feb, 2022",
        },
        {
          id: 4,
          time: "Last update : 21 Jun",
          img: require("@/assets/images/brands/dropbox.png"),
          label: "Project App",
          caption:
            "Create a project application for a project management and task management.",
          number: "20/34",
          progressBar: "78%",
          subItem: [
            {
              id: 1,
              imgNumber: "K",
              bgColor: "info",
            },
            {
              id: 2,
              imgNumber: "M",
              bgColor: "danger",
            },
            {
              id: 3,
              imgNumber: "+",
            },
          ],
          date: "03 Aug, 2022",
        },
      ],

      projectListWidgets2: [
        {
          id: 1,
          label: "Multipurpose landing template",
          status: "Inprogess",
          statusClass: "warning",
          deadline: "18 Sep, 2022",
          subItem: [
            {
              id: 1,
              imgNumber: "D",
              bgColor: "danger",
            },
            {
              id: 2,
              imgTeam: require("@/assets/images/users/avatar-5.jpg"),
            },
            {
              id: 3,
              imgTeam: require("@/assets/images/users/avatar-6.jpg"),
            },
            {
              id: 4,
              imgNumber: "+",
            },
          ],
          progressBar: "50%",
        },
        {
          id: 2,
          label: "Dashboard UI",
          status: "Completed",
          statusClass: "success",
          deadline: "10 Jun, 2022",
          subItem: [
            {
              id: 1,
              imgTeam: require("@/assets/images/users/avatar-7.jpg"),
            },
            {
              id: 2,
              imgTeam: require("@/assets/images/users/avatar-8.jpg"),
            },
            {
              id: 3,
              imgNumber: "+",
            },
          ],
          progressBar: "95%",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("projects", ["projectList"]),
  },
  components: {
    Layout,
    PageHeader,
    Multiselect,
    MoreHorizontalIcon,
  },
  methods: {
    ...mapActions("projects", ["updateProject"]),
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row g-4 mb-3">
      <div class="col-sm-auto">
        <div>
          <router-link to="/apps/projects-create" class="btn btn-success"
            ><i class="ri-add-line align-bottom me-1"></i> Add New</router-link
          >
        </div>
      </div>
      <div class="col-sm">
        <div class="d-flex justify-content-sm-end gap-2">
          <div class="search-box ms-2">
            <input type="text" class="form-control" placeholder="Search..." />
            <i class="ri-search-line search-icon"></i>
          </div>

          <Multiselect
            class="multiselect form-control w-lg w-auto m-0"
            v-model="value"
            :close-on-select="true"
            :searchable="true"
            :create-option="true"
            :options="[
              { value: 'Status', label: 'Status' },
              { value: 'Active', label: 'Active' },
              { value: 'Block', label: 'Block' },
            ]"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-xxl-3 col-sm-6 project-card"
        v-for="(item, index) of projectList"
        :key="index"
      >
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex flex-column h-100">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted mb-4">{{ item.time }}</p>
                </div>
                <div class="flex-shrink-0">
                  <div class="d-flex gap-1 align-items-center">
                    <button
                      type="button"
                      class="btn avatar-xs mt-n1 p-0 favourite-btn"
                      @click="
                        updateProject({
                          id: item.id,
                          updates: { favourite: !item.favourite },
                        })
                      "
                    >
                      <span class="bg-transparent fs-15">
                        <i
                          class="ri-star-fill"
                          style="color: orange"
                          v-if="item.favourite"
                        ></i>
                        <i class="ri-star-line" style="color: #cdcfd8" v-else></i>
                      </span>
                    </button>
                    <div class="dropdown">
                      <button
                        class="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <MoreHorizontalIcon class="icon-sm"></MoreHorizontalIcon>
                      </button>

                      <div class="dropdown-menu dropdown-menu-end">
                        <router-link class="dropdown-item" :to="{ name: 'projects View', query: { id: item.id } }"
                          ><i class="ri-eye-fill align-bottom me-2 text-muted"></i>
                          View</router-link
                        >
                        <router-link class="dropdown-item" to="/apps/projects-create"
                          ><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                          Edit</router-link
                        >
                        <div class="dropdown-divider"></div>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#removeProjectModal"
                          ><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                          Remove</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-sm">
                    <span class="avatar-title bg-soft-warning rounded p-2">
                      <img :src="item.img" alt="" class="img-fluid p-1" />
                    </span>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-1 fs-15">
                    <router-link :to="{ name: 'projects View' , query: { id: item.id } }"
                      >{{ item.label }}</router-link
                    >
                  </h5>
                  <p class="text-muted text-truncate-two-lines mb-3">
                    {{ item.caption }}
                  </p>
                </div>
              </div>
              <div class="mt-auto">
                <div class="d-flex mb-2">
                  <div class="flex-grow-1">
                    <div>Tasks</div>
                  </div>
                  <div class="flex-shrink-0">
                    <div>
                      <i class="ri-list-check align-bottom me-1 text-muted"></i>
                      {{ item.number }}
                    </div>
                  </div>
                </div>
                <div class="progress progress-sm animated-progess">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="34"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${item.progressBar};`"
                  ></div>
                  <!-- /.progress-bar -->
                </div>
                <!-- /.progress -->
              </div>
            </div>
          </div>
          <!-- end card body -->
          <div class="card-footer bg-transparent border-top-dashed py-2">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <div class="avatar-group">
                  <a
                    href="javascript: void(0);"
                    v-for="(subitem, index) of item.members"
                    :key="index"
                    class="avatar-group-item"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    data-bs-placement="top"
                    :title="subitem.name"
                  >
                    <div class="avatar-xxs">
                      <img
                        :src="subitem.img"
                        alt=""
                        class="rounded-circle img-fluid"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="text-muted">
                  <i class="ri-calendar-event-fill me-1 align-bottom"></i>
                  {{ item.createdDate }}
                </div>
              </div>
            </div>
          </div>
          <!-- end card footer -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row g-0 text-center text-sm-start align-items-center mb-4">
      <div class="col-sm-6">
        <div>
          <p class="mb-sm-0 text-muted">
            Showing <span class="fw-semibold">1</span> to
            <span class="fw-semibold">{{ projectList.length }}</span> of
            <span class="fw-semibold text-decoration-underline">{{
              projectList.length
            }}</span>
            entries
          </p>
        </div>
      </div>
      <!-- end col -->
      <div class="col-sm-6">
        <ul
          class="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0"
        >
          <li class="page-item disabled">
            <a href="#" class="page-link">Previous</a>
          </li>
          <li class="page-item active">
            <a href="#" class="page-link">1</a>
          </li>
          <li class="page-item">
            <a href="#" class="page-link">Next</a>
          </li>
        </ul>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
