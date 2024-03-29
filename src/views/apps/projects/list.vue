<script>
import { MoreHorizontalIcon } from "@zhuowenli/vue-feather-icons";

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
      userType: "consultant",
      userName: "Derek Macrae",
      userOrg: "Conixi",
      userTitle: "CTO",
      currItem: null,
      projectKeys: 0,
      statusFilter: "All"
    };
  },
  computed: {
    ...mapGetters("projects", ["projectList"]),
    filteredProjects() {
      let projects = []
      if (this.statusFilter === "All") {
        return this.projectList;
      } else {
        this.projectKeys.forEach((key) => {
        if (this.projectList[key].status === this.statusFilter) {
          projects.push(this.projectList[key])
        }
      });
        return projects
      }
    }
  },
  components: {
    Layout,
    PageHeader,
    MoreHorizontalIcon,
  },
  created() {
    console.log(localStorage.getItem("jwtn"));
    this.userType = localStorage.getItem("userType");
    this.userName = localStorage.getItem("userName");
    this.userOrg = localStorage.getItem("userOrg");
    this.userTitle = localStorage.getItem("userTitle");
    this.projectKeys = Object.keys(this.projectList);
    if (this.userType === "supplier") {
      this.projectKeys.forEach((key) => {
        if (this.projectList[key].suppliers[0].name !== this.userOrg) {
          this.deleteProject(key);
          this.projectKeys = Object.keys(this.projectList);
        }
      });
      if (this.projectKeys.length === 1) {
        this.$router.push ({name: 'projects View', query: { id: this.projectKeys[0] }})
      }
    }
  },
  methods: {
    ...mapActions("projects", ["updateProject", "deleteProject"]),
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row g-4 mb-3">
      <div class="col-sm-auto">
        <div v-if="userType !== 'supplier'">
          <router-link to="/apps/projects-create" class="btn btn-success btn-sm"
            ><i class="ri-add-line align-bottom me-1"></i> Add New</router-link
          >
        </div>
      </div>
      <div class="col-sm">
        <div class="d-flex justify-content-sm-end gap-2">
          <div class="search-box ms-2">
            <input type="text" class="form-control form-control-sm" placeholder="Search..." />
            <i class="ri-search-line search-icon"></i>
          </div>

          <select
            class="form-select form-select-sm w-lg w-auto m-0"
            v-model="statusFilter"
          >
            <option value="All">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Tendering">Tendering</option>
          </select>
        </div>
      </div>
    </div>

    <div
      id="delModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="delModalLabel"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="delModalLabel">Delete Project?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-muted">
              This will remove the project from the system. Are you sure you want to do
              this?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="deleteProject(this.currItem)"
            >
              Delete Project
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="row">
      <div
        class="col-xxl-3 col-sm-6 project-card"
        v-for="(item, index) of filteredProjects"
        :key="index"
      >
        <div class="card card-height-70" :class="{ tendering: item.status === 'Tendering'}">
          <div class="card-body">
            <div class="d-flex flex-column h-70">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted mb-4">Last Update: {{ item.time.format('DD-MMM') }}</p>
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
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'projects View', query: { id: item.id } }"
                          ><i class="ri-eye-fill align-bottom me-2 text-muted"></i>
                          View</router-link
                        >
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'projects View', query: { id: item.id } }"
                          ><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                          Edit</router-link
                        >
                        <div class="dropdown-divider"></div>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#delModal"
                          @click="this.currItem = item.id"
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
                  <h5 class="mb-2 fs-14">
                    <router-link
                      :to="{ name: 'projects View', query: { id: item.id } }"
                      >{{ item.label }}</router-link
                    >
                  </h5>
                  <p
                    class="text-muted mb-0 d-sm-block services" style="display:none"
                    v-for="(service, index) in item.services"
                    :key="index"
                  >
                    {{ service }}
                  </p>
                </div>
              </div>
              <div class="mt-auto d-sm-block" style="display:none">
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
                      <img :src="subitem.img" alt="" class="rounded-circle img-fluid" />
                    </div>
                  </a>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="text-muted">
                  <i class="ri-calendar-event-fill me-1 align-bottom"></i>
                  {{ item.createdDate.format('DD-MMM-YY') }}
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
            <span class="fw-semibold">{{ projectKeys.length }}</span> of
            <span class="fw-semibold">{{ projectKeys.length }}</span>
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
<style>
.tendering {
  border: 3px solid #ffc107 !important;
}
.services {
  font-size: 0.6rem;
}
  .x-sm-hidden {
    @media only screen and (max-width: 1026px) {
      display: none;
    }
  }
</style>