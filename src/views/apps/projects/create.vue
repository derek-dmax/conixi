<script>
import { ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import uuid from "uuid";

import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DropZone from "@/components/widgets/dropZone";
import useVuelidate from "@vuelidate/core";

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import { mapActions } from "vuex";
import moment from 'moment';
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
      selProject: {
        id: uuid(),
        time: "Last update : " + moment().format('Do MMM, YYYY'),
        client: null,
        favourite: false,
        img: require("@/assets/images/brands/dribbble.png"),
        label: "",
        category: "",
        subCategory: "",
        skills: [],
        services: [
                "Application",
                "Training",
            ],
        description: "",
        number: "0/2",
        progressBar: "0%",
        status: "In Progress",
        priority: "Medium",
        tasks: [
          {
                    id: 1,
                    type:gantt.config.types.project, 
                    text: "Project Scoping & Design",
                    progress: 0.4,
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
                    type:gantt.config.types.project, 
                    text: "Design Complete",
                    progress: 0.4,
                    open: true,
                    duration: "12",
                    start_date: moment().add(15, "days"),
                    payment: 100,
                    parent: null,
                    status: "unpaid",
                    changeStatus: false,
                    changeDate: false,
                    changeDescription: false,
                    service: "Application",
                    group: null,
                },
        ],
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
        createdDate: moment().format("DD MMM, YYYY"),
        dueDate: "10 Mar, 2023",
      },
      value: [],
      value3: ["Private"],
      category: ["Designing"],
      client: ["CSG"],
      subCategory: ["Designing"],
      value5: ["Ellen Smith"],
      value1: ["Inprogress"],
      value2: ["High"],
      clients: ["CSG", "Hampshire CC", "Mid-Lothian", "Luton BC"],
      categories: [
        { value: "Asset Management", label: "Asset Management" },
        { value: "Business Strategy", label: "Business Strategy" },
        { value: "Change Management", label: "Change Management" },
        { value: "Construction", label: "Construction" },
        { value: "Engineering", label: "Engineering" },
        { value: "Finance", label: "Finance" },
        { value: "Legal", label: "Legal" },
        { value: "Procurement", label: "Procurement" },
        { value: "Security", label: "Security" },
        { value: "Technology", label: "Technology" },
      ],
      subCategories: [
        { category: "Construction", value: "Architecture", label: "Architecture" },
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
      editor: ClassicEditor,
      editorData: "<p>Add description</p>",
      content: "<h1>Some initial content</h1>",
    };
  },
  methods: {
    ...mapActions("projects", ["createProject"]),
    projectCreate(payload) {
      this.createProject(payload)
      console.log(payload)
      this.$router.push({
        path: '/apps/projects-list'
      })
    },
    deleteRecord(ele) {
      ele.target.parentElement.parentElement.remove();
    },
  },
  components: {
    DropZone,
    Layout,
    PageHeader,
    ckeditor: CKEditor.component,
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
      <button @click="projectCreate(selProject)" class="btn btn-success w-sm col-sm-auto">Create</button>
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

            <div class="mb-3">
              <label class="form-label">Project Description</label>
              <ckeditor v-model="editorData" :editor="editor"></ckeditor>
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
                      { value: 'Inprogress', label: 'Inprogress' },
                      { value: 'Completed', label: 'Completed' },
                    ]"
                  />
                </div>
              </div>
              <div class="col-lg-4">
                <div>
                  <label for="datepicker-deadline-input" class="form-label"
                    >Deadline</label
                  >

                  <flat-pickr
                    v-model="selProject.dueDate"
                    :config="config"
                    class="form-control"
                  ></flat-pickr>
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
          <button type="submit" class="btn btn-success w-sm">Create</button>
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
                v-model="value5"
                :close-on-select="true"
                :searchable="true"
                :create-option="true"
                :options="[
                  { value: 'Brent Gonzalez', label: 'Brent Gonzalez' },
                  { value: 'Darline Williams', label: 'Darline Williams' },
                  { value: 'Sylvia Wright', label: 'Sylvia Wright' },
                  { value: 'Ellen Smith', label: 'Ellen Smith' },
                  { value: 'Jeffrey Salazar', label: 'Jeffrey Salazar' },
                  { value: 'Mark Williams', label: 'Mark Williams' },
                ]"
              />
            </div>

            <div>
              <label class="form-label">Team Members</label>
              <div class="avatar-group">
                <a
                  href="javascript: void(0);"
                  class="avatar-group-item"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="top"
                  title="Brent Gonzalez"
                >
                  <div class="avatar-xs">
                    <img
                      src="@/assets/images/users/avatar-3.jpg"
                      alt=""
                      class="rounded-circle img-fluid"
                    />
                  </div>
                </a>
                <a
                  href="javascript: void(0);"
                  class="avatar-group-item"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="top"
                  title="Sylvia Wright"
                >
                  <div class="avatar-xs">
                    <div class="avatar-title rounded-circle bg-secondary">S</div>
                  </div>
                </a>
                <a
                  href="javascript: void(0);"
                  class="avatar-group-item"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="top"
                  title="Ellen Smith"
                >
                  <div class="avatar-xs">
                    <img
                      src="@/assets/images/users/avatar-4.jpg"
                      alt=""
                      class="rounded-circle img-fluid"
                    />
                  </div>
                </a>
                <a
                  href="javascript: void(0);"
                  class="avatar-group-item"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="top"
                  title="Add Members"
                >
                  <div
                    class="avatar-xs"
                    data-bs-toggle="modal"
                    data-bs-target="#inviteMembersModal"
                  >
                    <div
                      class="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary"
                    >
                      +
                    </div>
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
