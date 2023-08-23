<template>
    <div class="container">
      <div class="row justify-content-center mb-0">
        <div class="col-lg-8">
          <div class="text-center mb-2">
            <section v-if="!baseComplete">
              <h3 class="mb-3 fw-semibold d-none d-md-block" v-if="width > 700">Register for Project Work</h3>
              <h5 v-else class="mb-3 fw-semibold text-center">Registering for Work</h5>
              <p class="text-muted ff-secondary"
                :class="{ 'fs-4': width > 700, 'fs-6': width <= 700, 'mb-4': width > 700, 'mb-0': width <= 700 }">
                3 simple steps to register.
              </p>
            </section>
            <section v-if="!empDetailsComplete && baseComplete">
              <h3 class="mb-3 fw-semibold" v-if="width > 700">Registering for Work</h3>
              <h5 v-else class="mb-3 fw-semibold text-center">Registering for Work</h5>
              <p class="text-muted ff-secondary"
                :class="{ 'fs-4': width > 700, 'fs-6': width <= 700, 'mb-4': width > 700, 'mb-0': width <= 700 }">
                2 more steps to go to finish.
              </p>
            </section>
            <section v-if="empDetailsComplete && !workers.length">
              <h3 class="mb-3 fw-semibold" v-if="width > 700">Creating {{ worker.companyName }}</h3>
              <h5 v-else class="mb-3 fw-semibold text-center">Creating {{ worker.companyName }}</h5>
              <p class="text-muted ff-secondary"
                :class="{ 'fs-4': width > 700, 'fs-6': width <= 700, 'mb-4': width > 700, 'mb-0': width <= 700 }">
                One more step to complete.</p>
            </section>
            <section v-if="workers.length">
              <h3 class="mb-3 fw-semibold" v-if="width > 700">{{ worker.companyName }} - Base Setup Complete</h3>
              <h5 v-else class="mb-3 fw-semibold text-center">Creating {{ worker.companyName }}</h5>
              <section class="row">
                <p class="text-muted ff-secondary col-md-3 col-sm-12 "
                  :class="{ 'fs-4': width > 700, 'fs-6': width <= 700, 'mb-4': width > 700, 'mb-0': width <= 700 }">
                  Next Steps ...</p>
                <div class="col-md-3 col-sm-4">
                  <a data-bs-toggle="modal" data-bs-target="#shiftModal" class="btn btn-soft-success w-100"
                    :class="{ 'mb-1': width < 700 }">{{
                      shifts.length == 0
                      ? "Add Shifts"
                      : shifts.length.toString() + " shift. More?"
                    }}</a>
                </div>
                <div class="col-md-3 col-sm-4">
                  <a data-bs-toggle="modal" data-bs-target="#baseModal" class="btn btn-soft-success w-100"
                    :class="{ 'mb-1': width < 700 }">Enroll
                    Workers</a>
                </div>
                <div class="col-md-3 col-sm-4">
                  <router-link to="/" class="btn btn-soft-success w-100">Manage Shifts</router-link>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
      <!-- end row -->
  
      <div class="row text-center">
        <div class="col-lg-4">
          <div class="process-card" :class="{ 'mt-4': !baseComplete }">
            <div class="process-arrow-img d-none d-lg-block" v-if="width > 700">
              <img src="@/assets/images/landing/process-arrow-img.png" alt="" class="img-fluid" />
            </div>
            <div class="avatar-sm icon-effect mx-auto mb-4" v-if="width > 700 && !baseComplete">
              <div class="avatar-title bg-transparent text-success rounded-circle h1">
                <i class="bi bi-person-circle"></i>
              </div>
            </div>
  
            <section v-if="!baseComplete">
              <h5>About Your Company</h5>
              <div class="mt-4">
                <a data-bs-toggle="modal" data-bs-target="#baseModal" class="btn btn-soft-success w-100 btn-1"><i
                    class="bi bi-1-circle-fill fs-15" style="margin-right: 10px;"></i>Enter Company Details</a>
              </div>
            </section>
            <section v-else style="
                              background-color: white;
                              border-radius: 10px;
                              border: 2px solid darkgreen;
                              padding: 5px;
                            ">
              <h5 style="color: darkgreen">
                {{ worker.companyName
                }}<span class="text-muted"><i class="bx bx-edit" style="padding-left: 8px; font-size: 13px"></i></span>
              </h5>
              <p style="color: darkgreen !important" class="text-muted ff-secondary fs-6" tooltip="Text">
                Email: {{ worker.email }}<br />
                Phone: {{ worker.mobile }}
              </p>
            </section>
          </div>
        </div>
        <!-- end col -->
        <div class="col-lg-4">
          <div class="process-card mt-4">
            <div class="process-arrow-img d-none d-lg-block" v-if="width > 700">
              <img src="@/assets/images/landing/process-arrow-img.png" alt="" class="img-fluid" />
            </div>
            <div class="avatar-sm icon-effect mx-auto mb-4" v-if="width > 700 && !empDetailsComplete">
              <div class="avatar-title bg-transparent text-success rounded-circle h1">
                <i class="bi bi-folder-plus" type="solid"></i>
              </div>
            </div>
            <section v-if="!empDetailsComplete">
              <h5>Work Details</h5>
              <p class="text-muted ff-secondary fs-5">
                Summary of work history plus locations and categories covered.
              </p>
              <div class="mt-4" v-if="baseComplete">
                <a class="btn btn-soft-success w-100" data-bs-toggle="modal" data-bs-target="#complianceModal">Add Work
                  Details</a>
              </div>
            </section>
            <section v-else style="
                              background-color: white;
                              border-radius: 10px;
                              border: 2px solid darkgreen;
                              padding: 5px;
                            ">
              <h5 style="color: darkgreen">
                Work Details<span class="text-muted"><i class="bx bx-edit"
                    style="padding-left: 8px; font-size: 13px"></i></span>
              </h5>
              <p>Details here ...</p>
            </section>
          </div>
        </div>
        <!-- end col -->
        <div class="col-lg-4">
          <div class="process-card mt-4">
            <div class="avatar-sm icon-effect mx-auto mb-4" v-if="width > 700 && !empDetailsComplete && !workers.length">
              <div class="avatar-title bg-transparent text-success rounded-circle h1"
                v-if="width > 700 && !empDetailsComplete">
                <i class="bi bi-search-heart"></i>
              </div>
            </div>
            <section v-if="!workers.length">
              <h5>Project Matching</h5>
              <p class="text-muted ff-secondary fs-5">
                View current project and suggest auto matching criteria.
              </p>
              <div class="mt-4" v-if="empDetailsComplete">
                <a class="btn btn-soft-success w-100" data-bs-toggle="modal" data-bs-target="#workerModal">Load Workers</a>
              </div>
            </section>
            <section v-else style="
                              background-color: white;
                              border-radius: 10px;
                              border: 2px solid darkgreen;
                              padding: 5px;
                            ">
              <h5 style="color: darkgreen">
                Workers<span class="text-muted"><i class="bx bx-edit" style="padding-left: 8px; font-size: 13px"></i></span>
              </h5>
              <p style="color: darkgreen !important" class="text-muted ff-secondary fs-6" v-for="(worker, index) in workers"
                :key="index">
                <i class="bx bx-user-pin" style="font-size: 18px; padding-right: 10px"></i>
                {{ worker.name }}
              </p>
            </section>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
    <!-- Modals -->
    <div id="baseModal" class="modal zoomin" tabindex="-1" aria-labelledby="baseModalLabel" aria-hidden="true"
      style="display: none">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Contact Details</h5>
            <button type="button" id="closeBaseModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="mb-3">
                <label for="coName" class="form-label">Company Name *</label><input type="text" class="form-control"
                  autofocus id="coName" v-model="worker.companyName" placeholder="Enter your company name" />
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name *</label><input type="text" class="form-control"
                  autofocus id="firstName" v-model="worker.firstName" placeholder="Enter your firstname" />
              </div>
              <div class="mb-3">
                <label for="surname" class="form-label">Family Name *</label><input type="text" class="form-control"
                  autofocus id="surname" v-model="worker.surname" placeholder="Enter your surname" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email *</label><input type="text" class="form-control" autofocus
                  id="email" v-model="worker.email" placeholder="Enter your email" />
              </div>
              <div class="mb-3">
                <label for="mobile" class="form-label">Mobile</label><input type="text" class="form-control" autofocus
                  id="mobile" v-model="worker.mobile" placeholder="Enter your mobile" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="createWorker">
              Save Changes
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <div id="complianceModal" class="modal zoomin" tabindex="-1" aria-labelledby="complianceModalLabel" aria-hidden="true"
      style="display: none">
      <div class="modal-dialog" :class="{ 'wideModal' : width > 660 }">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="complianceModalLabel">Work Details</h5>
            <button type="button" id="closeComplianceModal" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="card">
            <div class="card-body">
              <ul class="nav nav-tabs mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" id="preferences-tab" data-bs-toggle="tab" href="#preferences" role="tab">Job
                    Preferences</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="education-employment-tab" data-bs-toggle="tab" href="#education-employment"
                    role="tab">Prior Experience</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="cv-tab" data-bs-toggle="tab" href="#cv" role="tab">CV</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="doc-tab" data-bs-toggle="tab" href="#docs" role="tab">Documents</a>
                </li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane active" id="preferences" role="tabpanel">
                  <div class="mb-3">
                    <label for="workSummary" class="form-label">Company Summary</label>
                    <textarea class="form-control form-control-sm" id="workSummary" v-model="worker.workSummary"></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="joiningDate" class="form-label">Available From</label>
                    <input type="date" class="form-control form-control-sm" id="joiningDate" v-model="worker.joiningDate">
                  </div>
                  <div class="mb-3">
                    <label for="hours" class="form-label">Locations</label>
                    <input type="number" class="form-control form-control-sm" id="hours" v-model="worker.hours">
                  </div>
                  <div class="mb-3">
                    <label for="rate" class="form-label">Categories</label>
                    <input type="text" class="form-control" id="rate" v-model="worker.rate">
                  </div>
                  <button class="btn btn-primary mt-3" @click="nextTab('education-employment-tab')">Next</button>
                </div>
                <div class="tab-pane" id="education-employment" role="tabpanel">
                  <h5 class="mb-3">Education</h5>
                  <div v-for="(edu, index) in worker.education" :key="index">
                    <!-- Add education form fields here -->
                    <div class="mb-3">
                      <label :for="`startDate-${index}`" class="form-label">Start Date</label>
                      <input type="date" :id="`startDate-${index}`" class="form-control" v-model="edu.startDate">
                    </div>
                    <div class="mb-3">
                      <label :for="`endDate-${index}`" class="form-label">End Date</label>
                      <input type="date" :id="`endDate-${index}`" class="form-control" v-model="edu.endDate">
                    </div>
                    <div class="mb-3">
                      <label :for="`course-${index}`" class="form-label">Course</label>
                      <input type="text" :id="`course-${index}`" class="form-control" v-model="edu.course">
                    </div>
                    <div class="mb-3">
                      <label :for="`level-${index}`" class="form-label">Level</label>
                      <input type="text" :id="`level-${index}`" class="form-control" v-model="edu.level">
                    </div>
                    <hr v-if="index < worker.education.length - 1">
                  </div>
                  <button class="btn btn-outline-secondary mb-4" @click="addEducation">Add
                    Education</button>
                  <h5 class="mb-3 mt-4">Employment History</h5>
                  <div v-for="(emp, index) in worker.employmentHistory" :key="index">
                    <!-- Add employment history form fields here -->
                    <div class="mb-3">
                      <label :for="`emp-startDate-${index}`" class="form-label">Start Date</label>
                      <input type="date" :id="`emp-startDate-${index}`" class="form-control" v-model="emp.startDate">
                    </div>
                    <div class="mb-3">
                      <label :for="`emp-endDate-${index}`" class="form-label">End Date</label>
                      <input type="date" :id="`emp-endDate-${index}`" class="form-control" v-model="emp.endDate">
                    </div>
                    <div class="mb-3">
                      <label :for="`jobTitle-${index}`" class="form-label">Job Title</label>
                      <input type="text" :id="`jobTitle-${index}`" class="form-control" v-model="emp.jobTitle">
                    </div>
  
                    <div class="mb-3">
                      <label :for="`employer-${index}`" class="form-label">Employer</label>
                      <input type="text" :id="`employer-${index}`" class="form-control" v-model="emp.employer">
                    </div>
                    <div class="mb-3">
                      <label :for="`description-${index}`" class="form-label">Description</label>
                      <textarea :id="`description-${index}`" class="form-control" v-model="emp.description"></textarea>
                    </div>
                    <hr v-if="index < worker.employmentHistory.length - 1">
  
                  </div>
                  <button class="btn btn-outline-secondary mb-4" @click="addEmployment">Add
                    Employment</button>
                </div>
                <!-- CV Upload tab pane -->
                <div class="tab-pane" id="cv" role="tabpanel">
                  <div class="mb-3">
                    <label for="cv-upload" class="form-label">Upload your CV</label>
                    <input type="file" class="form-control" id="cv-upload" accept=".pdf" v-on:change="uploadCV">
                  </div>
                </div>
                <!-- End of CV Upload tab pane -->
                <!-- Docs Upload tab pane -->
                <div class="tab-pane" id="docs" role="tabpanel">
                  <div class="mb-3">
                    <label for="docName" class="form-label">Document Title</label>
                    <input type="text" class="form-control" id="docName" v-model="documentName">
                  </div>
                  <div class="mb-3">
                    <label for="docLoad" class="form-label">Upload Document</label>
                    <input type="file" class="form-control" id="docLoad" accept=".pdf" v-on:change="uploadCV">
                  </div>
                </div>
                <!-- End of CV Upload tab pane -->
  
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary mt-3" @click="submitForm">Submit</button>
                </div>
  
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <div id="workerModal" class="modal zoomin" tabindex="-1" aria-labelledby="workerModalLabel" aria-hidden="true"
      style="display: none">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="workerModalLabel">Add Workers to Pool</h5>
            <button type="button" id="closeWorkerModal" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-pills nav-justified mb-3" role="tablist">
              <li class="nav-item active">
                <a class="nav-link" data-bs-toggle="tab" href="#individual" role="tab" aria-selected="true">
                  Individual
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#bulk" role="tab" aria-selected="false">
                  Load from File
                </a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content text-muted">
              <div class="tab-pane active" id="individual" role="tabpanel">
                <form>
                  <div class="mb-3">
                    <label for="workerName" class="form-label">Worker Name</label><input type="text" class="form-control"
                      id="workerName" v-model="worker2.name" placeholder="Enter the worker's name" />
                  </div>
                  <div class="mb-3">
                    <label for="workerPayRef" class="form-label">Payroll Ref</label><input type="text" class="form-control"
                      id="workerPayRef" v-model="worker2.payrollRef" placeholder="Enter the worker's payroll reference" />
                  </div>
                  <div class="mb-3">
                    <label for="workerEmail" class="form-label">Email</label><input type="email" class="form-control"
                      id="workerEmail" v-model="worker2.email" placeholder="Enter the worker's email address" />
                  </div>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="rightToWork" v-model="worker2.rightToWork" /><label
                      class="form-check-label" for="noCompliance">Right to Work checked</label>
                  </div>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="dbsCheck" v-model="worker2.dbsChecked" /><label
                      class="form-check-label" for="noCompliance">{{ dbsType }} DBS Checked</label>
                  </div>
                </form>
                <div class="modal-footer">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                    Finish
                  </button>
                  <button type="button" class="btn btn-primary" @click="addWorker">
                    Save Worker
                  </button>
                </div>
              </div>
              <div class="tab-pane" id="bulk" role="tabpanel">
                <p>The CSV file should have the following columns:</p>
                <ul>
                  <li>Worker Full Name</li>
                  <li>Payroll Reference</li>
                  <li>Email</li>
                  <li>Original Start Date (optional)</li>
                  <li>Mobile Number (optional)</li>
                </ul>
                <h5>Click below to upload CSV file</h5>
                <input type="file" id="dropzoneFile" class="dropzoneFile btn btn-light" />
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <div id="shiftModal" class="modal zoomin" tabindex="-1" aria-labelledby="shiftModalLabel" aria-hidden="true"
      style="display: none">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="shiftModalLabel">Create Shifts</h5>
            <button type="button" id="closeShiftModal" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="shiftShortName" class="form-label">Shift Short Name</label><input type="text"
                  class="form-control" id="shiftName" v-model="shift.shortName" placeholder="Enter the shift short name" />
              </div>
              <div class="mb-3">
                <label for="shiftStartTime" class="form-label">Start Time</label><input type="time" class="form-control"
                  id="shiftStartTime" v-model="shift.startTime" placeholder="Enter the shft start time" />
              </div>
              <div class="mb-3">
                <label for="shiftEndTime" class="form-label">End Time</label><input type="time" class="form-control"
                  id="shiftEndTime" v-model="shift.endTime" placeholder="Enter the shft end time" />
              </div>
              <div class="mb-3">
                <label for="shiftRate" class="form-label">Charge Rate</label><input type="email" class="form-control"
                  id="shiftRate" v-model="shift.rate" placeholder="Enter the shift charge rate" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addShift">
              Save Changes
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
  </template>
  <style scoped lang="scss">
  .wideModal {
    min-width: 640px;
  }
  .dropdown-wrapper {
    max-width: 350 px;
    position: relative;
    margin: 0 auto;
  
    .selected-item {
      //height:40px;
      //border: 2px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      //font-size:18px;
      //font-weight: 400;
    }
  
    .dropdown-icon {
      transform: rotate(0deg);
      transition: all 0.5s ease;
  
      &.dropdown-icon.dropdown {
        transform: rotate(180deg);
  
      }
    }
  
    .dropdown-popover {
      //selection box
      position: absolute;
      border: 2px solid lightgray;
      top: 40px;
      left: 0;
      right: 0;
      background-color: #fff;
      max-width: 100%;
      padding: 10px;
      visibility: hidden;
      transition: all 0.5s linear;
      max-height: 0px;
      overflow: hidden;
  
      &.visible {
        max-height: 450px;
        visibility: visible;
      }
    }
  
    input {
      width: 90%;
      height: 30px;
      border: 2px solid lightgray;
      font-size: 16px;
      padding: 16px;
  
    }
  
    .options {
      width: 100%;
  
      ul {
        list-style: none;
        text-align: left;
        padding-left: 8px;
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        border: 1px solid lightgray;
  
        li {
          width: 100%;
          border-bottom: 1px solid lightgray;
          padding: 10px;
          background-color: #f1f1f1;
          font-size: 16px;
          cursor: pointer;
  
          &:hover {
            background: #60d4e3;
            color: fff;
            font-weight: bold;
          }
        }
  
      }
    }
  }
  </style>
  
  <script setup>
  import moment from "moment"
  import { ref, onMounted, computed, reactive } from "vue"
//  import axios from 'axios'
  import { useWindowSize } from '@vueuse/core'
  
  const { width } = useWindowSize()
  
  let workerName = computed(() => {
    return worker.firstName + " " + worker.surname
  })
  
  const
    baseComplete = ref(false),
    worker = reactive({
      workSummary: null,
      jobType: null,
      companyName: null,
      firstName: null,
      surname: null,
      email: null,
      mobile: null,
      joiningDate: null,
      hours: null,
      rate: null,
      payrollRef: null,
    }),
    empDetailsComplete = ref(false),
    //complianceSteps = ref([{ name: null, duration: null }]),
    locations = ref([]),
    showIndividual = ref(true),
    documentName = ref('')
  
    const uploadCV = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
        worker2.cv = e.target.result
    }
    reader.readAsDataURL(file)
  }
  
  const fetchLocations = () => {
    locations.value = ["St Albans", "Harpenden", "Southampton", "Colchester"];
  };
  
  const worker2 = {
    name: "",
    payrollRef: "",
    email: "",
    startDate: moment().format("DD-MMM-YYYY"),
    dbsChecked: false,
    rightToWork: false,
  };
  const workers = ref([]);
  
  const shift = {
    shortName: "",
    startTime: "00:00",
    endTime: "00:00",
    rate: "",
  };
  const shifts = ref([]);
  
//  const noCompliance = ref(false);
//  const rightToWork = ref(false);
//  const dbsCheck = ref(false);
  const dbsType = ref("");
  
  
//  const manager = ref({});
  const organisation = ref({});
  
  fetchLocations();
  
  onMounted(() => {
    showIndividual.value = true
  })
  
  const createWorker = async () => {
      worker.value = {
        name: workerName.value,
        password: "pass1234",
        createdBy: localStorage.getItem('userId'),
        createdAt: moment().format(),
        lastModifiedBy: localStorage.getItem('userId'),
        lastModified: moment().format(),
        organisation: {
          name: organisation.value.name,
          id: organisation.value.id
        }
      };
      baseComplete.value = !baseComplete.value
      //createWorkerLocations(selectedLocations.value, worker.value)
      document.getElementById("closeBaseModal").click()
    //add worker to store
    //  shiftsStore.changeWorkerName(selWorker.value, workerName.value + " (" + location.name + ")")
  };
  const addWorker = () => {
    baseComplete.value = true;
    empDetailsComplete.value = true;
    const thisWorker = { ...worker };
    workers.value.push(thisWorker);
    worker.name = "";
    worker.payrollRef = "";
    worker.dbsChecked = null;
    worker.rightToWork = null;
  };
  const addShift = () => {
    const thisShift = { ...shift };
    shifts.value.push(thisShift);
    shift.shortName = "";
    shift.startTime = "00:00";
    shift.endTime = "00:00";
    shift.rate = "";
  };
</script>