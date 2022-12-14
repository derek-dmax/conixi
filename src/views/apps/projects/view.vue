<script>
import Layout from "../../../layouts/main.vue";
import appConfig from "../../../../app.config";
import { mapGetters, mapActions } from "vuex";
import Draggable from "vue3-draggable";
import moment from "moment";
import projectLegals from "../../../components/projectLegals.vue";
import projectMilestones from "../../../components/projectMilestones.vue";
import projectGANTT from "../../../components/projectGANTT.vue";

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
      selProject: {},
      exampleList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      recChanges: false,
      todayDate: moment().format("Do") + " day of " + moment().format("MMMM YYYY"),
      currId: 1,
      paymentItems: [
        {
          id: 2,
          text: "Office facing",
          start_date: moment().subtract(10, "days"),
          duration: "8",
          progress: 0.6,
          parent: "1",
          open: true,
          payment: 1000,
          status: "paid",
          changePayment: false,
          changeStatus: false,
          changeDate: false,
          changeDescription: false,
        },
        {
          id: 10,
          text: "Workplaces exportation",
          start_date: moment().subtract(3, "days"),
          duration: "3",
          parent: "4",
          progress: 0.5,
          open: true,
          payment: 4000,
          status: "due",
          changePayment: false,
          changeStatus: false,
          changeDate: false,
          changeDescription: false,
        },
        {
          id: 12,
          text: "Perform Initial testing",
          start_date: moment().add(7, "days"),
          duration: "5",
          parent: "11",
          progress: 1,
          open: true,
          payment: 2000,
          status: "unpaid",
          changePayment: false,
          changeStatus: false,
          changeDate: false,
          changeDescription: false,
        },
      ],
    };
  },
  created() {
    const queryParams = new URLSearchParams(window.location.search);
    this.currId = queryParams.get("id");

    this.selProject = this.projectList[this.currId];
  },
  computed: {
    ...mapGetters("projects", ["projectList"]),
  },
  components: {
    Layout,
    // eslint-disable-next-line vue/no-unused-components
    Draggable,
    projectLegals,
    projectMilestones,
    projectGANTT,
  },
  methods: {
    ...mapActions("projects", ["updateProject"]),
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card mt-n4 mx-n4">
          <div class="bg-soft-warning">
            <div class="card-body pb-0 px-4">
              <div class="row">
                <div class="col-md">
                  <div class="row align-items-center g-3">
                    <div class="col-md-auto">
                      <div class="avatar-md">
                        <div class="avatar-title bg-white rounded-circle">
                          <img :src="selProject.img" alt="" class="avatar-xs" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md">
                      <div>
                        <h4 class="fw-bold">{{ selProject.label }}</h4>
                        <div class="hstack gap-3 flex-wrap">
                          <div>
                            <i class="ri-building-line align-bottom me-1"></i>
                            {{ selProject.client }}
                          </div>
                          <div class="vr"></div>
                          <div>
                            Create Date :
                            <span class="fw-medium">{{ selProject.createdDate }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Category :
                            <span class="fw-medium">{{ selProject.category }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Sub Category :
                            <span class="fw-medium">{{ selProject.subCategory }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Due Date :
                            <span class="fw-medium">{{ selProject.dueDate }}</span>
                          </div>
                          <div class="vr"></div>
                          <div
                            v-if="selProject.id === 2"
                            class="badge rounded-pill bg-info fs-12"
                          >
                            New
                          </div>
                          <div
                            class="badge round-pill fs-12"
                            :class="{
                              'bg-warning': selProject.priority == 'Medium',
                              'bg-danger': selProject.priority == 'High',
                            }"
                          >
                            {{ selProject.priority }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-auto">
                  <div class="hstack gap-1 flex-wrap">
                    <button
                      type="button"
                      class="btn avatar-xs mt-n1 p-0 favourite-btn"
                      @click="
                        updateProject({
                          id: selProject.id,
                          updates: { favourite: !selProject.favourite },
                        })
                      "
                    >
                      <span class="bg-transparent fs-15">
                        <i
                          class="ri-star-fill"
                          style="color: orange"
                          v-if="selProject.favourite"
                        ></i>
                        <i class="ri-star-line" style="color: #cdcfd8" v-else></i>
                      </span>
                    </button>
                    <button type="button" class="btn py-0 fs-16 text-body">
                      <i class="ri-share-line"></i>
                    </button>
                    <button type="button" class="btn py-0 fs-16 text-body">
                      <i class="ri-flag-line"></i>
                    </button>
                  </div>
                </div>
              </div>

              <ul class="nav nav-tabs-custom border-bottom-0" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-overview"
                    role="tab"
                  >
                    Overview
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-sow"
                    role="tab"
                  >
                    Statement of Work
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-documents"
                    role="tab"
                  >
                    Documents
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-team"
                    role="tab"
                  >
                    Team
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-gantt"
                    role="tab"
                  >
                    Project Plan
                  </a>
                </li>
              </ul>
            </div>
            <!-- end card body -->
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="tab-content text-muted">
          <div class="tab-pane fade show active" id="project-overview" role="tabpanel">
            <div class="row">
              <div class="col-xl-9 col-lg-8">
                <div class="card">
                  <div class="card-body">
                    <div class="text-muted">
                      <h6 class="mb-3 fw-semibold text-uppercase">Summary</h6>
                      <p class="mb-3">The following services are involved:</p>
                      <ul>
                        <li class="text-muted mb-0" v-for="(service, index) in selProject.services" :key="index">
                          {{ service }}
                        </li>
                      </ul>
                      <p class="mt-3">
                        Projects are one of the cornerstones of a successful business.
                        Sector or industry aside, strategic initiatives focused on
                        specific areas of the business help drive an organization forward,
                        growing, progressing, and evolving year after year. Also,
                        implementing effective management reports will create a
                        data-driven approach to making business decisions and obtaining
                        sustainable business success. <br /><br />
                        But despite the business-boosting potential (and vital importance)
                        of successfully delivering collaborative strategies, a mere 58% of
                        organizations understand the value of project management to its
                        fullest, according to the global survey conducted by the Project
                        Management Insitute. Armed with this knowledge, you can gain a
                        significant edge on the competition and boost your project
                        exponentially.
                      </p>
                      <ul class="ps-4 vstack gap-2">
                        <li>Product Design, Figma (Software), Prototype</li>
                        <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                        <li>Create calendar, chat and email app pages.</li>
                        <li>Add authentication pages.</li>
                        <li>Content listing.</li>
                      </ul>

                      <div>
                        <button type="button" class="btn btn-link link-success p-0">
                          Read more
                        </button>
                      </div>

                      <div class="pt-3 border-top border-top-dashed mt-4">
                        <div class="row">
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-medium">Create Date :</p>
                              <h5 class="fs-15 mb-0">{{ selProject.createdDate }}</h5>
                            </div>
                          </div>
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-medium">Due Date :</p>
                              <h5 class="fs-15 mb-0">{{ selProject.dueDate }}</h5>
                            </div>
                          </div>
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-medium">Priority :</p>
                              <div
                                class="badge fs-12"
                                :class="{
                                  'bg-warning': selProject.priority == 'Medium',
                                  'bg-danger': selProject.priority == 'High',
                                }"
                              >
                                {{ selProject.priority }}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-3 col-sm-6">
                            <div>
                              <p class="mb-2 text-uppercase fw-medium">Status :</p>
                              <div class="badge bg-warning fs-12">
                                {{ selProject.status }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="pt-3 border-top border-top-dashed mt-4">
                        <h6 class="mb-3 fw-semibold text-uppercase">Resources</h6>
                        <div class="row g-3">
                          <div class="col-xxl-4 col-lg-6">
                            <div class="border rounded border-dashed p-2">
                              <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                  <div class="avatar-sm">
                                    <div
                                      class="avatar-title bg-light text-secondary rounded fs-24"
                                    >
                                      <i class="ri-folder-zip-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                  <h5 class="fs-13 mb-1">
                                    <a href="#" class="text-body text-truncate d-block"
                                      >App pages.zip</a
                                    >
                                  </h5>
                                  <div>2.2MB</div>
                                </div>
                                <div class="flex-shrink-0 ms-2">
                                  <div class="d-flex gap-1">
                                    <button
                                      type="button"
                                      class="btn btn-icon text-muted btn-sm fs-18"
                                    >
                                      <i class="ri-download-2-line"></i>
                                    </button>
                                    <div class="dropdown">
                                      <button
                                        class="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i class="ri-more-fill"></i>
                                      </button>
                                      <ul class="dropdown-menu">
                                        <li>
                                          <a class="dropdown-item" href="#"
                                            ><i
                                              class="ri-pencil-fill align-bottom me-2 text-muted"
                                            ></i>
                                            Rename</a
                                          >
                                        </li>
                                        <li>
                                          <a class="dropdown-item" href="#"
                                            ><i
                                              class="ri-delete-bin-fill align-bottom me-2 text-muted"
                                            ></i>
                                            Delete</a
                                          >
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- end col -->
                          <div class="col-xxl-4 col-lg-6">
                            <div class="border rounded border-dashed p-2">
                              <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                  <div class="avatar-sm">
                                    <div
                                      class="avatar-title bg-light text-secondary rounded fs-24"
                                    >
                                      <i class="ri-file-ppt-2-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                  <h5 class="fs-13 mb-1">
                                    <a href="#" class="text-body text-truncate d-block"
                                      >Conixi admin.ppt</a
                                    >
                                  </h5>
                                  <div>2.4MB</div>
                                </div>
                                <div class="flex-shrink-0 ms-2">
                                  <div class="d-flex gap-1">
                                    <button
                                      type="button"
                                      class="btn btn-icon text-muted btn-sm fs-18"
                                    >
                                      <i class="ri-download-2-line"></i>
                                    </button>
                                    <div class="dropdown">
                                      <button
                                        class="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i class="ri-more-fill"></i>
                                      </button>
                                      <ul class="dropdown-menu">
                                        <li>
                                          <a class="dropdown-item" href="#"
                                            ><i
                                              class="ri-pencil-fill align-bottom me-2 text-muted"
                                            ></i>
                                            Rename</a
                                          >
                                        </li>
                                        <li>
                                          <a class="dropdown-item" href="#"
                                            ><i
                                              class="ri-delete-bin-fill align-bottom me-2 text-muted"
                                            ></i>
                                            Delete</a
                                          >
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- end col -->
                        </div>
                        <!-- end row -->
                      </div>
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->

                <div class="card">
                  <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Comments</h4>
                    <div class="flex-shrink-0">
                      <div class="dropdown card-header-dropdown">
                        <a
                          class="text-reset dropdown-btn"
                          href="#"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span class="text-muted"
                            >Recent<i class="mdi mdi-chevron-down ms-1"></i
                          ></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="#">Recent</a>
                          <a class="dropdown-item" href="#">Top Rated</a>
                          <a class="dropdown-item" href="#">Previous</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end card header -->

                  <div class="card-body">
                    <div data-simplebar style="height: 300px" class="px-3 mx-n3 mb-2">
                      <div class="d-flex mb-4">
                        <div class="flex-shrink-0">
                          <img
                            src="@/assets/images/users/avatar-8.jpg"
                            alt=""
                            class="avatar-xs rounded-circle"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="fs-13">
                            Joseph Parker
                            <small class="text-muted ms-2">20 Dec 2022 - 05:47AM</small>
                          </h5>
                          <p class="text-muted">
                            I am getting message from customers that when they place order
                            always get error message .
                          </p>
                          <a href="javascript: void(0);" class="badge text-muted bg-light"
                            ><i class="mdi mdi-reply"></i> Reply</a
                          >
                          <div class="d-flex mt-4">
                            <div class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-10.jpg"
                                alt=""
                                class="avatar-xs rounded-circle"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mb-4">
                        <div class="flex-shrink-0">
                          <img
                            src="@/assets/images/users/avatar-6.jpg"
                            alt=""
                            class="avatar-xs rounded-circle"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="fs-13">
                            Donald Palmer
                            <small class="text-muted ms-2">24 Dec 2022 - 05:20PM</small>
                          </h5>
                          <p class="text-muted">
                            If you have further questions, please contact Customer Support
                            from the “Action Menu” on your
                            <a
                              href="javascript:void(0);"
                              class="text-decoration-underline"
                              >Online Order Support</a
                            >.
                          </p>
                          <a href="javascript: void(0);" class="badge text-muted bg-light"
                            ><i class="mdi mdi-reply"></i> Reply</a
                          >
                        </div>
                      </div>
                      <div class="d-flex">
                        <div class="flex-shrink-0">
                          <img
                            src="@/assets/images/users/avatar-10.jpg"
                            alt=""
                            class="avatar-xs rounded-circle"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="fs-13">
                            Alexis Clarke
                            <small class="text-muted ms-2">26 min ago</small>
                          </h5>
                          <p class="text-muted">
                            Your
                            <a href="javascript:void(0)" class="text-decoration-underline"
                              >Online Order Support</a
                            >
                            provides you with the most current status of your order. To
                            help manage your order refer to the “Action Menu” to initiate
                            return, contact Customer Support and more.
                          </p>
                          <div class="row g-2 mb-3">
                            <div class="col-lg-1 col-sm-2 col-6">
                              <img
                                src="@/assets/images/small/img-4.jpg"
                                alt=""
                                class="img-fluid rounded"
                              />
                            </div>
                            <div class="col-lg-1 col-sm-2 col-6">
                              <img
                                src="@/assets/images/small/img-5.jpg"
                                alt=""
                                class="img-fluid rounded"
                              />
                            </div>
                          </div>
                          <a href="javascript: void(0);" class="badge text-muted bg-light"
                            ><i class="mdi mdi-reply"></i> Reply</a
                          >
                          <div class="d-flex mt-4">
                            <div class="flex-shrink-0">
                              <img
                                src="@/assets/images/users/avatar-6.jpg"
                                alt=""
                                class="avatar-xs rounded-circle"
                              />
                            </div>
                            <div class="flex-grow-1 ms-3">
                              <h5 class="fs-13">
                                Donald Palmer
                                <small class="text-muted ms-2">8 sec ago</small>
                              </h5>
                              <p class="text-muted">
                                Other shipping methods are available at checkout if you
                                want your purchase delivered faster.
                              </p>
                              <a
                                href="javascript: void(0);"
                                class="badge text-muted bg-light"
                                ><i class="mdi mdi-reply"></i> Reply</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form class="mt-4">
                      <div class="row g-3">
                        <div class="col-12">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label text-body"
                            >Leave a Comments</label
                          >
                          <textarea
                            class="form-control bg-light border-light"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Enter your comment..."
                          ></textarea>
                        </div>
                        <div class="col-12 text-end">
                          <button
                            type="button"
                            class="btn btn-ghost-secondary btn-icon waves-effect me-1"
                          >
                            <i class="ri-attachment-line fs-16"></i>
                          </button>
                          <a href="javascript:void(0);" class="btn btn-success"
                            >Post Comments</a
                          >
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->
              </div>
              <!-- ene col -->
              <div class="col-xl-3 col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Skills</h5>
                    <div class="d-flex flex-wrap gap-2 fs-16">
                      <div
                        class="badge fw-medium badge-soft-secondary"
                        v-for="(item, index) in selProject.skills"
                        :key="index"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->

                <div class="card">
                  <div class="card-header align-items-center d-flex border-bottom-dashed">
                    <h4 class="card-title mb-0 flex-grow-1">Owner(s)</h4>
                    <div class="flex-shrink-0">
                      <button
                        type="button"
                        class="btn btn-soft-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#inviteMembersModal"
                      >
                        <i class="ri-share-line me-1 align-bottom"></i> Invite Member
                      </button>
                    </div>
                  </div>

                  <div class="card-body">
                    <div data-simplebar style="height: 130px" class="mx-n3 px-3">
                      <div class="vstack gap-3">
                        <div
                          class="d-flex align-items-center"
                          v-for="(member, index) in selProject.members"
                          :key="index"
                        >
                          <div class="avatar-xs flex-shrink-0 me-3">
                            <img
                              :src="member.img"
                              alt=""
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1">
                            <h5 class="fs-13 mb-0">
                              <a href="#" class="text-body d-block">{{ member.name }}</a>
                            </h5>
                          </div>
                          <div class="flex-shrink-0">
                            <div class="d-flex align-items-center gap-1">
                              <button type="button" class="btn btn-light btn-sm">
                                Message
                              </button>
                              <div class="dropdown">
                                <button
                                  class="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill text-muted me-2 align-bottom"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-star-fill text-muted me-2 align-bottom"
                                      ></i
                                      >Favourite</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill text-muted me-2 align-bottom"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- end member item -->
                      </div>
                      <!-- end list -->
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->

                <div class="card">
                  <div class="card-header align-items-center d-flex border-bottom-dashed">
                    <h4 class="card-title mb-0 flex-grow-1">Supplier(s)</h4>
                    <div class="flex-shrink-0">
                      <button
                        type="button"
                        class="btn btn-soft-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#inviteMembersModal"
                      >
                        <i class="ri-share-line me-1 align-bottom"></i> Invite Supplier
                      </button>
                    </div>
                  </div>

                  <div class="card-body">
                    <div data-simplebar style="height: 130px" class="mx-n3 px-3">
                      <div class="vstack gap-3">
                        <div
                          class="d-flex align-items-center"
                          v-for="(member, index) in selProject.suppliers"
                          :key="index"
                        >
                          <div class="avatar-xs flex-shrink-0 me-3">
                            <img
                              :src="member.img"
                              alt=""
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1">
                            <h5 class="fs-13 mb-0">
                              <a href="#" class="text-body d-block">{{ member.name }}</a>
                            </h5>
                          </div>
                          <div class="flex-shrink-0">
                            <div class="d-flex align-items-center gap-1">
                              <button type="button" class="btn btn-light btn-sm">
                                Message
                              </button>
                              <div class="dropdown">
                                <button
                                  class="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill text-muted me-2 align-bottom"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-star-fill text-muted me-2 align-bottom"
                                      ></i
                                      >Favourite</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill text-muted me-2 align-bottom"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- end member item -->
                      </div>
                      <!-- end list -->
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->

                <div class="card">
                  <div class="card-header align-items-center d-flex border-bottom-dashed">
                    <h4 class="card-title mb-0 flex-grow-1">Attachments</h4>
                    <div class="flex-shrink-0">
                      <button type="button" class="btn btn-soft-info btn-sm">
                        <i class="ri-upload-2-fill me-1 align-bottom"></i> Upload
                      </button>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="vstack gap-2">
                      <div class="border rounded border-dashed p-2">
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                              <div
                                class="avatar-title bg-light text-secondary rounded fs-24"
                              >
                                <i class="ri-folder-zip-line"></i>
                              </div>
                            </div>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <h5 class="fs-13 mb-1">
                              <a href="#" class="text-body text-truncate d-block"
                                >App-pages.zip</a
                              >
                            </h5>
                            <div>2.2MB</div>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="d-flex gap-1">
                              <button
                                type="button"
                                class="btn btn-icon text-muted btn-sm fs-18"
                              >
                                <i class="ri-download-2-line"></i>
                              </button>
                              <div class="dropdown">
                                <button
                                  class="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-pencil-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Rename</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-delete-bin-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="border rounded border-dashed p-2">
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                              <div
                                class="avatar-title bg-light text-secondary rounded fs-24"
                              >
                                <i class="ri-file-ppt-2-line"></i>
                              </div>
                            </div>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <h5 class="fs-13 mb-1">
                              <a href="#" class="text-body text-truncate d-block"
                                >Conixi-admin.ppt</a
                              >
                            </h5>
                            <div>2.4MB</div>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="d-flex gap-1">
                              <button
                                type="button"
                                class="btn btn-icon text-muted btn-sm fs-18"
                              >
                                <i class="ri-download-2-line"></i>
                              </button>
                              <div class="dropdown">
                                <button
                                  class="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-pencil-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Rename</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-delete-bin-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="border rounded border-dashed p-2">
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                              <div
                                class="avatar-title bg-light text-secondary rounded fs-24"
                              >
                                <i class="ri-folder-zip-line"></i>
                              </div>
                            </div>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <h5 class="fs-13 mb-1">
                              <a href="#" class="text-body text-truncate d-block"
                                >Images.zip</a
                              >
                            </h5>
                            <div>1.2MB</div>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="d-flex gap-1">
                              <button
                                type="button"
                                class="btn btn-icon text-muted btn-sm fs-18"
                              >
                                <i class="ri-download-2-line"></i>
                              </button>
                              <div class="dropdown">
                                <button
                                  class="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-pencil-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Rename</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-delete-bin-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="border rounded border-dashed p-2">
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                              <div
                                class="avatar-title bg-light text-secondary rounded fs-24"
                              >
                                <i class="ri-image-2-line"></i>
                              </div>
                            </div>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <h5 class="fs-13 mb-1">
                              <a href="#" class="text-body text-truncate d-block"
                                >bg-pattern.png</a
                              >
                            </h5>
                            <div>1.1MB</div>
                          </div>
                          <div class="flex-shrink-0 ms-2">
                            <div class="d-flex gap-1">
                              <button
                                type="button"
                                class="btn btn-icon text-muted btn-sm fs-18"
                              >
                                <i class="ri-download-2-line"></i>
                              </button>
                              <div class="dropdown">
                                <button
                                  class="btn btn-icon text-muted btn-sm fs-18 dropdown"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu">
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-pencil-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Rename</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#"
                                      ><i
                                        class="ri-delete-bin-fill align-bottom me-2 text-muted"
                                      ></i>
                                      Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mt-2 text-center">
                        <button type="button" class="btn btn-success">View more</button>
                      </div>
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
                <!-- end card -->
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end tab pane -->
          <div class="tab-pane fade" id="project-documents" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center mb-4">
                  <h5 class="card-title flex-grow-1">Documents</h5>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive table-card">
                      <table class="table table-borderless align-middle mb-0">
                        <thead class="table-light">
                          <tr>
                            <th scope="col">File Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Size</th>
                            <th scope="col">Upload Date</th>
                            <th scope="col" style="width: 120px">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="avatar-title bg-light text-secondary rounded fs-24"
                                  >
                                    <i class="ri-folder-zip-line"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0)" class="text-dark"
                                      >Artboard-documents.zip</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>Zip File</td>
                            <td>4.57 MB</td>
                            <td>12 Dec 2022</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill me-2 align-bottom text-muted"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-download-2-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="avatar-title bg-light text-danger rounded fs-24"
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0);" class="text-dark"
                                      >Bank Management System</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>8.89 MB</td>
                            <td>24 Nov 2022</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill me-2 align-bottom text-muted"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-download-2-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="avatar-title bg-light text-secondary rounded fs-24"
                                  >
                                    <i class="ri-video-line"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0);" class="text-dark"
                                      >Tour-video.mp4</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>MP4 File</td>
                            <td>14.62 MB</td>
                            <td>19 Nov 2022</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill me-2 align-bottom text-muted"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-download-2-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="avatar-title bg-light text-success rounded fs-24"
                                  >
                                    <i class="ri-file-excel-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0);" class="text-dark"
                                      >Account-statement.xsl</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>XSL File</td>
                            <td>2.38 KB</td>
                            <td>14 Nov 2022</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill me-2 align-bottom text-muted"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-download-2-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="avatar-title bg-light text-warning rounded fs-24"
                                  >
                                    <i class="ri-folder-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0);" class="text-dark"
                                      >Project Screenshots Collection</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>Floder File</td>
                            <td>87.24 MB</td>
                            <td>08 Nov 2022</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill me-2 align-bottom text-muted"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-download-2-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar-sm">
                                  <div
                                    class="avatar-title bg-light text-danger rounded fs-24"
                                  >
                                    <i class="ri-image-2-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0);" class="text-dark"
                                      >Conixi-logo.png</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PNG File</td>
                            <td>879 KB</td>
                            <td>02 Nov 2022</td>
                            <td>
                              <div class="dropdown">
                                <a
                                  href="javascript:void(0);"
                                  class="btn btn-soft-secondary btn-sm btn-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  <i class="ri-more-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill me-2 align-bottom text-muted"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-download-2-fill me-2 align-bottom text-muted"
                                      ></i
                                      >Download</a
                                    >
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-delete-bin-5-fill me-2 align-bottom text-muted"
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
                    </div>
                    <div class="text-center mt-3">
                      <a href="javascript:void(0);" class="text-success"
                        ><i class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                        Load more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end tab pane -->
          <div class="tab-pane fade" id="project-sow" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Statement of Work</h5>
                <div class="row" style="margin-top: -30px;">
                  <span class="col-11"></span>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn-sml rounded-pill bg-info waves-effect waves-light"
                    style="padding: 0;margin-left:-22px"
                    type="button"
                    v-if="!recChanges"
                  >
                    Print
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn-sml rounded-pill bg-warning waves-effect waves-light"
                    style="padding: 0"
                    type="button"
                    v-else
                  >
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Show revised agreement document"
                    >
                      Re-print
                    </span>
                  </button>
                </div>
                <projectMilestones :currId="currId"></projectMilestones>
              </div>
              <!--end card-body-->
            </div>
            <!--end card-->
          </div>
          <!-- end tab pane -->
          <div
            class="modal fade bs-example-modal-xl"
            tabindex="-1"
            aria-labelledby="myExtraLargeModalLabel"
            aria-hidden="true"
            style="display: none"
          >
            <projectLegals :paymentItems="paymentItems" :todayDate="todayDate" :selProject= "selProject"/>
          </div>
          <div class="tab-pane fade" id="project-team" role="tabpanel">
            <div class="row g-4 mb-3">
              <div class="col-sm">
                <div class="d-flex">
                  <div class="search-box me-2">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search member..."
                    />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
              <div class="col-sm-auto">
                <div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#inviteMembersModal"
                  >
                    <i class="ri-share-line me-1 align-bottom"></i> Invite Member
                  </button>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="team-list list-view-filter">
              <div class="card team-box">
                <div class="card-body px-4">
                  <div class="row align-items-center team-row">
                    <div class="col team-settings">
                      <div class="row align-items-center">
                        <div class="col">
                          <div class="flex-shrink-0 me-2">
                            <button type="button" class="btn fs-16 p-0 favourite-btn">
                              <i class="ri-star-fill"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col text-end dropdown">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="ri-more-fill fs-17"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-eye-fill text-muted me-2 align-bottom"></i
                                >View</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-star-fill text-muted me-2 align-bottom"></i
                                >Favourite</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i
                                  class="ri-delete-bin-5-fill text-muted me-2 align-bottom"
                                ></i
                                >Delete</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="team-profile-img">
                        <div class="avatar-lg img-thumbnail rounded-circle">
                          <img
                            src="@/assets/images/users/avatar-2.jpg"
                            alt=""
                            class="img-fluid d-block rounded-circle"
                          />
                        </div>
                        <div class="team-content">
                          <a href="#" class="d-block"
                            ><h5 class="fs-16 mb-1">Laura Van Zyl</h5></a
                          >
                          <p class="text-muted mb-0">Team Leader & HR</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="row text-muted text-center">
                        <div class="col-6 border-end border-end-dashed">
                          <h5 class="mb-1">2</h5>
                          <p class="text-muted mb-0">Projects</p>
                        </div>
                        <div class="col-6">
                          <h5 class="mb-1">17</h5>
                          <p class="text-muted mb-0">Tasks</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col">
                      <div class="text-end">
                        <router-link to="/pages/profile" class="btn btn-light view-btn"
                          >View Profile</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end card-->
              <div class="card team-box">
                <div class="card-body px-4">
                  <div class="row align-items-center team-row">
                    <div class="col team-settings">
                      <div class="row align-items-center">
                        <div class="col">
                          <div class="flex-shrink-0 me-2">
                            <button
                              type="button"
                              class="btn fs-16 p-0 favourite-btn active"
                            >
                              <i class="ri-star-fill"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col text-end dropdown">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="ri-more-fill fs-17"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-eye-fill text-muted me-2 align-bottom"></i
                                >View</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-star-fill text-muted me-2 align-bottom"></i
                                >Favourite</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i
                                  class="ri-delete-bin-5-fill text-muted me-2 align-bottom"
                                ></i
                                >Delete</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="team-profile-img">
                        <div class="avatar-lg img-thumbnail rounded-circle">
                          <div
                            class="avatar-title bg-soft-danger text-danger rounded-circle"
                          >
                            HB
                          </div>
                        </div>
                        <div class="team-content">
                          <a href="#" class="d-block"
                            ><h5 class="fs-16 mb-1">Henry Baird</h5></a
                          >
                          <p class="text-muted mb-0">Full Stack Developer</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="row text-muted text-center">
                        <div class="col-6 border-end border-end-dashed">
                          <h5 class="mb-1">3</h5>
                          <p class="text-muted mb-0">Projects</p>
                        </div>
                        <div class="col-6">
                          <h5 class="mb-1">32</h5>
                          <p class="text-muted mb-0">Tasks</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col">
                      <div class="text-end">
                        <router-link to="/pages/profile" class="btn btn-light view-btn"
                          >View Profile</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end card-->
              <div class="card team-box">
                <div class="card-body px-4">
                  <div class="row align-items-center team-row">
                    <div class="col team-settings">
                      <div class="row align-items-center">
                        <div class="col">
                          <div class="flex-shrink-0 me-2">
                            <button
                              type="button"
                              class="btn fs-16 p-0 favourite-btn active"
                            >
                              <i class="ri-star-fill"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col text-end dropdown">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="ri-more-fill fs-17"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-eye-fill text-muted me-2 align-bottom"></i
                                >View</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-star-fill text-muted me-2 align-bottom"></i
                                >Favourite</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i
                                  class="ri-delete-bin-5-fill text-muted me-2 align-bottom"
                                ></i
                                >Delete</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="team-profile-img">
                        <div class="avatar-lg img-thumbnail rounded-circle">
                          <img
                            src="@/assets/images/users/avatar-3.jpg"
                            alt=""
                            class="img-fluid d-block rounded-circle"
                          />
                        </div>
                        <div class="team-content">
                          <a href="#" class="d-block"
                            ><h5 class="fs-16 mb-1">Alex Raubitschek</h5></a
                          >
                          <p class="text-muted mb-0">Project Manager</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="row text-muted text-center">
                        <div class="col-6 border-end border-end-dashed">
                          <h5 class="mb-1">4</h5>
                          <p class="text-muted mb-0">Projects</p>
                        </div>
                        <div class="col-6">
                          <h5 class="mb-1">18</h5>
                          <p class="text-muted mb-0">Tasks</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col">
                      <div class="text-end">
                        <router-link to="/pages/profile" class="btn btn-light view-btn"
                          >View Profile</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end card-->
              <div class="card team-box">
                <div class="card-body px-4">
                  <div class="row align-items-center team-row">
                    <div class="col team-settings">
                      <div class="row align-items-center">
                        <div class="col">
                          <div class="flex-shrink-0 me-2">
                            <button type="button" class="btn fs-16 p-0 favourite-btn">
                              <i class="ri-star-fill"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col text-end dropdown">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="ri-more-fill fs-17"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-eye-fill text-muted me-2 align-bottom"></i
                                >View</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="ri-star-fill text-muted me-2 align-bottom"></i
                                >Favourite</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i
                                  class="ri-delete-bin-5-fill text-muted me-2 align-bottom"
                                ></i
                                >Delete</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="team-profile-img">
                        <div class="avatar-lg img-thumbnail rounded-circle">
                          <img
                            src="@/assets/images/users/derekm.jpg"
                            alt=""
                            class="img-fluid d-block rounded-circle"
                          />
                        </div>
                        <div class="team-content">
                          <a href="#" class="d-block"
                            ><h5 class="fs-16 mb-1">Derek Macrae</h5></a
                          >
                          <p class="text-muted mb-0">UI/UX Designer</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="row text-muted text-center">
                        <div class="col-6 border-end border-end-dashed">
                          <h5 class="mb-1">3</h5>
                          <p class="text-muted mb-0">Projects</p>
                        </div>
                        <div class="col-6">
                          <h5 class="mb-1">19</h5>
                          <p class="text-muted mb-0">Tasks</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col">
                      <div class="text-end">
                        <router-link to="/pages/profile" class="btn btn-light view-btn"
                          >View Profile</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end card-->
            </div>
            <!-- end team list -->

            <div class="row g-0 text-center text-sm-start align-items-center mb-3">
              <div class="col-sm-6">
                <div>
                  <p class="mb-sm-0">Showing 1 to 4 of 4 entries</p>
                </div>
              </div>
              <!-- end col -->
              <div class="col-sm-6">
                <ul
                  class="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0"
                >
                  <li class="page-item disabled">
                    <a href="#" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                  </li>
                  <li class="page-item"><a href="#" class="page-link">1</a></li>
                  <li class="page-item">
                    <a href="#" class="page-link"
                      ><i class="mdi mdi-chevron-right"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end tab pane -->
          <div class="tab-pane fade" id="project-gantt" role="tabpanel">
            <div class="card">
              <projectGANTT style="height: 900px" :currId="currId"></projectGANTT>
            </div>
            <!-- end team list -->
          </div>
          <!-- end tab pane -->
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
<style>
</style>
