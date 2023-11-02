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
      supplierArray: [],
      tenderAreas: [
        {
          area: "Experience and Mobilisation",
          weighting: 50,
          questions: [
            {
              id: "1",
              question:
                "What is the experience of the person responsible for mobilising the contract, and what other comparable contracts have they successfully mobilised?",
              assigned: ["Derek Macrae"],
              created: moment().subtract(1, "days"),
              status: "Inprogress",
              weighting: 50,
            },
          ],
        },
        {
          area: "Management - Service Development",
          weighting: 45,
          questions: [
            {
              id: "2",
              area: "Management - Service Development",
              question:
                "What management structure will support this contract? How will this management structure ensure high levels of service delivery constantly, across the organisation?",
              assigned: ["Derek Macrae"],
              created: moment().subtract(1, "days"),
              status: "Inprogress",
              weighting: 45,
            },
          ],
        },
        {
          area: "Service Development - Sustainability",
          weighting: 35,
          questions: [
            {
              id: "3",
              area: "Service Development - Sustainability",
              question:
                "Sustainability is of high importance to the organisation. Please provide your ideas for complementing this, e.g. minimising single plastic use / recyclig etc.",
              assigned: ["Derek Macrae"],
              created: moment().subtract(1, "days"),
              status: "Inprogress",
              weighting: 35,
            },
          ],
        },
      ],
      recChanges: false,
      todayDate: moment().format("Do") + " day of " + moment().format("MMMM YYYY"),
      yesterdayDate: moment().subtract(1, "days").format("Do MMM, YYYY"),
      currId: 1,
      tenderView: false,
      userName: localStorage.getItem("userName"),
      refreshModal: false,
      tour: null,
      taskDueDate: null,
      area: {
        area: "",
        weighting: 5,
        questions: [],
      },
      question: {
        id: null,
        area: "",
        title: "",
        assigned: [],
        created: moment(),
        status: "Inprogress",
        weighting: 5,
        suppliers: [],
      },
      task: {
        id: null,
        text: "",
        start_date: null,
        parent: 0,
        duration: 0,
        progress: 0,
        open: true,
        payment: 0,
        status: "New",
        changePayment: false,
        changeStatus: false,
        changeDate: false,
        changeDescription: false,
        service: null,
        group: null,
      },
    };
  },
  created() {
    this.userType = localStorage.getItem("userType");
    const queryParams = new URLSearchParams(window.location.search);
    this.currId = queryParams.get("id");
    this.tenderView = Boolean(queryParams.get("tenderView"));
    console.log(this.tenderView);

    this.selProject = this.projectList[this.currId];
    const suppKeys = Object.keys(this.supplierList);
    suppKeys.forEach((key) => {
      let rec = this.supplierList[key];
      this.supplierArray.push({
        id: key,
        name: rec.name,
        image_src: rec.image_src,
        star_value: rec.star_value,
        selected: false,
      });
    });
    this.supplierArray.sort((a, b) => {
      return Number(b.star_value) - Number(a.star_value);
    });
  },
  mounted() {
    this.createTour();
    console.log(this.projectList);
    console.log(this.selProject.tenderQuestions);
  },
  computed: {
    ...mapGetters("projects", ["projectList"]),
    ...mapGetters("suppliers", ["supplierList"]),
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
    ...mapActions("projects", ["updateProject", "insertTask", "updateProjectSuppliers"]),
    insertSelectedSuppliers() {
      let suppliers = [];
      this.supplierArray.forEach((supplier) => {
        if (supplier.selected) {
          suppliers.push({
            name: supplier.name,
            img: supplier.image_src,
            status: "Invited",
            score: 0
          });
        }
      });
      this.updateProjectSuppliers({
        id: this.selProject.id,
        updates: { suppliers: suppliers },
      });
    },
    insertArea() {
      let passArea = Object.assign({}, this.area); // avoid "by reference" issues
      this.tenderAreas.push(passArea);
      document.getElementById("addAreaBtn-close").click();
      this.refreshModal = !this.refreshModal;
      this.area = {
        area: "",
        weighting: 5,
        questions: [],
      };
    },
    insertQuestion() {
      let passQuestion = Object.assign({}, this.question); // avoid "by reference" issues
      let tenderQuestions = Object.assign([], this.selProject.tenderQuestions);
      passQuestion.id = tenderQuestions ? Object.keys(tenderQuestions).length : 0;
      tenderQuestions[passQuestion.id.toString()] = passQuestion;
      this.updateProject({
        id: this.selProject.id,
        updates: { tenderQuestions },
      });
      document.getElementById("addQuestionBtn-close").click();
      this.refreshModal = !this.refreshModal;
      this.question.title = "";
    },
    buildTaskAndInsert() {
      let passTask = Object.assign({}, this.task); // avoid "by reference" issues
      let maxid = 0;
      this.selProject.tasks.data.map(function (obj) {
        if (obj.id > maxid) passTask.id = obj.id;
      });
      passTask.id += 1;
      passTask.start_date = moment(this.taskDueDate).subtract(this.task.duration, "days");
      console.log(passTask);
      this.insertTask({ id: this.selProject.id, task: passTask });
      this.clearTask();
      document.getElementById("addTaskBtn-close").click();
      this.refreshModal = !this.refreshModal;
    },
    clearTask() {
      this.taskDueDate = null;
      this.task.text = null;
      this.task.duration = 0;
      this.task.payment = 0;
    },
    createTour() {
      this.tour = this.$shepherd({
        defaultStepOptions: {
          cancelIcon: {
            enabled: true,
          },
          scrollTo: { behavior: "smooth", block: "center" },
        },
        useModalOverlay: true,
      });
      this.tour.addStep({
        id: "overview-tour",
        title: "Overview",
        text: "The overview tab shows the main information held against the project.",
        attachTo: {
          element: "#overview-step",
          on: "bottom",
          scrollTo: true,
        },
        beforeShowPromise: function () {
          return new Promise(function (resolve) {
            console.log("Testing");
            let element = document.getElementById("overview-step");
            element.click();
            resolve();
          });
        },
        buttons: [
          {
            text: "Next",
            action: this.tour.next,
          },
        ],
      });
      this.tour.addStep({
        id: "sow-tour",
        title: "Statement of Work",
        text: "The Statement of Work tab shows the tasks and milestones of the project.",
        attachTo: {
          element: "#sow-step",
          on: "bottom",
          scrollTo: true,
        },
        beforeShowPromise: function () {
          return new Promise(function (resolve) {
            let element = document.getElementById("sow-step");
            element.click();
            resolve();
          });
        },
        buttons: [
          {
            text: "Next",
            action: this.tour.next,
          },
        ],
      });
      this.tour.addStep({
        id: "doc-tour",
        title: "Documents",
        text: "The Documents tab shows all documents attached to the project.",
        attachTo: {
          element: "#doc-step",
          on: "bottom",
          scrollTo: true,
        },
        beforeShowPromise: function () {
          return new Promise(function (resolve) {
            let element = document.getElementById("doc-step");
            element.click();
            resolve();
          });
        },
        buttons: [
          {
            text: "Next",
            action: this.tour.next,
          },
        ],
      });
      this.tour.addStep({
        id: "team-tour",
        title: "Team",
        text: "The Team tab shows the owner(s) and Approver for the project.",
        attachTo: {
          element: "#team-step",
          on: "bottom",
          scrollTo: true,
        },
        beforeShowPromise: function () {
          return new Promise(function (resolve) {
            let element = document.getElementById("team-step");
            element.click();
            resolve();
          });
        },
        buttons: [
          {
            text: "Next",
            action: this.tour.next,
          },
        ],
      });
      this.tour.addStep({
        id: "proj-tour",
        title: "Project Plan",
        text: "The Project Plan tab shows a GANTT chart view of the project.",
        attachTo: {
          element: "#proj-step",
          on: "bottom",
          scrollTo: true,
        },
        beforeShowPromise: function () {
          return new Promise(function (resolve) {
            let element = document.getElementById("proj-step");
            element.click();
            resolve();
          });
        },
        buttons: [
          {
            text: "Next",
            action: this.tour.next,
          },
        ],
      });
    },
    startTour() {
      this.tour.start();
    },
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
                            Created :
                            <span class="fw-medium">{{
                              selProject.createdDate.format("DD-MMM-YY")
                            }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Category :
                            <span class="fw-medium">{{ selProject.category }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Sub Cat :
                            <span class="fw-medium">{{ selProject.subCategory }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Type :
                            <span class="fw-medium">{{ selProject.projectType }}</span>
                          </div>
                          <div class="vr"></div>
                          <div>
                            Due Date :
                            <span class="fw-medium">{{
                              selProject.dueDate.format("DD-MMM-YY")
                            }}</span>
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
                    <button class="btn avatar-xs mt-n1 p-0" @click="startTour">
                      <span class="bg-transparent fs-20">
                        <i class="ri-question-line"></i>
                      </span>
                    </button>
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
                    id="overview-step"
                    class="nav-link fw-semibold"
                    :class="{ active : !tenderView }"
                    data-bs-toggle="tab"
                    href="#project-overview"
                    role="tab"
                  >
                    Overview
                  </a>
                </li>
                <li class="nav-item" v-if="selProject.status === 'Tendering'">
                  <a
                    id="tender-step"
                    class="nav-link fw-semibold"
                    data-bs-toggle="tab"
                    href="#project-tender"
                    role="tab"
                  >
                    Tender
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    id="sow-step"
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
                    id="doc-step"
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
                    id="team-step"
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
                    id="proj-step"
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
          <div class="tab-pane" :class="{ active : !tenderView, show : !tenderView, fade : tenderView }" id="project-overview" role="tabpanel">
            <div class="row">
              <div class="col-xl-9 col-lg-8">
                <div class="card">
                  <div class="card-body">
                    <div class="text-muted">
                      <h6 class="mb-3 fw-semibold text-uppercase">Summary</h6>
                      <p class="mb-3">The following services are involved:</p>
                      <ul>
                        <li
                          class="text-muted mb-0"
                          v-for="(service, index) in selProject.services"
                          :key="index"
                        >
                          {{ service }}
                        </li>
                      </ul>
                      <p class="mt-3">
                        {{ selProject.description }}
                      </p>
                      <ul
                        class="ps-4 vstack gap-2"
                        v-if="selProject.label != 'Implement Helpdesk System'"
                      >
                        <li>Product Design, Figma (Software), Prototype</li>
                        <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                        <li>Create calendar, chat and email app pages.</li>
                        <li>Add authentication pages.</li>
                        <li>Content listing.</li>
                      </ul>

                      <div>
                        <button
                          type="button"
                          class="btn btn-link link-success p-0"
                          v-if="selProject.label != 'Implement Helpdesk System'"
                        >
                          Read more
                        </button>
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

                  <div class="card-body" v-if="selProject.status !== 'Tendering'">
                    <div data-simplebar style="height: 300px" class="px-3 mx-n3">
                      <div class="d-flex mb-4" v-if="userName != 'Val Dugan'">
                        <div class="flex-shrink-0">
                          <img
                            src="@/assets/images/users/avatar-6.jpg"
                            alt=""
                            class="avatar-xs rounded-circle"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="fs-13">
                            Val Dugan
                            <small class="text-muted ms-2">{{
                              yesterdayDate + " - 05:47PM"
                            }}</small>
                          </h5>
                          <p class="text-muted">The new design is now ready to test.</p>
                          <a href="javascript: void(0);" class="badge text-muted bg-light"
                            ><i class="mdi mdi-reply"></i> Reply</a
                          >
                        </div>
                      </div>
                      <div class="d-flex mb-1" v-if="userName != 'Val Dugan'">
                        <div class="flex-shrink-0">
                          <img
                            src="@/assets/images/users/avatar-8.jpg"
                            alt=""
                            class="avatar-xs rounded-circle"
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="fs-13">
                            Donald Palmer
                            <small class="text-muted ms-2">{{
                              yesterdayDate + "- 06:20PM"
                            }}</small>
                          </h5>
                          <p class="text-muted">OK, I will take a look tomorrow.</p>
                          <a href="javascript: void(0);" class="badge text-muted bg-light"
                            ><i class="mdi mdi-reply"></i> Reply</a
                          >
                        </div>
                      </div>
                    </div>
                    <form>
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
              <!-- end col -->
              <div class="col-xl-3 col-lg-4">
                <div class="card">
                  <div class="card-header align-items-center d-flex border-bottom-dashed">
                    <h4 class="card-title mb-0 flex-grow-1">Approver(s)</h4>
                    <div class="flex-shrink-0">
                      <button
                        type="button"
                        class="btn btn-soft-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#inviteMembersModal"
                        v-if="userName != 'Val Dugan'"
                      >
                        <i class="ri-share-line me-1 align-bottom"></i> Invite Approver
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
                                      >Message</a
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

                <div class="card" v-if="userName != 'Val Dugan'">
                  <div class="card-header align-items-center d-flex border-bottom-dashed">
                    <h4 class="card-title mb-0 flex-grow-1">Supplier(s)</h4>
                    <div class="flex-shrink-0">
                      <button type="button" class="btn btn-sm btn-warning">
                        <span class="icon-on">
                          <i class="ri-share-line me-1 align-bottom"></i>
                          <a
                            class="edit-folder-list"
                            style="color: white !important"
                            href="#inviteSupplierModal"
                            data-bs-toggle="modal"
                            role="button"
                            >Invite Supplier(s)</a
                          >
                        </span>
                      </button>
                    </div>
                  </div>

                  <div class="card-body">
                    <div data-simplebar style="height: 250px" class="mx-n3 px-3">
                      <div class="vstack gap-3">
                        <div
                          class="d-flex align-items-center"
                          v-for="(supplier, index) in selProject.suppliers"
                          :key="index"
                        >
                          <div class="avatar-xs flex-shrink-0 me-3">
                            <img
                              :src="supplier.img"
                              alt=""
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1">
                            <h5 class="fs-13 mb-0">
                              <a href="#" class="text-body d-block">{{
                                supplier.name
                              }}</a>
                            </h5>
                          </div>
                          <div class="flex-shrink-0">
                            <div class="d-flex align-items-center gap-1">
                              <h5 class="fs-13 mb-0">
                                <a href="#" class="text-body d-block">{{
                                  supplier.status
                                }}</a>
                              </h5>
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
                                        class="ri-chat-3-line text-muted me-2 align-bottom"
                                      ></i
                                      >Message</a
                                    >
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-eye-fill text-muted me-2 align-bottom"
                                      ></i
                                      >View</a
                                    >
                                  </li>
                                  <li v-if="supplier.status != 'Approved'">
                                    <a class="dropdown-item" href="javascript:void(0);"
                                      ><i
                                        class="ri-award-line text-muted me-2 align-bottom"
                                      ></i
                                      >Respond</a
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
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end tab pane -->
          <div class="tab-pane fade" id="project-documents" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <div class="row pa-2" style="margin-bottom: 30px; margin-top: -7px">
                  <h5 class="card-title col-4">Documents</h5>
                  <div class="col-3"></div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn btn-sm btn-info active"
                    type="button"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>Proj
                      Brief</span
                    >
                  </button>
                  <div class="col-1"></div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn btn-sm btn-info active"
                    type="button"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>SOW</span
                    >
                  </button>
                  <div class="col-1"></div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn btn-sm btn-info active btn-nudge-left"
                    type="button"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>Contract</span
                    >
                  </button>
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
                                    class="avatar-title bg-light text-danger rounded fs-24"
                                  >
                                    <i class="ri-file-pdf-fill"></i>
                                  </div>
                                </div>
                                <div class="ms-3 flex-grow-1">
                                  <h5 class="fs-14 mb-0">
                                    <a href="javascript:void(0);" class="text-dark"
                                      >Project Brief v1.1</a
                                    >
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>PDF File</td>
                            <td>8.89 MB</td>
                            <td>{{ selProject.createdDate.format("DD-MMM-YY") }}</td>
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
                            <td>{{ selProject.createdDate.format("DD-MMM-YY") }}</td>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end tab pane -->
          <div class="tab-pane fade" id="project-sow" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <h5 class="card-title col-4">Statement of Work</h5>
                  <button
                    type="button"
                    class="col-1 btn btn-sm btn-success active btn-nudge-left"
                  >
                    <span class="icon-on">
                      <i class="ri-add-circle-line align-bottom me-1"></i>
                      <a
                        class="edit-folder-list"
                        style="color: white !important"
                        href="#insertTaskModal"
                        data-bs-toggle="modal"
                        role="button"
                        >Add Task</a
                      >
                    </span>
                  </button>
                  <div class="col-2"></div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn btn-sm btn-info active"
                    type="button"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>Proj
                      Brief</span
                    >
                  </button>
                  <div class="col-1"></div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn btn-sm btn-info active"
                    type="button"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>SOW</span
                    >
                  </button>
                  <div class="col-1"></div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target=".bs-example-modal-xl"
                    class="col-1 btn btn-sm btn-info active btn-nudge-left"
                    type="button"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>Contract</span
                    >
                  </button>
                </div>
                <projectMilestones
                  :currId="currId"
                  :key="refreshModal"
                ></projectMilestones>
              </div>
              <!--end card-body-->
            </div>
            <!--end card-->
          </div>
          <!-- end tab pane -->
          <div class="tab-pane" :class="{ active : tenderView, show : tenderView, fade : !tenderView }" id="project-tender" role="tabpanel">
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <h5 class="card-title col-6 fs-20">Tender</h5>
                  <button
                    type="button"
                    class="col-1 btn btn-sm btn-success active btn-nudge-left"
                    v-if="userType !== 'supplier'"
                  >
                    <span class="icon-on">
                      <i class="ri-add-circle-line align-bottom me-1"></i>
                      <a
                        class="edit-folder-list"
                        style="color: white !important"
                        href="#addAreaModal"
                        data-bs-toggle="modal"
                        role="button"
                        >New Area</a
                      >
                    </span>
                  </button>
                  <button
                    type="button"
                    class="col-2 btn btn-sm btn-success active btn-nudge-left"
                    v-else
                  >
                    <span class="icon-on fs-20">
                      <i class="ri-save-line align-bottom me-1"></i>
                      <a
                        class="edit-folder-list"
                        style="color: white !important"
                        href="#addAreaModal"
                        data-bs-toggle="modal"
                        role="button"
                        >Save Responses</a
                      >
                    </span>
                  </button>
                  <div class="col-1"></div>
                  <button
                    href="#addQuestionModal"
                    data-bs-toggle="modal"
                    class="col-1 btn btn-sm btn-info active"
                    type="button"
                    v-if="userType !== 'supplier'"
                  >
                    <span class="icon-on"
                      ><i class="ri-file-paper-line align-bottom me-1"></i>New
                      Question</span
                    >
                  </button>
                  <button
                    href="#addQuestionModal"
                    data-bs-toggle="modal"
                    class="col-2 btn btn-sm btn-danger active"
                    type="button"
                    v-else
                  >
                    <span class="icon-on fs-20"
                      ><i class="ri-mail-lock-line align-bottom me-1"></i>Submit &
                      Lock</span
                    >
                  </button>
                </div>
                <div
                  v-for="(area, ind1) in tenderAreas"
                  :key="ind1"
                  style="font-size: 18px"
                >
                  {{ ind1 + 1 }} - {{ area.area }}
                  <table class="table" v-if="userType !== 'supplier'">
                    <tbody>
                      <tr v-for="(tq, index) in selProject.tenderQuestions.filter(tqu => tqu.area === area.area)" :key="index">
                        <td :style="{ width: tq.suppliers.length ? '30%' : '100%' }">{{ ind1 + 1 }}.{{ index + 1 }} {{ tq.title }}</td>
                        <td style="width:70%" v-if="tq.suppliers.length">
                          <div v-for="supplier in tq.suppliers" :key="supplier.name" class="row mb-2">
                            <div class="col-2"><strong>Supplier</strong></div>
                            <div class="col-9"><strong>Response</strong></div>
                            <div class="col-1"><strong>Score</strong></div>
                            <div class="col-2">{{supplier.name}}</div>
                            <div class="col-9">{{ supplier.response}}</div>
                            <div class="col-1">
                              {{ supplier.score }}/{{ area.weighting}}
                              <i class="ri-pencil-fill fs-16" style="cursor:pointer" title="Enter Score"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table" v-else>
                    <tbody>
                      <tr v-for="(tq, index) in area.questions" :key="index">
                        <td>{{ ind1 + 1 }}.{{ index + 1 }} {{ tq.question }}</td>
                        <td style="width: 60%">
                          <textarea
                            rows="4"
                            style="width: 100%"
                            :placeholder="
                              'Enter response to ' +
                              (ind1 + 1) +
                              '.' +
                              (index + 1) +
                              ' here.'
                            "
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
            <projectLegals :todayDate="todayDate" :selProject="selProject" />
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
              <div
                class="card team-box"
                v-for="(member, index) in selProject.members"
                :key="index"
              >
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
                            :src="member.img"
                            alt=""
                            class="img-fluid d-block rounded-circle"
                          />
                        </div>
                        <div class="team-content">
                          <a href="#" class="d-block"
                            ><h5 class="fs-16 mb-1">{{ member.name }}</h5></a
                          >
                          <p class="text-muted mb-0">{{ member.role }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col">
                      <div class="row text-muted text-center">
                        <div class="col-6 border-end border-end-dashed">
                          <h5 class="mb-1">{{ member.projects }}</h5>
                          <p class="text-muted mb-0">Projects</p>
                        </div>
                        <div class="col-6">
                          <h5 class="mb-1">{{ member.tasks }}</h5>
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
                  <p class="mb-sm-0">
                    Showing 1 to {{ selProject.members.length }} of
                    {{ selProject.members.length }} entries
                  </p>
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
              <projectGANTT
                style="height: 900px"
                :currId="currId"
                :key="refreshModal"
              ></projectGANTT>
            </div>
            <!-- end team list -->
          </div>
          <!-- end tab pane -->
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <!-- START Insert Task MODAL -->
    <div
      class="modal fade zoomIn"
      id="insertTaskModal"
      tabindex="-1"
      aria-labelledby="insertTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-success">
            <h5 class="modal-title" id="insertTaskModalLabel">Insert Task</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              id="addTaskBtn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              autocomplete="off"
              class="needs-validation insertTask-form"
              id="insertTask-form"
              novalidate
            >
              <div class="mb-4">
                <label for="taskname-input" class="form-label">Task Name</label>
                <input
                  v-model="task.text"
                  type="text"
                  class="form-control"
                  id="taskname-input"
                  required
                />
                <div class="invalid-feedback">Please enter a task name.</div>
                <input type="hidden" class="form-control" id="taskid-input" value="" />
              </div>
              <div class="mb-4">
                <label for="taskdue-input" class="form-label">Due Date</label>
                <input
                  v-model="taskDueDate"
                  type="date"
                  class="form-control"
                  id="taskdue-input"
                  required
                />
                <div class="invalid-feedback">Please enter a due date.</div>
              </div>
              <div class="mb-4">
                <label for="taskduration-input" class="form-label">Duration (days)</label>
                <input
                  v-model="task.duration"
                  type="number"
                  class="form-control"
                  id="taskduration-input"
                  required
                />
                <div class="invalid-feedback">Please enter a duration.</div>
              </div>
              <div class="mb-4">
                <label for="taskpayment-input" class="form-label">Payment</label>
                £
                <input
                  v-model="task.payment"
                  type="number"
                  class="form-control"
                  id="taskpayment-input"
                />
              </div>
              <div class="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-ghost-success"
                  data-bs-dismiss="modal"
                >
                  <i class="ri-close-line align-bottom"></i> Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="addNewTask"
                  @click="buildTaskAndInsert"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Insert Task MODAL -->
    <!-- START Add New Area MODAL -->
    <div
      class="modal fade zoomIn"
      id="addAreaModal"
      tabindex="-1"
      aria-labelledby="addAreaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-success">
            <h5 class="modal-title" id="addAreaModalLabel">Add Tender Area</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              id="addAreaBtn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              autocomplete="off"
              class="needs-validation addArea-form"
              id="addArea-form"
              novalidate
            >
              <div class="mb-4">
                <label for="taskname-input" class="form-label">Area Name</label>
                <input
                  v-model="area.area"
                  type="text"
                  class="form-control"
                  id="areaname-input"
                  required
                />
                <div class="invalid-feedback">
                  Please enter a name for this area of questioning.
                </div>
                <input type="hidden" class="form-control" id="areaid-input" value="" />
              </div>
              <div class="mb-4">
                <label for="areaWeight-input" class="form-label">Area Weighting</label>
                <input
                  v-model="area.weighting"
                  type="number"
                  class="form-control"
                  id="areaWeight-input"
                  required
                />
                <div class="invalid-feedback">
                  Please enter a weighting from 1-10 for this area.
                </div>
              </div>
              <div class="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-ghost-success"
                  data-bs-dismiss="modal"
                >
                  <i class="ri-close-line align-bottom"></i> Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="insertArea"
                  @click="insertArea"
                >
                  Add Area
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Add New Area MODAL -->
    <!-- START Add New Question MODAL -->
    <div
      class="modal fade zoomIn"
      id="addQuestionModal"
      tabindex="-1"
      aria-labelledby="addQuestionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-success">
            <h5 class="modal-title" id="addQuestionModalLabel">Add Question to Area</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              id="addQuestionBtn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              autocomplete="off"
              class="needs-validation addQuestion-form"
              id="addQuestion-form"
              novalidate
            >
              <div class="mb-4">
                <label for="taskname-input" class="form-label">Area Name</label>
                <select
                  v-model="question.area"
                  class="form-select"
                  id="questionArea-input"
                  required
                >
                  <option
                    v-for="(area, index) in tenderAreas"
                    :key="index"
                    :value="area.area"
                  >
                    {{ area.area }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  Please enter an area to add the question to.
                </div>
                <input
                  type="hidden"
                  class="form-control"
                  id="questionid-input"
                  value=""
                />
              </div>
              <div class="mb-4">
                <label for="taskname-input" class="form-label">Question</label>
                <input
                  v-model="question.title"
                  type="text"
                  class="form-control"
                  id="question-input"
                  required
                />
                <div class="invalid-feedback">Please enter a question.</div>
              </div>
              <div class="mb-4">
                <label for="questionWeight-input" class="form-label"
                  >Question Weighting</label
                >
                <input
                  v-model="question.weighting"
                  type="number"
                  class="form-control"
                  id="questionWeight-input"
                  required
                />
                <div class="invalid-feedback">
                  Please enter a weighting from 1-10 for this area.
                </div>
              </div>
              <div class="hstack gap-2 justify-content-end">
                <button
                  id="addQuestionBtn-close"
                  type="button"
                  class="btn btn-ghost-success"
                  data-bs-dismiss="modal"
                >
                  <i class="ri-close-line align-bottom"></i> Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="insertQuestion"
                  @click="insertQuestion"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Add New Question MODAL -->
    <!-- START Invite Supplier MODAL -->
    <div
      class="modal fade zoomIn"
      id="inviteSupplierModal"
      tabindex="-1"
      aria-labelledby="inviteSupplierModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header p-3 bg-soft-warning">
            <h5 class="modal-title" id="inviteSupplierModalLabel">Invite Suppliers</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              id="inviteSupplierBtn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              autocomplete="off"
              class="needs-validation inviteSupplier-form"
              id="inviteSupplier-form"
              novalidate
            >
              <div
                class="mb-1 row"
                v-for="(supplier, index) in supplierArray"
                :key="'su-' + index"
              >
                <div class="col-3 avatar-xs px-1 mx-0">
                  <img
                    :src="supplier.image_src"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <p class="col-5">
                  {{ supplier.name }}
                </p>
                <p class="col-2">
                  <span class="star_value">{{ supplier.star_value }}</span>
                  <i class="ri-star-fill text-warning align-bottom"></i>
                </p>
                <div class="form-check fs-14 col-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheck20"
                    v-model="supplier.selected"
                  />
                  <label class="form-check-label" for="flexCheck20">Invite?</label>
                </div>
              </div>
              <div class="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-ghost-success"
                  data-bs-dismiss="modal"
                >
                  <i class="ri-close-line align-bottom"></i> Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="addNewTask"
                  @click="buildTaskAndInsert"
                >
                  Invite All
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="inviteSelectedSuppliers"
                  @click="insertSelectedSuppliers"
                >
                  Invite Selected
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Invite Supplier MODAL -->
  </Layout>
</template>
<style>
.btn-nudge-left {
  position: relative;
  left: -24px;
}
</style>
