<script>
import { ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { v4 as uuidv4 } from "uuid";

import DropZone from "@/components/widgets/dropZone";
import useVuelidate from "@vuelidate/core";

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import { mapActions } from "vuex";
import moment from "moment";
import { gantt } from "dhtmlx-gantt";

export default {
  page: {
    title: "Create Project",
    meta: [{ name: "description", content: appConfig.description }],
  },
  setup() {
    let files = ref([]);
    let dropzoneFile = ref("");
    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
      files.value.push(dropzoneFile.value);
    };
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
      files.value.push(dropzoneFile.value);
    };
    watch(
      () => [...files.value],
      (currentValue) => {
        return currentValue;
      }
    );
    return { dropzoneFile, files, drop, selectedFile, v$: useVuelidate() };
  },
  data() {
    return {
      title: "Create Project",
      cost: 0,
      dueDate: moment().add(2, "month").format("YYYY-MM-DD"),
      items: [
        {
          text: "Projects",
          href: "/",
        },
        {
          text: "Create Project",
          active: true,
        },
      ],
      start_date: moment().add(1, "week").format("YYYY-MM-DD"),
      selProject: {
        id: uuidv4(),
        time: "Last update : " + moment().format("Do MMM, YYYY"),
        client: null,
        favourite: false,
        img: require("@/assets/images/brands/dribbble.png"),
        label: "",
        category: "",
        subCategory: "",
        projectType: "Generic",
        skills: [],
        services: ["Application", "Training"],
        description: "",
        number: "0/2",
        progressBar: "0%",
        status: "In Progress",
        priority: "Medium",
        tenderQuestions: [
          {
            id: "1",
            area: "Experience and Mobilisation",
            title:
              "What is the experience of the person responsible for mobilising the contract, and what other comparable contracts have they successfully mobilised?",
            assigned: ["Derek Macrae"],
            created: moment().subtract(1, "days"),
            status: "Inprogress",
            weighting: 4,
          },
          {
            id: "2",
            area: "Management - Service Development",
            title:
              "What management structure will support this contract? How will this management structure ensure high levels of service delivry constantly, across the Trust?",
            assigned: ["Derek Macrae"],
            created: moment().subtract(1, "days"),
            status: "Inprogress",
            weighting: 4,
          },
          {
            id: "3",
            area: "Service Development - Sustainability",
            title:
              "Sustainability is of high importance to the Trust. Pleas provide your ideas for complementing this, e.g. minimising single plastic use / recyclig etc.",
            assigned: ["Derek Macrae"],
            created: moment().subtract(1, "days"),
            status: "Inprogress",
            weighting: 4,
          },
        ],
        tasks: {
          data: [
            {
              id: 1,
              type: gantt.config.types.project,
              text: "Project Execution",
              progress: 0,
              open: true,
              duration: "12",
              start_date: moment().add(10, "days"),
              payment: 0,
              parent: null,
              status: "unpaid",
              changeStatus: false,
              changeDate: false,
              changeDescription: false,
              service: "Application",
              group: null,
            },
            {
              id: 2,
              type: gantt.config.types.milestone,
              text: "Complete",
              progress: 0,
              open: true,
              duration: "12",
              start_date: moment().add(15, "days"),
              payment: null,
              parent: null,
              status: "unpaid",
              changeStatus: false,
              changeDate: false,
              changeDescription: false,
              service: "Application",
              group: null,
            },
          ],
          links: [{ id: "1", source: "1", target: "2", type: "0" }],
        },
        members: [
          {
            name: "Laura Van Zyl",
            img: require("@/assets/images/users/avatar-2.jpg"),
            projects: 2,
            tasks: 12,
          },
          {
            name: "Alex Raubitschek",
            img: require("@/assets/images/users/avatar-3.jpg"),
            projects: 2,
            tasks: 9,
          },
        ],
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
        createdDate: moment(),
        dueDate: moment("10 Mar, 2023"),
      },
      value: [],
      value3: ["Private"],
      category: ["Designing"],
      client: ["Department of Education"],
      subCategory: ["Designing"],
      projectType: ["Generic"],
      owners: ["Derek Macrae"],
      value1: ["In Progress"],
      value2: ["High"],
      clients: ["Department of Education", "Havering", "Mid-Lothian", "St Albans"],
      categories: [
        { value: "Asset Management", label: "Asset Management", projectType: "Generic" },
        {
          value: "Business Strategy",
          label: "Business Strategy",
          projectType: "Generic",
        },
        {
          value: "Change Management",
          label: "Change Management",
          projectType: "Generic",
        },
        { value: "Construction", label: "Construction", projectType: "Generic" },
        { value: "Engineering", label: "Engineering", projectType: "Generic" },
        { value: "Finance", label: "Finance", projectType: "Generic" },
        { value: "Legal", label: "Legal", projectType: "Generic" },
        { value: "Procurement", label: "Procurement", projectType: "Generic" },
        { value: "Security", label: "Security", projectType: "Generic" },
        { value: "Technology", label: "Technology", projectType: "Generic" },
      ],
      projectTypes: [
        "Generic",
        "Software Development",
        "Building Construction",
        "Groundworks",
      ],
      subCategories: [
        {
          category: "Technology",
          value: "Software Implementation",
          label: "Software Implementation",
          projectType: "Generic",
        },
        {
          category: "Procurement",
          value: "Catering - Schools",
          label: "Catering - Schools",
          projectType: "Generic",
        },
        {
          category: "Construction",
          value: "Architecture",
          label: "Architecture",
          projectType: "Generic",
        },
        {
          category: "Construction",
          value: "Building Control",
          label: "Building Control",
        },
        {
          category: "Construction",
          value: "Construction Project Management",
          label: "Construction Project Management",
        },
        {
          category: "Construction",
          value: "Development Control",
          label: "Development Control",
        },
        {
          category: "Construction",
          value: "Ground Engineering",
          label: "Ground Engineering",
        },
      ],
      skills: [
        {
          category: "Construction",
          subCategory: "Ground Engineering",
          value: "Architect",
          label: "Architect",
        },
        {
          category: "Catering",
          subCategory: "Catering - Schools",
          value: "Catering",
          label: "Catering",
        },
        {
          category: "Technology",
          subCategory: "Software Implementation",
          value: "Project Management",
          label: "Project Management",
        },
        {
          category: "Construction",
          subCategory: "Ground Engineering",
          value: "Ground Preparation",
          label: "Ground Preparation",
        },
        {
          category: "Construction",
          subCategory: "Ground Engineering",
          value: "Civil Engineering",
          label: "Civil Engineering",
        },
        {
          category: "Construction",
          subCategory: "Ground Engineering",
          value: "Surveying",
          label: "Surveying",
        },
        {
          category: "Construction",
          subCategory: "Ground Engineering",
          value: "Site Control",
          label: "Site Control",
        },
      ],
      editorData: "Add description ...",
      content: "<h1>Some initial content</h1>",
    };
  },
  methods: {
    ...mapActions("projects", ["createProject"]),
    descriptionChanged() {

      console.log(this.editorData)
      console.log(this.selProject.skills)
    },
    changedText() {
      if (this.selProject.label.length < 15) return;
      if (
        this.selProject.label.toLowerCase() ===
        "implement helpdesk system".slice(0, this.selProject.label.length)
      ) {
        this.selProject.label = "Implement Helpdesk System";
        (this.cost = 18000),
          (this.selProject.start_date = moment().add(15, "days").format("DD MMM, YYYY")),
          (this.selProject.category = "Technology");
        this.selProject.subCategory = "Software Implementation";
        this.selProject.skills = ["Project Management"];
        this.selProject.owners = ["Laura Van Zyl", "Alex Raubitschek"];
        this.editorData =
          "The project to implement a helpdesk system involves creating a centralized platform that enables efficient communication and issue resolution between customers and support agents.";
      } else if (
        this.selProject.label.toLowerCase() ===
        "education catering".slice(0, this.selProject.label.length)
      ) {
        this.selProject.label = "Department of Education Catering Contract";
        (this.cost = 21000),
          (this.selProject.start_date = moment().add(45, "days").format("DD MMM, YYYY")),
          (this.selProject.category = "Procurement");
        this.selProject.subCategory = "Catering - Schools";
        this.selProject.skills = ["Project Management", "Catering"];
        this.selProject.owners = ["Laura Van Zyl", "Alex Raubitschek"];
        this.editorData =
          "The project is to provide a catering service to a school within the client area.";
      }
    },
    projectCreate(payload) {
      payload.time = moment();
      payload.dueDate = moment(this.dueDate);
      payload.members = this.owners;
      payload.description = this.editorData;
      payload.tasks.data[0].start_date = this.start_date
        ? moment(this.start_date)
        : moment();
      payload.tasks.data[0].duration = moment(this.dueDate)
        .diff(moment(this.start_date), "days")
        .toString();
      payload.tasks.data[1].start_date = moment(this.dueDate);
      payload.tasks.data[1].payment = this.cost;
      payload.tasks.data[1].parent = 0;
      console.log(payload);
      this.createProject(payload);
      this.$router.push({
        path: "/apps/projects-list",
      });
    },
    deleteRecord(ele) {
      ele.target.parentElement.parentElement.remove();
    },
  },
  mounted() {
    console.log(this.start_date);
  },
  components: {
    DropZone,
    Layout,
    PageHeader,
    Multiselect,
    flatPickr,
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row g-4 mb-3">
      <button
        type="submit"
        class="btn btn-secondary w-sm col-sm-auto"
        style="margin-right: 10px"
      >
        Draft
      </button>
      <button @click="projectCreate(selProject)" class="btn btn-success w-sm col-sm-auto">
        Create
      </button>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-7">
                <div class="mb-3 mb-lg-0">
                  <label class="form-label" for="project-title-input">
                    Project Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="selProject.label"
                    id="project-title-input"
                    @change="changedText"
                    @keyup="changedText"
                    placeholder="Enter project title"
                  />
                </div>
              </div>
              <div class="col-lg-5">
                <div class="mb-3 mb-lg-0">
                  <label class="form-label" for="project-thumbnail-img"
                    >Thumbnail Image</label
                  >
                  <input
                    class="form-control"
                    id="project-thumbnail-img"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
              </div>
            </div>

            <div class="mb-3 mt-2">
              <label for="projDesc" class="form-label">Project Description</label>

              <textarea
                id="projDesc"
                name="projDesc"
                rows="6"
                class="form-control"
                v-model="editorData"
                @input="descriptionChanged"
              >
              </textarea>
            </div>

            <div class="row">
              <div class="col-lg-4">
                <div class="mb-3 mb-lg-0">
                  <label for="cost-input" class="form-label">Project Total Cost</label>
                  <input
                    class="form-control"
                    id="cost-input"
                    type="number"
                    v-model="cost"
                  />
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3 mb-lg-0">
                  <label for="choices-status-input" class="form-label">Start Date</label>
                  <flat-pickr v-model="start_date" class="form-control"></flat-pickr>
                </div>
              </div>
              <div class="col-lg-4">
                <div>
                  <label for="datepicker-deadline-input" class="form-label"
                    >Deadline</label
                  >

                  <flat-pickr v-model="dueDate" class="form-control"></flat-pickr>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4">
                <div class="mb-3 mb-lg-0">
                  <label for="choices-priority-input" class="form-label">Priority</label>

                  <Multiselect
                    v-model="selProject.priority"
                    :close-on-select="true"
                    :searchable="true"
                    :create-option="true"
                    :options="[
                      { value: 'High', label: 'High' },
                      { value: 'Medium', label: 'Medium' },
                      { value: 'Low', label: 'Low' },
                    ]"
                  />
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3 mb-lg-0">
                  <label for="choices-status-input" class="form-label">Status</label>

                  <Multiselect
                    v-model="selProject.status"
                    :close-on-select="true"
                    :searchable="true"
                    :create-option="true"
                    :options="[
                      { value: 'Tendering', label: 'Tendering' },
                      { value: 'In Progress', label: 'In Progress' },
                      { value: 'Completed', label: 'Completed' },
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->

        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Attached files</h5>
          </div>
          <div class="card-body">
            <div>
              <p class="text-muted">Add Attached files here.</p>

              <DropZone @drop.prevent="drop" @change="selectedFile" />

              <div class="border rounded" v-for="(file, index) of files" :key="index">
                <div class="d-flex p-2">
                  <div class="flex-grow-1">
                    <div class="pt-1">
                      <h5 class="fs-14 mb-1" data-dz-name="">
                        {{ file.name }}
                      </h5>
                      <p class="fs-13 text-muted mb-0" data-dz-size="">
                        <strong>{{ file.size / 1024 }}</strong> KB
                      </p>
                      <strong class="error text-danger" data-dz-errormessage=""></strong>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ms-3">
                    <button
                      data-dz-remove=""
                      class="btn btn-sm btn-danger"
                      @click="deleteRecord"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->
        <div class="text-end mb-4">
          <button type="submit" class="btn btn-secondary w-sm me-1">Draft</button>
          <button
            type="submit"
            class="btn btn-success w-sm"
            @click="projectCreate(selProject)"
          >
            Create
          </button>
        </div>
      </div>
      <!-- end col -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Dimensions</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="choices-categories-input" class="form-label">Client</label>
              <Multiselect
                v-model="selProject.client"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="clients"
              />
            </div>
            <div class="mb-3">
              <label for="choices-categories-input" class="form-label">Category</label>
              <Multiselect
                v-model="selProject.category"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="categories"
              />
            </div>
            <div class="mb-3">
              <label for="choices-categories-input" class="form-label"
                >Sub-Category</label
              >
              <Multiselect
                v-model="selProject.subCategory"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="subCategories"
              />
            </div>
            <div class="mb-3">
              <label for="choices-categories-input" class="form-label"
                >Project Type</label
              >
              <Multiselect
                v-model="selProject.projectType"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="projectTypes"
              />
            </div>
            <div>
              <label for="choices-text-input" class="form-label">Skills</label>
              <Multiselect
                class="form-control"
                v-model="selProject.skills"
                mode="tags"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="skills"
              />
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->

        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Members</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="choices-lead-input" class="form-label">Owner</label>
              <Multiselect
                v-model="owners"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="[
                  { value: 'Derek Macrae', label: 'Derek Macrae' },
                  { value: 'Laura Van Zyl', label: 'Laura Van Zyl' },
                  { value: 'Alex Raubitschek', label: 'Alex Raubitschek' },
                  { value: 'Ellen Smith', label: 'Ellen Smith' },
                  { value: 'Jeffrey Salazar', label: 'Jeffrey Salazar' },
                  { value: 'Mark Williams', label: 'Mark Williams' },
                ]"
              />
            </div>

            <div>
              <label class="form-label">Team Members</label>
              <div class="avatar-group" v-if="owners.length === 1">
                <a
                  href="javascript: void(0);"
                  class="avatar-group-item"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="top"
                  title="Derek Macrae"
                >
                  <div class="avatar-xs">
                    <img
                      src="@/assets/images/users/derekm.jpg"
                      alt=""
                      class="rounded-circle img-fluid"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Privacy</h5>
          </div>
          <div class="card-body">
            <div>
              <label for="choices-privacy-status-input" class="form-label">Status</label>
              <Multiselect
                v-model="value3"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="[
                  { value: 'Private', label: 'Private' },
                  { value: 'Team', label: 'Team' },
                  { value: 'Public', label: 'Public' },
                ]"
              />
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
<style>
.form-control-inline {
  position: relative;
  width: 89%;
  left: 11%;
  top: -36px;
  display: block;
  padding: 0.5rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--vz-body-color);
  background-color: var(--vz-input-bg);
  background-clip: padding-box;
  border: 1px solid var(--vz-input-border);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
