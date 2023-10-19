<template>
    <div style="padding: 6px !important">
      <h2>{{ jobAdId ? "Manage/Update" : "Create" }} Role</h2>
      <ul
        class="my-2 nav nav-tabs nav-fill"
        style="margin-top: -30px"
        v-if="shiftRole || jobAdId"
      >
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: selTab === 'Manage', 'py-0': width <= 768 }"
            @click="selTab = 'Manage'"
            >Manage<i class="bx bx-align-left icon-shadow"></i
          ></a>
        </li>
        <li class="nav-item" v-if="!shiftRole">
          <a
            class="nav-link"
            :class="{ active: selTab === 'Matches', 'py-0': width <= 768 }"
            @click="selTab = 'Matches'"
            >Candidates<i class="bx bx-align-left icon-shadow"></i
          ></a>
        </li>
        <li class="nav-item" v-if="shiftRole">
          <a
            class="nav-link"
            :class="{ active: selTab === 'Planning', 'py-0': width <= 768 }"
            @click="selTab = 'Planning'"
            >Shift Planning <i class="bx bx-align-left icon-shadow"></i
          ></a>
        </li>
        <li class="nav-item" v-if="shiftRole">
          <a
            class="nav-link"
            :class="{ active: selTab === 'Control', 'py-0': width <= 768 }"
            @click="selTab = 'Control'"
            >Shift Control <i class="bx bx-alarm icon-shadow"></i
          ></a>
        </li>
        <li class="nav-item" v-if="shiftRole">
          <a
            class="nav-link"
            :class="{ active: selTab === 'Review' }"
            @click="selTab = 'Review'"
            >Review <i class="ri-dashboard-2-line icon-shadow"></i
          ></a>
        </li>
      </ul>
      <form v-if="selTab === 'Manage'">
        <input type="hidden" v-model="jobAd.id" />
        <div class="mb-1">
          <label for="text-input" class="form-label"
            >Text to Process
            <i
              class="bx bxs-hide text-primary fs-18 icon-shadow"
              v-if="showDescription"
              @click="showDescription = !showDescription"
            ></i>
            <i
              class="bx bxs-show text-primary fs-18 icon-shadow"
              v-else
              @click="showDescription = !showDescription"
            ></i>
          </label>
          <textarea
            v-if="showDescription"
            rows="4"
            id="textAreaText"
            class="form-control form-control-sm"
            v-model="textAreaText"
            @input="textAreaChanged"
          />
        </div>
        <div class="row mb-1">
          <div class="col-md-4" v-if="showAdvert && !jobAdId">
            {{ jobAdId }}
            <label for="jobAd" class="form-label">Job Advert</label>
            <div class="card extraCardShadow">
              <div
                class="card-body pb-0"
                v-if="jobAd.title && (jobAd.location || jobAd.workLocation)"
              >
                <jobSummary
                  :jobAd="jobAd"
                  :template="templated"
                  :subTitleTemplate="subTitleTemplate"
                  :skills="skillsArray"
                  :url="url"
                ></jobSummary>
              </div>
              <div v-else class="card-body">
                <h5 class="card-title placeholder-glow">
                  <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-7"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-7"></span>
                  <span
                    class="placeholder col-4 mb-3"
                    style="float: right; top: 20px"
                  ></span>
                </p>
              </div>
            </div>
          </div>
          <div
            :class="{
              'col-md-4': showAdvert && !jobAdId,
              'col-md-6': !showAdvert || jobAdId,
            }"
          >
            <label for="tags" class="form-label">
              Tags
              <span class="btn btn-sm text-muted" @click="showWorking">
                show source text
              </span>
            </label>
            <div id="tagsArray" style="gap: 5px; flex-flow: column nowrap !important">
              <span :class="getTagClass(tag)" v-for="tag in tagsArray" :key="tag">
                {{ tag.name }}
                <i
                  v-if="!tag.deleted"
                  class="bi bi-x-circle-fill xTag"
                  @click="toggleTag(tag)"
                ></i>
                <i v-else class="bi bi-check2-circle xTag" @click="toggleTag(tag)"></i>
              </span>
            </div>
            <div class="row" style="display: flex-inline">
              <label style="flex: grow; width: 30%"> Shifts/Days </label>
              <select
                id="weekSelect"
                style="flex=grow; width:70%"
                class="form-select form-select-sm col-8"
                v-model="weekSelected"
              >
                <option value="All" selected>All weeks</option>
                <option :value="moment().day(1).format('YYYY-MM-DD')">
                  {{ "Week Starting " + moment().day(1).format("Do MMM") }}
                </option>
                <option :value="moment().day(8).format('YYYY-MM-DD')">
                  {{ "Week Starting " + moment().day(8).format("Do MMM") }}
                </option>
                <option :value="moment().day(15).format('YYYY-MM-DD')">
                  {{ "Week Starting " + moment().day(15).format("Do MMM") }}
                </option>
                <option :value="moment().day(22).format('YYYY-MM-DD')">
                  {{ "Week Starting " + moment().day(22).format("Do MMM") }}
                </option>
              </select>
            </div>
            <table class="table table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Shift</th>
                  <th scope="col">Mon</th>
                  <th scope="col">Tue</th>
                  <th scope="col">Wed</th>
                  <th scope="col">Thu</th>
                  <th scope="col">Fri</th>
                  <th scope="col">Sat</th>
                  <th scope="col">Sun</th>
                </tr>
              </thead>
              <div class="texts"></div>
              <tbody>
                <tr v-for="shift in currShifts" :key="shift.name">
                  <td class="align-right">{{ shift.name }}</td>
                  <td
                    v-for="day in shift.days"
                    :key="day.dayIndex"
                    style="padding-right: 0 !important"
                  >
                    <input
                      type="text"
                      class="form-control form-control-sm text-center"
                      style="padding 0 !important; width:30px"
                      v-model="day.active"
                      :class="{
                        'bg-success': day.active,
                        'text-success': day.active == 1,
                        'text-white': day.active != 1,
                        'bg-none': !day.active,
                      }"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <label for="pools" class="form-label"> Pools </label>
            <div class="row">
              <div
                v-for="pool in pools"
                :key="pool.id"
                class="fs-12 row"
                :class="{
                  'col-md-6': showAdvert && !jobAdId,
                  'col-md-4': !showAdvert || jobAdId,
                }"
              >
                <div class="col-10" style="text-align: right">{{ pool.name }}</div>
                <div class="col-2">
                  <input
                    style="margin-left: 0 !important"
                    type="checkbox"
                    class="form-check-input mx-2"
                    v-model="pool.selected"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            :class="{
              'col-md-4': showAdvert && !jobAdId,
              'col-md-6': !showAdvert || jobAdId,
            }"
          >
            <div class="row">
              <div class="col-md-6" v-if="!jobAd.jobType || showData">
                <label for="jobType" class="form-label">Job Type</label>
                <select
                  class="form-select form-select-sm"
                  id="jobType"
                  v-model="jobAd.jobType"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="status" class="form-label">Status</label>
                <select
                  class="form-select form-select-sm"
                  id="jobStatus"
                  name="status"
                  v-model="jobAd.status"
                >
                  <option value="">Select Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="permanent" class="form-label mb-0">Permanent</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="permanent"
                    id="permanentYes"
                    v-model="jobAd.permanent"
                    :value="true"
                  />
                  <label class="form-check-label fs-12" for="permanentYes"> Yes </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="permanent"
                    id="permanentNo"
                    v-model="jobAd.permanent"
                    :value="false"
                  />
                  <label class="form-check-label fs-12" for="permanentNo"> No </label>
                </div>
              </div>
              <div class="col-md-6">
                <label for="startDate" class="form-label">Start Date</label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="startDate"
                  v-model="jobAd.startDate"
                />
              </div>
              <div class="col-md-6">
                <label for="endDate" class="form-label">End Date</label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="endDate"
                  v-model="jobAd.endDate"
                />
              </div>
              <div class="col-md-6">
                <label for="expiry" class="form-label">Expiry Date</label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="expiry"
                  v-model="jobAd.expiry"
                />
              </div>
              <div class="col-md-6" v-if="false">
                <label for="reference" class="form-label">Reference</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="reference"
                  v-model="jobAd.reference"
                />
              </div>
              <div class="col-md-6">
                <label for="accountCode" class="form-label">Cost Code</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="accountCode"
                  v-model="jobAd.accountCode"
                />
              </div>
              <div class="col-md-12" v-if="jobAd.organisation == 2">
                <label for="reason" class="form-label">Reason for Request</label>
                <select
                  class="form-select form-select-sm"
                  id="location"
                  v-model="jobAd.reason"
                >
                  <option value="">Select Reason</option>
                  <option value="1">Vacancy - Funded</option>
                  <option value="2">Vacancy - Unfunded</option>
                  <option value="3">Vacancy - NIMDTA</option>
                  <option value="4">Additional Activity - Planned eg WLI</option>
                  <option value="5">
                    Additional Activity - Unplanned eg Increased Workload
                  </option>
                  <option value="6">Precautionary Suspension</option>
                  <option value="7">Regulatory Compliance/Inspection eg RQIA</option>
                  <option value="8">Restricted Duties</option>
                  <option value="9">Sickness - Long Term</option>
                  <option value="10">Sickness - Short Term</option>
                  <option value="11">Maternity Leave</option>
                  <option value="12">Paternity Leave</option>
                  <option value="13">Phased return to work</option>
                  <option value="14">Flexible Working</option>
                  <option value="15">Annual Leave (Exceptional)</option>
                  <option value="16">Approved Training/Study Leave (Exceptional)</option>
                  <option value="18">Special Leave Paid eg Carers Leave</option>
                  <option value="19">Special Leave Unpaid eg Career Break</option>
                  <option value="17">Other</option>
                </select>
              </div>
              <div class="col-md-6" v-if="!jobAd.permanent">
                <label for="rate" class="form-label">Rate</label>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  id="rate"
                  v-model="jobAd.rate"
                />
              </div>
              <div class="col-md-6" v-if="jobAd.permanent">
                <label for="salaryText" class="form-label">Salary Text</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="salaryText"
                  v-model="jobAd.salaryText"
                />
              </div>
              <div class="col-md-6">
                <label for="hoursPerWeek" class="form-label">{{
                  Number(numPAs) >= 1 ? " PA's per Week" : " Hours per Week"
                }}</label>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  id="hoursPerWeek"
                  v-model="jobAd.hoursPerWeek"
                />
              </div>
              <div class="col-md-6">
                <label for="manager" class="form-label">Manager</label>
                <select
                  id="manager"
                  class="form-select form-select-sm"
                  v-model="jobAd.manager"
                >
                  <option value="">Select Manager</option>
                  <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                    {{ manager.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="invoiceContact" class="form-label">Invoice Contact</label>
                <select
                  id="invoiceContact"
                  class="form-select form-select-sm"
                  v-model="jobAd.invoiceContact"
                >
                  <option value="">Select Manager</option>
                  <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                    {{ manager.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <h4>
          Filter Questions
          <span class="px-2 pt-1">
            <i
              class="bx bxs-hide text-primary fs-18 icon-shadow"
              v-if="showQuestions"
              @click="showQuestions = !showQuestions"
            ></i>
            <i
              class="bx bxs-show text-primary fs-18 icon-shadow"
              v-else
              @click="showQuestions = !showQuestions"
            ></i>
          </span>
        </h4>
        <section v-if="showQuestions">
          <div class="row" v-for="(question, index) in questionArray" :key="index">
            <div class="col-md-6 mb-1">
              <label :for="'q' + (index + 1)" class="form-label">Q{{ index + 1 }}</label>
              <input
                type="text"
                class="form-control form-control-sm"
                :id="'q' + (index + 1)"
                v-model="question.question"
              />
            </div>
            <div class="col-md-4 mb-1">
              <label :for="'q' + (index + 1) + 'Resp'" class="form-label"
                >Q{{ index + 1 }} Correct Response</label
              >
              <input
                type="text"
                class="form-control form-control-sm"
                :id="'q' + (index + 1) + 'Resp'"
                v-model="question.answer"
              />
            </div>
            <div class="col-md-2">
              <div>
                <label
                  class="form-label text-white fs-12 mb-0"
                  :for="'q' + (index + 1) + 'Req'"
                  >Q{{ index + 1 }} Required
                </label>
              </div>
              <div :id="'q' + (index + 1) + 'Req'" class="form-check form-check-inline">
                <label class="form-check-label fs-12" :for="'q' + (index + 1) + 'ReqYes'">
                  Required
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'q' + (index + 1) + 'Req'"
                  :id="'q' + (index + 1) + 'ReqYes'"
                  v-model="question.required"
                  :value="true"
                />
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'q' + (index + 1) + 'Req'"
                  :id="'q' + (index + 1) + 'ReqNo'"
                  v-model="question.required"
                  :value="false"
                />
                <label class="form-check-label fs-12" :for="'q' + (index + 1) + 'ReqNo'">
                  Not Required
                </label>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Buttons -->
        <div class="row mb-1">
          <div class="col-md-12">
            <button
              type="button"
              @click="preSaveDialog(jobAd)"
              class="btn btn-primary"
              v-if="!sentMail"
            >
              {{ jobAdId ? "Update" : "Create" }}
              {{ jobAd?.status === "Draft" ? "Draft" : "Role" }}
            </button>
            <button
              v-if="jobAdId && !sentMail"
              type="button"
              @click="preSaveDialog(jobAd)"
              class="btn btn-primary mx-2"
              style="float: right"
            >
              Create as New Role
            </button>
            <router-link
              style="float: right; margin-top: 20px"
              :to="{
                name: 'taskEmail',
               query: {
                  manager:
                    moment(jobAd.endDate).diff(moment(jobAd.startDate), 'months') > 2
                      ? director.name
                      : manager.name,
                  email:
                    moment(jobAd.endDate).diff(moment(jobAd.startDate), 'months') > 2
                      ? director.username
                      : manager.username,
                  jobTitle: jobAd.title,
                  startDate: jobAd.startDate,
                  endDate: jobAd.endDate,
                  rate: jobAd.rate,
                  cc: jobAd.accountCode,
                  location: jobAd.workLocation,
                  reason: jobAd.reason,
                  daysText: daysText,
                },
              }"
              v-if="sentMail"
            >
              <i class="bi bi-envelope"></i>&nbsp;<span>View Sent Email</span>
            </router-link>
          </div>
        </div>
      </form>
      <div v-if="selTab === 'Planning'">
        <shiftPlanningTab></shiftPlanningTab>
      </div>
      <div v-if="selTab === 'Control'">
        <shiftControlTab></shiftControlTab>
      </div>
      <div v-if="selTab === 'Review'">
        <shiftReviewTab></shiftReviewTab>
      </div>
      <div v-if="selTab === 'Matches'">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Source</th>
              <th>Applied Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cand in applicants" :key="cand.id">
              <td>{{ cand.worker.name }}</td>
              <td>{{ cand.worker.source }}</td>
              <td>{{ moment(cand.dateApplied).format("Do MMM YYYY hh:mm") }}</td>
              <td>{{ cand.status }}</td>
              <td>
                <router-link :to="{ name: 'profile-view', query: { id: cand.worker.id } }">
                  <button class="btn btn-primary btn-sm me-2">
                    View Cand
                  </button></router-link
                >
  
                <button
                  v-if="cand.status === 'Applied'"
                  class="btn btn-sm btn-success me-2"
                  @click="acceptApplicant(application)"
                >
                  Accept Cand
                </button>
                <button
                  v-if="cand.status === 'Applied' || cand.status === 'Shortlisted'"
                  class="btn btn-sm btn-danger"
                  @click="declineApplicant(application)"
                >
                  Decline Cand
                </button>
                <button
                  v-if="cand.status === 'Selected'"
                  class="btn btn-sm btn-danger"
                  @click="withdrawOffer(application)"
                >
                  Withdraw Offer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      id="skillTextModal"
      class="modal zoomin"
      tabindex="-1"
      aria-labelledby="skillTextModalLabel"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="mb-1">
              <label for="text-input" class="form-label"
                >Processing Text
                <button
                  type="button"
                  class="btn-close float-right"
                  aria-label="Close"
                  id="close-modal"
                  @click="showWorking"
                ></button>
              </label>
              <parseText class="p-2 form-control form-control-sm" id="noStopWords" />
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <div
      id="confirmSaveModal"
      class="modal zoomin"
      tabindex="-1"
      aria-labelledby="confirmSaveModalLabel"
      aria-hidden="true"
      style="display: none"
    >
      <div
        class="modal-dialog"
        style="
          box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
            6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028), 12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
            22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
            41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07);
        "
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="shiftModalLabel">Confirm Need</h5>
            <button
              type="button"
              id="closeShiftModal"
              class="btn-close"
              @click="togglePreSaveDialog"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row g-3 align-items-center">
                <div class="col-auto">
                  <label for="shiftShortName" class="form-label"
                    >Have all INTERNAL OPTIONS been considered?</label
                  >
                </div>
                <div class="col-auto">
                  <select
                    type="text"
                    class="form-select form-select-sm"
                    id="intOptions"
                    v-model="jobAd.intOptions"
                    placeholder="Enter Yes or No"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-auto">
                  <label for="shiftStartTime" class="form-label md-8"
                    >Have all doctors in the specialty been approached?</label
                  >
                </div>
                <div class="col-auto">
                  <select
                    type="text"
                    class="form-select form-select-sm"
                    id="allDocs"
                    v-model="jobAd.allDocs"
                    placeholder="Enter Yes or No"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="shiftEndTime" class="form-label"
                  >If filled internally, name of doctor & shifts agreed</label
                ><input
                  type="text"
                  class="form-control"
                  id="docNameShifts"
                  v-model="jobAd.docNameShifts"
                  placeholder="Enter the name and shifts agreed"
                />
              </div>
              <div class="mb-3">
                <label for="shiftRate" class="form-label"
                  >What is the impact if staff member not replaced?</label
                ><input
                  type="text"
                  class="form-control"
                  id="impactText"
                  v-model="jobAd.impactText"
                  placeholder="Enter the impact"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              id="cancelPreButton"
              class="btn btn-light"
              @click="togglePreSaveDialog"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="saveJobAd(jobAd)">
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
  
  <script setup>
  import { ref, computed, reactive, onMounted, nextTick } from "vue";
  import axios from "axios";
  import { useRouter } from "../../router";
  import moment from "moment";
  import parseText from "../../components/parseText.vue";
  import jobSummary from "../../components/jobSummaryAd.vue";
  import shiftPlanningTab from "../../components/shiftPlanningTab.vue";
  import ShiftReviewTab from "../../components/shiftReviewTab.vue";
  import shiftControlTab from "../../components/shiftControlTab.vue";
  
  const textAreaText = ref("");
  const weekSelected = ref("All");
  const selTab = ref("Manage");
  const shiftRole = ref(false);
  const showAdvert = ref(true);
  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const textAreaChanged = (e) => {
    textChanged();
  };
  onMounted(() => {
    if (jobAdId) {
      showAdvert.value = false;
      loadApplicants();
    }
    const text = document.getElementById("textAreaText");
    text.focus();
  });
  const subTitleTemplate = ref("");
  const template = ref("");
  const skillsArray = reactive([]);
  const tagsArray = reactive([]);
  const jobs = ref([]);
  const router = useRouter();
  
  //test for new API
  if (window.location.hostname === "localhost") {
    let config2 = {
      baseURL: `${window.location.protocol}//${window.location.hostname}:3000`,
      timeout: 10000,
    };
    let newAPI = axios.create(config2);
  
    newAPI.get("/user").then((response) => {
      console.log(response);
    });
  }
  
  axios
    .get("/jobAd/index.json?max=200")
    .then((response) => {
      response.data.list.forEach((job) => {
        if (
          // current Open jobs only
          job.status === "Open" &&
          moment(job.endDate) > moment() &&
          job.organisation.id == localStorage.getItem("orgId")
        ) {
          jobs.value.push({
            id: job.id,
            title: job.title,
            startDate: job.startDate,
            endDate: job.endDate,
            location: job.location,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
      router.replace({
        path: "/",
      });
    });
  
  const templated = computed(() => {
    template.value =
      (jobAd.value.hoursPerWeek
        ? jobAd.value.hoursPerWeek
        : "<span class='tagUnderlineother'>Hours</span>") +
      (numPAs.value <= 0 ? " hours per week" : " PA's per week");
    if (numPAs.value <= 0) {
      template.value +=
        " at £" +
        (jobAd.value.rate && numPAs.value <= 0
          ? jobAd.value.rate
          : "<span class='tagUnderlineother'>Rate</span>") +
        " per hour";
    }
    return template.value;
  });
  const currShifts = reactive([
    {
      name: "Day",
      start: "09:00",
      end: "17:30",
      days: [
        { day: "Mon", dayIndex: 0, active: 1 },
        { day: "Tue", dayIndex: 1, active: 1 },
        { day: "Wed", dayIndex: 2, active: 1 },
        { day: "Thu", dayIndex: 3, active: 1 },
        { day: "Fri", dayIndex: 4, active: 1 },
        { day: "Sat", dayIndex: 5, active: 0 },
        { day: "Sun", dayIndex: 6, active: 0 },
      ],
      hours: 8,
      rate: 10,
    },
  ]);
  const possShifts = reactive([
    {
      name: "Day",
      abbrev: "DAY",
      start: "09:00",
      end: "17:30",
      days: [
        { day: "Mon", dayIndex: 0, active: 1 },
        { day: "Tue", dayIndex: 1, active: 1 },
        { day: "Wed", dayIndex: 2, active: 1 },
        { day: "Thu", dayIndex: 3, active: 1 },
        { day: "Fri", dayIndex: 4, active: 1 },
        { day: "Sat", dayIndex: 5, active: 0 },
        { day: "Sun", dayIndex: 6, active: 0 },
      ],
      hours: 8,
      rate: 10,
    },
    {
      name: "Morning",
      abbrev: "MRN",
      start: "09:00",
      end: "17:30",
      days: [
        { day: "Mon", dayIndex: 0, active: 1 },
        { day: "Tue", dayIndex: 1, active: 1 },
        { day: "Wed", dayIndex: 2, active: 1 },
        { day: "Thu", dayIndex: 3, active: 1 },
        { day: "Fri", dayIndex: 4, active: 1 },
        { day: "Sat", dayIndex: 5, active: 0 },
        { day: "Sun", dayIndex: 6, active: 0 },
      ],
      hours: 8,
      rate: 10,
    },
    {
      name: "Afternoon",
      abbrev: "AFT",
      start: "09:00",
      end: "17:30",
      days: [
        { day: "Mon", dayIndex: 0, active: 1 },
        { day: "Tue", dayIndex: 1, active: 1 },
        { day: "Wed", dayIndex: 2, active: 1 },
        { day: "Thu", dayIndex: 3, active: 1 },
        { day: "Fri", dayIndex: 4, active: 1 },
        { day: "Sat", dayIndex: 5, active: 0 },
        { day: "Sun", dayIndex: 6, active: 0 },
      ],
      hours: 8,
      rate: 10,
    },
    {
      name: "Night",
      abbrev: "NGT",
      start: "09:00",
      end: "17:30",
      days: [
        { day: "Mon", dayIndex: 0, active: 1 },
        { day: "Tue", dayIndex: 1, active: 1 },
        { day: "Wed", dayIndex: 2, active: 1 },
        { day: "Thu", dayIndex: 3, active: 1 },
        { day: "Fri", dayIndex: 4, active: 1 },
        { day: "Sat", dayIndex: 5, active: 0 },
        { day: "Sun", dayIndex: 6, active: 0 },
      ],
      hours: 8,
      rate: 10,
    },
  ]);
  const toggleTag = (tag) => {
    tag.deleted = !tag.deleted;
    let skillExists = skillsArray.find((skill) => skill.name === tag.name);
    if (!skillExists) {
      skillsArray.push({
        name: tag.name,
        descriptor: tag.descriptor,
        shifts: tag.shifts,
        category: tag.category,
        required: tag.required,
        question: tag.question,
        answer: tag.answer,
      });
    } else {
      skillsArray.splice(skillsArray.indexOf(skillExists), 1);
    }
    let question = questionArray.find((question) => question.question === tag.question);
    if (!question) {
      questionArray.push({
        question: tag.question,
        answer: tag.answer,
        required: tag.required,
      });
    } else {
      questionArray.splice(questionArray.indexOf(question), 1);
    }
  };
  const getTagClass = (tag) => {
    return "tag" + tag.category + (tag.deleted ? "deleted" : "");
  };
  var deletedTags = [];
  const showData = ref(false);
  const showQuestions = ref(true);
  const showDescription = ref(true);
  var cats = [
    { name: "time", order: 3 },
    { name: "jobTitle", order: 1 },
    { name: "qualifier", order: 6 },
    { name: "skill", order: 5 },
    { name: "location", order: 2 },
    { name: "category", order: 4 },
  ];
  
  let daysText = ref("1111100");
  
  const showWorking = () => {
    const showWorkModal = document.getElementById("skillTextModal");
  
    if (showWorkModal.style.display == "" || showWorkModal.style.display == "none") {
      showWorkModal.style.display = "block";
    } else {
      showWorkModal.style.display = "none";
    }
  };
  
  var pools = ref([]);
  const totalPools = ref(0);
  
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "team/index/me.json",
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const loadPools = async () => {
    axios(config)
      .then(function (response) {
        pools.value = response.data.list;
        pools.value.forEach((pool) => {
          pool.selected = false;
        });
        totalPools.value = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  var applicants = ref([]);
  const loadApplicants = async () => {
    config.url = "jobApplication/index.json?id=" + jobAdId;
    axios(config)
      .then(function (response) {
        applicants.value = response.data.list;
        console.log(applicants.value);
        //      pools.value.forEach((pool) => {
        //        pool.selected = false;
        //     });
        //      totalPools.value = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  loadPools();
  const searchArray = [
    {
      tag: "care worker",
      output: "Care Worker",
      category: "jobTitle",
      valField1: "Healthcare",
      descriptor: "",
      pools: "Care Staff Pool",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "doctor sexual health",
      output: "Doctor Sexual Health & HIV",
      category: "jobTitle",
      valField1: "Doctor",
      descriptor: "",
      pools: "Locum Staff, Medicine Pool",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "disclosure barring service",
      output: "DBS Check",
      category: "qualifier",
      valField1: "",
      descriptor: "Requires a current DBS check",
      pools: "",
      shifts: "",
      weekdays: "",
      question:
        "You will need to undergo a DBS check for this role. Do you already have one?",
      answer: "Yes",
      required: false,
    },
    {
      tag: "accessni",
      output: "AccessNI Check",
      category: "qualifier",
      valField1: "",
      descriptor: "Requires a current AccessNI check",
      pools: "",
      shifts: "",
      weekdays: "",
      question:
        "You will need to undergo an AccessNI check for this role. Do you already have one?",
      answer: "Yes",
      required: true,
    },
    {
      tag: "rcn",
      output: "RCN Qualified",
      category: "qualifier",
      valField1: "",
      descriptor: "Requires a qualified RCN",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "Are you a qualified RCN?",
      answer: "Yes",
      required: true,
    },
    {
      tag: "gmc",
      output: "GMC Registered",
      category: "qualifier",
      valField1: "",
      descriptor: "Requires a GMC registered doctor",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "Do you hold full registration with the GMC?",
      answer: "yes",
      required: true,
    },
    {
      tag: "diploma genitourinary medicine",
      output: "Dip. Genitourinary Medicine",
      category: "qualifier",
      valField1: "",
      descriptor: "Diploma in Genitourinary Medicine or equivalent",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "dip genito",
      output: "Dip. Genitourinary Medicine",
      category: "qualifier",
      valField1: "",
      descriptor: "Diploma in Genitourinary Medicine or equivalent",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "geriatric",
      output: "Geriatric",
      category: "skill",
      valField1: "",
      descriptor: "Geriatric care experience",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "dbs",
      output: "DBS Check",
      category: "qualifier",
      valField1: "",
      descriptor: "Requires a current DBS check",
      pools: "",
      shifts: "",
      weekdays: "",
      question:
        "You will need to undergo a DBS check for this role. Do you already have one?",
      answer: "Yes",
      required: false,
    },
    {
      tag: "care assistant",
      output: "Care Worker",
      category: "jobTitle",
      valField1: "Healthcare",
      descriptor: "",
      pools: "Care Staff Pool",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri, Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "assistant cook",
      output: "Assistant Cook",
      category: "jobTitle",
      valField1: "Catering",
      descriptor: "",
      pools: "Catering Staff, Over 55 Returnees, Apprentices",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri",
      question: "Do you have experience working in a kitchen environment?",
      answer: "Yes",
      required: true,
    },
    {
      tag: "kitchen assistant",
      output: "Kitchen Assistant",
      category: "jobTitle",
      valField1: "Catering",
      descriptor: "",
      pools: "Catering Staff, Over 55 Returnees, Apprentices",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri",
      question: "Do you have experience working in a kitchen environment?",
      answer: "Yes",
      required: false,
    },
    {
      tag: "support worker",
      output: "Care Worker",
      category: "jobTitle",
      valField1: "Healthcare",
      descriptor: "",
      pools: "Care Staff Pool",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "gardening",
      output: "Gardener",
      category: "jobTitle",
      valField1: "Horticulture",
      descriptor: "Gardener Pool",
      pools: "",
      shifts: "Day",
      weekdays: "Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "gardener",
      output: "Gardener",
      category: "jobTitle",
      valField1: "Horticulture",
      descriptor: "",
      pools: "Gardener Pool",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "optometrist",
      output: "Optometrist",
      category: "jobTitle",
      valField1: "Healthcare",
      descriptor: "",
      pools: "",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "dementia",
      output: "Dementia",
      category: "skill",
      valField1: "Care",
      descriptor: "Dementia care required",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "Have you worked with dementia patients before?",
      answer: "Yes",
      required: true,
    },
    {
      tag: "gardening",
      output: "Gardening",
      category: "skill",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "Have you worked in gardening before?",
      answer: "Yes",
      required: false,
    },
    {
      tag: "cooking",
      output: "Cooking",
      category: "skill",
      valField1: "Catering",
      descriptor: "Simple cooking",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "food prep",
      output: "Food Prep",
      category: "skill",
      valField1: "Catering",
      descriptor: "Preparation of food",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "food serving",
      output: "Serve food",
      category: "skill",
      valField1: "Catering",
      descriptor: "Serve food and drink",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "serving food",
      output: "Serve food",
      category: "skill",
      valField1: "Catering",
      descriptor: "Serve food and drink",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "serving meals",
      output: "Serve food",
      category: "skill",
      valField1: "Catering",
      descriptor: "Serve food and drink",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "serve food",
      output: "Serve food",
      category: "skill",
      valField1: "Catering",
      descriptor: "Serve food and drink",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "preparation",
      output: "Food Prep",
      category: "skill",
      valField1: "Catering",
      descriptor: "Preparation of food",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "permanent",
      output: "Permanent",
      category: "time",
      valField1: "Catering",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "perm",
      output: "Permanent",
      category: "time",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "part time",
      output: "Part-time",
      category: "time",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "Part-time",
      output: "Part-time",
      category: "time",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "term time",
      output: "Term-Time",
      category: "time",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "term-time",
      output: "Term-Time",
      category: "time",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "food preparation",
      output: "Food Prep",
      category: "skill",
      valField1: "Catering",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "preparation food",
      output: "Food Prep",
      category: "skill",
      valField1: "catering",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "food beverages",
      output: "Catering",
      category: "category",
      valField1: "Catering",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "hornchurch",
      output: "Hornchurch",
      category: "location",
      valField1: "51.5565, 0.2128",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "altnagelvin",
      output: "Altnagelvin Hospital",
      category: "location",
      valField1: "BT47 6SB",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "south west acute",
      output: "South West Acute Hospital",
      category: "location",
      valField1: "BT74 6DN",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "londonderry",
      output: "Londonderry",
      category: "location",
      valField1: "BT47 6SB",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "enniskillen",
      output: "Enniskillen",
      category: "location",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "horn church",
      output: "Hornchurch",
     category: "location",
      valField1: "51.5565, 0.2128",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "romford",
      output: "Romford",
      category: "location",
      valField1: "51.5812, 0.1837",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "rise park",
      output: "Rise Park School",
      category: "location",
      valField1: "RM1 4UD",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "central park",
      output: "Central Park",
      category: "location",
      valField1: "RM1 4UD",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "rainham village",
      output: "Rainham Village School",
      category: "location",
      valField1: "RM13 9AA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "hylands school",
      output: "Hylands School",
      category: "location",
      valField1: "RM1 2RU",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "highlands school",
      output: "Hylands School",
      category: "location",
      valField1: "RM1 2RU",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "hilldene",
      output: "Hilldene Primary School",
      category: "location",
      valField1: "RM3 7DU",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "hilldean",
      output: "Hilldene Primary School",
      category: "location",
      valField1: "RM3 7DU",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "hildene",
      output: "Hilldene Primary School",
      category: "location",
      valField1: "RM3 7DU",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "harold hill",
      output: "Harold Hill",
      category: "location",
      valField1: "",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "rise park school",
      output: "Rise Park School",
      category: "location",
      valField1: "RM1 4UD",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "st peters",
      output: "St Peter's School",
      category: "location",
      valField1: "RM1 4JA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "st peter's",
      output: "St Peter's School",
      category: "location",
      valField1: "RM1 4JA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "saint peter's",
      output: "St Peter's School",
      category: "location",
      valField1: "RM1 4JA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "engage care",
      output: "Engage Care Home",
      category: "location",
      valField1: "RM1 4JX",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "park lodge",
      output: "Park Lodge",
      category: "location",
      valField1: "RM1 4JX",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "st peter's",
      output: "St Peter's School",
      category: "location",
      valField1: "RM1 4JA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "elm park",
      output: "Elm Park School",
      category: "location",
      valField1: "RM12 5UA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "elm park school",
      output: "Elm Park School",
      category: "location",
      valField1: "RM12 5UA",
      descriptor: "",
      pools: "",
      shifts: "",
      weekdays: "",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "nurse days",
      output: "Nurse Days",
      category: "jobTitle",
      valField1: "Nursing",
      descriptor: "",
      pools: "Nursing Staff",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "nurse day",
      output: "Nurse Days",
      category: "jobTitle",
      valField1: "Nursing",
      descriptor: "",
      pools: "Nursing Staff",
      shifts: "Day",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "nurse nights",
      output: "Nurse Nights",
      category: "jobTitle",
      valField1: "Nursing",
      descriptor: "",
      pools: "Nursing Staff",
      shifts: "Night",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "nurse knights",
      output: "Nurse Nights",
      category: "jobTitle",
      valField1: "Nursing",
      descriptor: "",
      pools: "Nursing Staff",
      shifts: "Night",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
    {
      tag: "nurse knight",
      output: "Nurse Nights",
      category: "jobTitle",
      valField1: "Nursing",
      descriptor: "",
      pools: "Nursing Staff",
      shifts: "Night",
      weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      question: "",
      answer: "",
      required: false,
    },
  ];
  var questionArray = reactive([]);
  const poolsArray = ref([]);
  
  const stopWordsRE = /(?:^|\s+)(?:and|if|with|has|about|no|as|-|or|00|you|for|will|on|of|in|the|are|be|all|able|only|to)(?=\s+|$)/gi;
  
  const setTagData = (item, value) => {
    if (
      item.category === "jobTitle" &&
      (jobAd.value.title === "" ||
        jobAd.value.title.slice(0, 5) === item.output.slice(0, 5))
    ) {
      if (jobAd.value.title === "") jobAd.value.title = item.output;
      jobAd.pools = item.pools;
      poolsArray.value = item.pools.split(",");
      poolsArray.value.forEach((pool) => {
       var foundPool = pools.value.find((p) => p.name.trim() === pool.trim());
        if (foundPool) {
          foundPool.selected = true;
        }
      });
      var jobFamily = jobFamilies.value.find((jf) => jf.name === item.valField1);
      jobAd.value.jobFamily = jobFamily ? { id: jobFamily.id, name: item.valField1 } : "";
      var shifts = item.shifts.replaceAll(" ", "").split(",");
      var days = item.weekdays.replaceAll(" ", "").split(",");
      if (item.question) {
        questionArray.push({
          question: item.question,
          answer: item.answer,
          required: item.required,
        });
      }
      currShifts.length = 0;
      shifts.forEach((shift) => {
        var shiftFound = JSON.parse(
          JSON.stringify(possShifts.find((possShift) => possShift.name === shift))
        );
        days.forEach((day) => {
          var dayFound = shiftFound.days.find((possDay) => possDay.day === day);
          if (dayFound) {
            dayFound.active = 1;
          } else {
            dayFound.active = 0;
          }
        });
        currShifts.push(shiftFound);
      });
    } else if (item.category === "time") {
      if (item.output === "Permanent" && jobAd.value.permanent === false) {
        jobAd.value.permanent = true;
      }
    } else if (item.category === "location") {
      let foundLocation = null;
      if (locations.value.list?.length) {
        foundLocation = locations.value.list.find((loc) => loc.name === item.output);
      }
      if (foundLocation && jobAd.value.location === "") {
        jobAd.value.location = item.output;
      }
      if (!foundLocation) {
        jobAd.value.workLocation = item.output;
        jobAd.value.postcode = item.valField1;
      }
    } else if (item.category === "skill" || item.category === "qualifier") {
      let skillExists = skillsArray.find((skill) => skill.name === item.output);
      if (!skillExists) {
        skillsArray.push({
          name: item.output,
          descriptor: item.descriptor,
          pools: "",
          shifts: "",
          question: item.question,
          answer: item.answer,
          required: item.required,
        });
        if (item.question) {
          questionArray.push({
            question: item.question,
            answer: item.answer,
            required: item.required,
          });
        }
      }
    }
  };
  
  const urlRegex = /(https:\/\/\S*)/;
  var url = "",
    hours = null,
    numHours = 0,
    PAs = null,
    numPAs = ref(0);
  
  const processTextRegexs = (value) => {
    // no advert required
    let noAdvert = value.toLowerCase().match(/no advert|hide advert/);
    if (noAdvert) {
      showAdvert.value = false;
    } else {
      showAdvert.value = true;
    }
  
    // shift array
    let shiftRoleTrue = value.toLowerCase().match(/shift role|shift job|shift roll/);
    if (shiftRoleTrue) {
      shiftRole.value = true;
    } else {
      shiftRole.value = false;
    }
  
    // salary calcs
    let salary = value.match(/£([\d]*[. ]\d?\d?|[\d,]*)/);
    let salaryPR = value.match(/pro rata.*£([\d]*[. ]\d?\d?|[\d,]*)/);
    salary = salaryPR ? salaryPR[1] : salary ? salary[1] : "";
    salary = salary?.replaceAll(" ", ".");
    salary = salary?.replaceAll(/[\,£]/g, "");
    var salNumber = null;
    if (salary) {
      jobAd.value.salaryText = salary;
      salNumber = Number(salary.replace(/[^0-9.-]+/g, ""));
      if (salNumber > 100) salNumber = salNumber.toFixed(0);
      if (salNumber <= 1000) {
        jobAd.value.rate = salNumber.toFixed(2);
      } else {
        jobAd.value.rate = "";
      }
    }
    numPAs.value = 0;
    numHours = 0;
    // PAs per week
    PAs = value.match(/([\d])*.PA[\'s]/g);
    numPAs.value = PAs ? Number(PAs[0].split(" ")[0]) : 0;
    if ((numPAs.value ? numPAs.value : 0) <= 0) {
      // hours per week
      hours = value.match(/([0-9\.,])+.?[Hh]/g);
      hours = hours ? hours[0].replace(/[Hh ]/gi, "") : "";
      let proRata = value.match(/pro rata/g);
      if (hours) {
        jobAd.value.hoursPerWeek = hours;
        numHours = Number(hours.replace(/[^0-9.-]+/g, ""));
        if (salNumber > 1000) {
          numHours = Number(hours.replace(/[^0-9.-]+/g, ""));
          if (proRata) {
            jobAd.value.rate = (salNumber / (52 * 37.5)).toFixed(2);
          } else {
            jobAd.value.rate = (salNumber / (numHours * 52)).toFixed(2);
          }
        }
      }
    } else {
      jobAd.value.hoursPerWeek = numPAs.value;
      jobAd.value.rate = salNumber;
    }
    if ((numHours && numHours >= 35) || (numPAs.value && numPAs.value > 9)) {
      tagsArray.push({
        name: "Full-Time",
        deleted: false,
        order: 4,
        category: "time",
        descriptor: "",
        pools: "",
        shifts: "",
        weekdays: "",
        question: "",
        answer: "",
        required: false,
      });
      jobAd.value.jobType = "Full-time";
    } else {
      tagsArray.push({
        name: "Part-Time",
        deleted: false,
        order: 4,
        category: "time",
        descriptor: "",
        pools: "",
        shifts: "",
        weekdays: "",
        question: "",
        answer: "",
        required: false,
      });
      jobAd.value.jobType = "Part-time";
    }
    // set days active in shifts or weekends/weekdays/everyday
    let regex = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi;
    let daysArray = value.toLowerCase().match(regex) ? value.match(regex) : [];
    if (daysArray.length > 0) {
      daysArray.forEach((day) => {
        let dayIndex = daysArray.indexOf(day);
        daysArray[dayIndex] = day.charAt(0).toUpperCase() + day.substr(1, 2);
      });
      currShifts.forEach((shift) => {
        shift.days.forEach((day) => {
          day.active = daysArray.includes(day.day) ? 1 : 0;
        });
      });
    } else {
      regex = /(weekend|weekday|every day|everyday|all week)/gi;
      daysArray = value.toLowerCase().match(regex) ? value.match(regex) : [];
      if (daysArray.length > 0) {
        if (daysArray[0] === "weekend") {
          currShifts.forEach((shift) => {
            shift.days.forEach((day) => {
              day.active = day.dayIndex > 4 ? 1 : 0;
            });
          });
        } else if (daysArray[0] === "weekday") {
          currShifts.forEach((shift) => {
            shift.days.forEach((day) => {
              day.active = day.dayIndex < 5 ? 1 : 0;
            });
          });
        } else {
          currShifts.forEach((shift) => {
            shift.days.forEach((day) => {
              day.active = 1;
            });
          });
        }
      }
    }
    // set number of shifts by day
    regex = /((mon to fri|mon|tue|wed|thu|fri|sat|sun)(.*day\W|\W)(\d\W|too|to)?\W?)/gi;
    daysArray = value.toLowerCase().match(regex) ? value.toLowerCase().match(regex) : [];
    let daysArray2 = [];
    let daysArray3 = [];
    if (daysArray.length > 0) {
      if (daysArray[0].includes("mon to fri"))
        daysArray[0] = daysArray[0].replace("mon to fri", "mon tue wed thu fri");
      if (daysArray.length === 1) {
        let tmpArray = daysArray[0].split(" ");
        for (let i = 0; i < tmpArray.length; i++) {
          if (tmpArray[i].length >= 3) {
            let theDay = tmpArray[i].charAt(0).toUpperCase() + tmpArray[i].substr(1, 2);
            if (daysList.includes(theDay)) {
              if (tmpArray[i + 1] === "too" || tmpArray[i + 1] === "to") {
                tmpArray[i + 1] = "2";
              } else if (tmpArray[i + 1] === "") {
                tmpArray[i + 1] = "1";
              }
              if (isNaN(Number(tmpArray[i + 1]))) {
                daysArray2.push(theDay + " 1");
              } else {
                daysArray2.push(theDay + " " + tmpArray[i + 1]);
              }
            }
          }
        }
        daysArray = daysArray2;
      }
      daysArray2 = [];
      daysArray.forEach((day) => {
        daysArray3 = day.split(" ");
        if (daysArray3.length === 1) daysArray3.push("1");
        if (daysArray3[1] === "too") daysArray3[1] = "2";
        if (daysArray3[1] === "to") daysArray3[1] = "2";
        if (daysArray3[1] === "") daysArray3[1] = "1";
        let theDay = daysArray3[0].charAt(0).toUpperCase() + daysArray3[0].substr(1, 2);
        if (daysList.includes(theDay)) {
          let dayNumber = Number(daysArray3[1]);
          if (!isNaN(dayNumber)) {
            if (dayNumber > 1) shiftRole.value = true;
            daysArray2.push({ day: theDay, number: dayNumber });
          } else {
            daysArray2.push({ day: theDay, number: 1 });
          }
        }
      });
  
      if (daysArray2.length > 0) {
        daysArray2.forEach((day) => {
          let dayIndex = daysArray[0].indexOf(day.day);
          daysArray[dayIndex] = day.day.charAt(0).toUpperCase() + day.day.substr(1, 2);
        });
        currShifts.forEach((shift) => {
          shift.days.forEach((day) => {
            day.active = daysArray2.find((dayA) => dayA.day === day.day)
              ? daysArray2.find((dayA) => dayA.day === day.day).number
              : 0;
          });
        });
      }
    }
    // find closing/expiry date for role
    regex = /clos[ing|. date].*?(\d{1,2})[rd|nd|st|th]*[ \/](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|..)/;
    let expiryDate = value.toLowerCase().replaceAll(" of ", " ").match(regex)
      ? value.toLowerCase().replaceAll(" of ", " ").match(regex)
      : [];
    if (expiryDate.length < 2) {
      regex = /clos[ing|e date].*(first|second)[ \/](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|..)/;
      expiryDate = value.toLowerCase().replaceAll(" of ", " ").match(regex)
        ? value.toLowerCase().replaceAll(" of ", " ").match(regex)
        : [];
      if (expiryDate.length > 2) {
        expiryDate[1] = expiryDate[1] === "first" ? "1" : "2";
      }
    }
    // find start date for role
    regex = /start[ing| date].*?(\d{1,2})[rd|nd|st|th]*[ \/](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|..)/;
    let startDate = value.toLowerCase().replaceAll(" of ", " ").match(regex)
      ? value.toLowerCase().replaceAll(" of ", " ").match(regex)
      : [];
    if (startDate.length < 2) {
      regex = /start[ing| date].*?(first|second)*[ \/](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|..)/;
      startDate = value.toLowerCase().replaceAll(" of ", " ").match(regex)
        ? value.toLowerCase().replaceAll(" of ", " ").match(regex)
        : [];
      if (startDate.length > 2) {
        startDate[1] = startDate[1] === "first" ? "1" : "2";
      }
    }
  
    let months = "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec".split("|");
    if (expiryDate.length > 2) {
      if (expiryDate[2].length === 2) expiryDate[2] = months[expiryDate[2] - 1];
      jobAd.value.expiry = moment(
        moment().format("YYYY") + "-" + expiryDate[2] + "-" + expiryDate[1]
      ).format("YYYY-MM-DD");
      if (startDate.length < 2) {
        jobAd.value.startDate = moment(
          moment().format("YYYY") + "-" + expiryDate[2] + "-" + expiryDate[1]
        )
          .day(8)
          .format("YYYY-MM-DD");
        jobAd.value.endDate = moment(
          moment().format("YYYY") + "-" + expiryDate[2] + "-" + expiryDate[1]
        )
          .day(13)
          .format("YYYY-MM-DD");
      }
    }
  
    if (startDate.length > 2) {
      if (startDate[2].length === 2) startDate[2] = months[startDate[2] - 1];
      if (expiryDate.length < 2)
        jobAd.value.expiry = moment(
          moment().format("YYYY") + "-" + startDate[2] + "-" + startDate[1]
        )
          .subtract(1, "days")
          .format("YYYY-MM-DD");
  
      jobAd.value.startDate = moment(
        moment().format("YYYY") + "-" + startDate[2] + "-" + startDate[1]
      ).format("YYYY-MM-DD");
      if (!jobAd.value.endDate) {
        jobAd.value.endDate = moment(
          moment().format("YYYY") + "-" + startDate[2] + "-" + startDate[1]
        )
          .add(6, "days")
          .format("YYYY-MM-DD");
      }
    }
    // this/next week or week after next
    regex = /(this week|next week|week after next)/gi;
    let durationArray = value.toLowerCase().match(regex)
      ? value.toLowerCase().match(regex)
      : [];
    if (durationArray.length > 0) {
      if (durationArray[0] === "this week") {
        weekSelected.value = moment().day(1).format("YYYY-MM-DD");
      } else if (durationArray[0] === "next week") {
        weekSelected.value = moment().day(8).format("YYYY-MM-DD");
      } else if (durationArray[0] === "week after next") {
        weekSelected.value = moment().day(15).format("YYYY-MM-DD");
      }
    }
    durationArray = [];
    // duration of role - weeks or months
    regex = /(\d*|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) (week)|(\d*|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) (month)|(\d*|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) (year)/gi;
    let numbers = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
    ];
    durationArray = value.toLowerCase().match(regex) ? value.match(regex) : [];
    let duration = [];
    if (durationArray.length > 0) {
      durationArray.forEach((duration) => {
        duration = duration.split(" ");
        if (numbers.indexOf(duration[0]) > 0)
          duration[0] = numbers.indexOf(duration[0]).toString();
        if (duration[0].length > 0) {
          duration[1] += "s";
          jobAd.value.endDate = moment(jobAd.value.startDate)
            .add(parseInt(duration[0]), duration[1])
            .subtract(1, "days")
            .format("YYYY-MM-DD");
        }
      });
    }
    // shift array
    let createRoleRx = value.toLowerCase().match(/submit role|create role|create roll/);
    if (createRoleRx) {
      saveJobAd(jobAd);
    }
    daysText.value =
      (daysArray.indexOf("mon ") > -1 || daysArray.indexOf("Mon") > -1 ? "1" : "0") +
      (daysArray.indexOf("tue ") > -1 || daysArray.indexOf("Tue") > -1 ? "1" : "0") +
      (daysArray.indexOf("wed ") > -1 || daysArray.indexOf("Wed") > -1 ? "1" : "0") +
      (daysArray.indexOf("thu ") > -1 || daysArray.indexOf("Thu") > -1 ? "1" : "0") +
      (daysArray.indexOf("fri ") > -1 || daysArray.indexOf("Fri") > -1 ? "1" : "0") +
      (daysArray.indexOf("sat ") > -1 || daysArray.indexOf("Sat") > -1 ? "1" : "0") +
      (daysArray.indexOf("sun ") > -1 || daysArray.indexOf("Sun") > -1 ? "1" : "0");
  };
  
  const textChanged = () => {
    const tags = new Set();
  
    pools.value.forEach((pool) => {
      pool.selected = false;
    });
    const replace = new Set();
    deletedTags = tagsArray.filter((tag) => tag.deleted);
    skillsArray.length = 0; // blank array
    tagsArray.length = 0;
    let items = [];
    //  const text = document.getElementById("textInput");
    const noStopDisplay = document.getElementById("noStopWords");
  
    noStopDisplay.innerHTML = "";
  
    if (!jobAdId) {
      jobAd.value.title = "";
      jobAd.value.location = "";
      jobAd.value.workLocation = "";
      jobAd.value.postcode = "";
      jobAd.value.jobType = "";
      jobAd.value.permanent = false;
      jobAd.value.rate = "";
      jobAd.value.salaryText = "";
      jobAd.value.hoursPerWeek = "";
      jobAd.value.jobFamily = "";
    }
    questionArray = [];
    currShifts.length = 0;
    currShifts.push({
      name: "Day",
      start: "09:00",
      end: "17:30",
      days: [
        { day: "Mon", dayIndex: 0, active: 1 },
        { day: "Tue", dayIndex: 1, active: 1 },
        { day: "Wed", dayIndex: 2, active: 1 },
        { day: "Thu", dayIndex: 3, active: 1 },
        { day: "Fri", dayIndex: 4, active: 1 },
        { day: "Sat", dayIndex: 5, active: 0 },
        { day: "Sun", dayIndex: 6, active: 0 },
      ],
      hours: 8,
      rate: 10,
    });
  
    let regex = />/gi;
    let value = textAreaText.value;
    value = value.replace(regex, "> "); // add a space after html tags to keep word spacing
  
    regex = /(<([^>]+)>)/gi;
    value = value.replace(regex, ""); // remove html tags
    url = value.match(urlRegex)
      ? "<a target='_blank' class='adLink' href='" +
        value.match(urlRegex)[0] +
        "'>View Job Details</a>"
      : "";
  
    value = value.replaceAll(".00", ""); // some ads have hours with e.g. 15.00
    value = value.replaceAll("(", " ");
    value = value.replaceAll(")", " ");
    value = value.replaceAll("£", " £");
  
    value = value.replaceAll("&nbsp;", " ");
    value = value.replaceAll("  ", " ");
    if (value.length < 2) return;
  
    value = value.replaceAll("£ ", "£");
  
    let valueNoStopWords = value.replaceAll(/([:,.-])/gi, " ");
    valueNoStopWords = valueNoStopWords.replace(stopWordsRE, "").trim();
  
    valueNoStopWords = valueNoStopWords.replaceAll("  ", " ");
    const wordArray = valueNoStopWords.toLowerCase().match(/\b(\w+)\b/g);
    const twoWordArray = [];
    const threeWordArray = [];
    if (!wordArray) return;
    for (let i = 0; i < wordArray.length - 1; i++) {
      twoWordArray.push(wordArray[i] + " " + wordArray[i + 1]);
    }
    for (let i = 0; i < wordArray.length - 2; i++) {
      threeWordArray.push(wordArray[i] + " " + wordArray[i + 1] + " " + wordArray[i + 2]);
    }
  
    items = [];
    pools.value.forEach((pool) => {
      pool.selected = false;
    });
    searchArray.forEach((item) => {
      items.push(item);
      if (threeWordArray.includes(item.tag)) {
        tags.add(item.output);
        setTagData(item, value);
        if (item.output.toLowerCase() === item.tag) {
          replace.add(item.output);
        } else {
          replace.add(item.tag);
        }
      }
      if (wordArray.includes(item.tag)) {
        tags.add(item.output);
        setTagData(item, value);
        if (item.output.toLowerCase() === item.tag) {
          replace.add(item.output);
        } else {
          replace.add(item.tag);
        }
      }
      if (twoWordArray.includes(item.tag)) {
        tags.add(item.output);
        setTagData(item, value);
        if (item.output.toLowerCase() === item.tag) {
          replace.add(item.output);
        } else {
          replace.add(item.tag);
        }
      }
    });
    questionArray.forEach((question, index) => {
      jobAd.value["q" + (index + 1)] = question.question;
      jobAd.value["q" + (index + 1) + "Resp"] = question.answer;
      jobAd.value["q" + (index + 1) + "Req"] = question.required;
    });
    replace.forEach((item, index) => {
      let cat = searchArray.find(
        (searchItem) => searchItem.tag.toLowerCase() === item.toLowerCase()
      ).category;
      let regEx = new RegExp(item, "ig");
      valueNoStopWords = valueNoStopWords.replace(
        regEx,
        "<span class='tagUnderline" + cat + "''>" + item + "</span>"
      );
    });
  
    tags.forEach((item) => {
      let sItem = searchArray.find((searchItem) => searchItem.output === item);
      let order = cats.find((catItem) => catItem.name === sItem.category).order;
      tagsArray.push({
        name: item,
        deleted: false,
        order: order,
        category: sItem.category,
        descriptor: sItem.descriptor,
        shifts: sItem.shifts,
        weekdays: sItem.weekdays,
        question: sItem.question,
        answer: sItem.answer,
        required: sItem.required,
      });
    });
    tagsArray.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    //  text.innerHTML = value + "&nbsp;";
    noStopDisplay.innerHTML = valueNoStopWords;
    subTitleTemplate.value =
      (jobAd.value.workLocation
        ? jobAd.value.workLocation
        : "<span class='tagUnderlineother'>Work Location</span>") + "";
    processTextRegexs(value);
    let foundJob = jobs.value.find(
      (job) =>
        job.title === jobAd.value.title &&
        (job.location === jobAd.value.location || job.location === jobAd.value.workLocation)
    );
    if (foundJob && !jobAdId) {
      loadJobAd(foundJob.id);
    } else {
      window.scrollTo(0, 0);
    }
  };
  
  const jobAd = ref({
    id: "",
    reference: "-",
    title: "",
    activityCode: "",
    accountCode: "",
    purchaseOrder: "",
    description: "",
    skills: "",
    pools: "",
    qualification: "-",
    healthSafetyNotes: "-",
    location: "Central Park",
    workLocation: "",
    postcode: "",
    status: "Open",
    jobType: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q1Req: false,
    q2Req: false,
    q3Req: false,
    q4Req: false,
    q1Resp: "",
    q2Resp: "",
    q3Resp: "",
    q4Resp: "",
    permanent: false,
    expiry: moment(new Date()).format("YYYY-MM-DD"),
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
    rate: "",
    salaryText: "",
    hoursPerWeek: "",
    manager: localStorage.getItem("userId"),
    invoiceContact: localStorage.getItem("userId"),
    jobFamily: "1",
    shiftRole: false,
    workersRequired: 1,
    createdBy: localStorage.getItem("userId"),
    lastModifiedBy: localStorage.getItem("userId"),
    createdOn: moment(new Date()).format("YYYY-MM-DD"),
    lastModified: moment(new Date()).format("YYYY-MM-DD"),
    organisation: localStorage.getItem("orgId"),
    reason: null,
  });
  let jobAdId = window.location.href.indexOf("id=")
    ? window.location.href.split("id=")[1]
    : null;
  const fetchData = async () => {
    const jobAdInstance = ref(jobAd);
    try {
      const isLoading = ref(true);
      const templateId = window.location.href.indexOf("template=")
        ? window.location.href.split("template=")[1]
        : null;
      let config = {};
      if (jobAdId) {
        config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "jobAd/show/" + jobAdId + ".json",
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (templateId) {
        config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "jobTemplates/" + templateId + ".json",
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else {
        isLoading.value = false;
        return;
      }
      axios(config)
        .then(function (response) {
          jobAdInstance.value = response.data;
          isLoading.value = false;
          if (jobAdInstance.value !== null) {
            textAreaText.value =
              jobAdInstance.value.title +
              " - " +
              jobAdInstance.value.location +
              " (start " +
              moment(jobAdInstance.value.startDate).format("DD/MM/YYYY") +
              ") " +
              jobAdInstance.value.skills +
              " " +
              (jobAdInstance.value.qualification !== "none"
                ? jobAdInstance.value.qualification
                : "") +
              (jobAdInstance.value.shiftRole ? " shift role " : " ");
            nextTick(() => {
              textChanged();
            });
            jobAd.value = {
              id: jobAdInstance.value.id,
              reference: jobAdInstance.value.reference,
              title: jobAdInstance.value.title,
              activityCode: jobAdInstance.value.activityCode,
              accountCode: jobAdInstance.value.accountCode,
              purchaseOrder: jobAdInstance.value.purchaseOrder,
              description: jobAdInstance.value.description,
              skills: jobAdInstance.value.skills,
              qualification: jobAdInstance.value.qualification,
              healthSafetyNotes: jobAdInstance.value.healthSafetyNotes,
              location: jobAdInstance.value.location,
              status: jobAdInstance.value.status,
              jobType: jobAdInstance.value.jobType,
              q1: jobAdInstance.value.q1,
              q2: jobAdInstance.value.q2,
              q3: jobAdInstance.value.q3,
              q4: jobAdInstance.value.q4,
              q1Req: jobAdInstance.value.q1Req,
              q2Req: jobAdInstance.value.q2Req,
              q3Req: jobAdInstance.value.q3Req,
              q4Req: jobAdInstance.value.q4Req,
              q1Resp: jobAdInstance.value.q1Resp,
              q2Resp: jobAdInstance.value.q2Resp,
              q3Resp: jobAdInstance.value.q3Resp,
              q4Resp: jobAdInstance.value.q4Resp,
              shiftRole: jobAdInstance.value.shiftRole,
              permanent: jobAdInstance.value.permanent === "true" ? true : false,
              expiry: moment(jobAdInstance.value.expiry).format("YYYY-MM-DD"),
              startDate: moment(jobAdInstance.value.startDate).format("YYYY-MM-DD"),
              endDate: moment(jobAdInstance.value.endDate).format("YYYY-MM-DD"),
              rate: jobAdInstance.value.rate,
              salaryText: jobAdInstance.value.salaryText,
              hoursPerWeek: jobAdInstance.value.hoursPerWeek,
              manager: jobAdInstance.value.manager.id,
              invoiceContact: jobAdInstance.value.invoiceContact.id,
              jobFamily: jobAdInstance.value.jobFamily.id,
            };
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  const managers = ref([]);
  const manager = ref("");
  const director = ref("");
  const fetchManagers = async () => {
    try {
      const response = await axios.get("managers.json");
      if (response.status === 200) {
        managers.value = response.data;
        manager.value = managers.value.find(
          (manager) => manager.name == "A Service Manager"
        );
        director.value = managers.value.find((manager) => manager.name == "A Director");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const locations = ref([]);
  const fetchLocations = async () => {
    try {
      const response = await axios.get("locations.json?max=250");
      if (response.status === 200) {
        locations.value = response.data;
        locations.value.list = locations.value.list.filter(
          (loc) => loc.organisation.id == localStorage.getItem("orgId")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const jobFamilies = ref([]);
  const fetchJobFamilies = async () => {
    try {
      const response = await axios.get("jobFamilies.json");
      if (response.status === 200) {
        jobFamilies.value = response.data;
        jobFamilies.value = jobFamilies.value.filter(
          (jf) => jf.organisation.id == localStorage.getItem("orgId")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const togglePreSaveDialog = () => {
    const confirmSaveModal = document.getElementById("confirmSaveModal");
  
    if (confirmSaveModal.style.display == "" || confirmSaveModal.style.display == "none") {
      confirmSaveModal.style.display = "block";
    } else {
      confirmSaveModal.style.display = "none";
    }
  };
  
  const sentMail = ref(false);
  const preSaveDialog = (jobAd) => {
    if (jobAd.organisation != 2) {
      saveJobAd(jobAd);
    }
    togglePreSaveDialog();
  };
  const saveJobAd = async (jobAd) => {
    togglePreSaveDialog();
    jobAd.skills = "";
    skillsArray.forEach((skill) => {
      jobAd.skills += skill.name + ", ";
    });
    url = textAreaText.value.match(urlRegex)
      ? "<a target='_blank' class='adLink' href='" +
        textAreaText.value.match(urlRegex)[0] +
        "'>View Job Details</a>"
      : "";
    jobAd.jobLinkURL = url;
    jobAd.description = textAreaText.value
      .replace(urlRegex, "")
      .slice(0, 400)
     .trim()
      .replace(/(Esc\n)/g, "");
    if (!jobAd.jobFamily) jobAd.jobFamily = 1;
    try {
      let response;
      if (jobAdId) {
        response = await axios.put("/jobAds/update/" + jobAdId + ".json", jobAd);
      } else {
        response = await axios.post("/jobAd/save.json", jobAd);
      }
      if (response.status === 200 || response.status === 201) {
        jobAd.id = response.data.id;
        pools.value.forEach((pool) => {
          if (pool.selected) {
            sendJob(jobAd, pool.id);
          }
        });
        console.log("Role saved successfully");
      }
    } catch (error) {
      console.log(error);
    }
    sentMail.value = true;
  };
  const sendJob = (jobAd, team) => {
    axios
      .post("/teamJobAd/save.json", { jobAd: jobAd, team: team })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  fetchJobFamilies();
  fetchLocations();
  fetchManagers();
  fetchData();
  const loadJobAd = async (jobId) => {
    jobAdId = jobId;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "jobAd/show/" + jobAdId + ".json",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const jobAdInstance = ref(jobAd);
    axios(config)
      .then(function (response) {
        jobAdInstance.value = response.data;
        console.log(jobAdInstance.value);
        //isLoading.value = false;
        if (jobAdInstance.value !== null) {
          textAreaText.value =
            jobAdInstance.value.title +
            " - " +
            jobAdInstance.value.location +
            " (start " +
            moment(jobAdInstance.value.startDate).format("DD/MM/YYYY") +
            ") " +
            jobAdInstance.value.skills +
            " " +
            (jobAdInstance.value.qualification !== "none"
              ? jobAdInstance.value.qualification
              : "");
          nextTick(() => {
            textChanged();
          });
          jobAd.value = {
            id: jobAdInstance.value.id,
            reference: jobAdInstance.value.reference,
            title: jobAdInstance.value.title,
            activityCode: jobAdInstance.value.activityCode,
            accountCode: jobAdInstance.value.accountCode,
            purchaseOrder: jobAdInstance.value.purchaseOrder,
            description: jobAdInstance.value.description,
            skills: jobAdInstance.value.skills,
            qualification: jobAdInstance.value.qualification,
            healthSafetyNotes: jobAdInstance.value.healthSafetyNotes,
            location: jobAdInstance.value.location,
            status: jobAdInstance.value.status,
            jobType: jobAdInstance.value.jobType,
            q1: jobAdInstance.value.q1,
            q2: jobAdInstance.value.q2,
            q3: jobAdInstance.value.q3,
            q4: jobAdInstance.value.q4,
            q1Req: jobAdInstance.value.q1Req,
            q2Req: jobAdInstance.value.q2Req,
            q3Req: jobAdInstance.value.q3Req,
            q4Req: jobAdInstance.value.q4Req,
            q1Resp: jobAdInstance.value.q1Resp,
            q2Resp: jobAdInstance.value.q2Resp,
            q3Resp: jobAdInstance.value.q3Resp,
            q4Resp: jobAdInstance.value.q4Resp,
            permanent: jobAdInstance.value.permanent === "true" ? true : false,
            expiry: moment(jobAdInstance.value.expiry).format("YYYY-MM-DD"),
            startDate: moment(jobAdInstance.value.startDate).format("YYYY-MM-DD"),
            endDate: moment(jobAdInstance.value.endDate).format("YYYY-MM-DD"),
            rate: jobAdInstance.value.rate,
            salaryText: jobAdInstance.value.salaryText,
            hoursPerWeek: jobAdInstance.value.hoursPerWeek,
            manager: jobAdInstance.value.manager.id,
            invoiceContact: jobAdInstance.value.invoiceContact.id,
            jobFamily: jobAdInstance.value.jobFamily.id,
          };
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  </script>
  <style>
  input:hover {
    color: black !important;
    background-color: white !important;
  }
  .texts p {
    color: black;
    text-align: left;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .texts p.replay {
    text-align: right;
  }
  .xTag {
    font-size: 0.8rem;
    margin-left: 5px;
    margin-top: 1px;
    cursor: pointer;
  }
  .extraCardShadow {
    box-shadow: 1.5px 1.5px 10px rgba(0, 0, 0, 0.17), 12px 12px 80px rgba(0, 0, 0, 0.1) !important;
    border-left: 8px solid #1076ad;
  }
  .tagContainer {
    display: flex;
    flex-flow: column nowrap;
  }
  .adLink {
    color: #005be3 !important;
    text-decoration: underline !important;
  }
  .tags {
    margin: 10px 0;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #eee;
    min-height: 30px;
    box-shadow: 0.9px 0.3px 5.3px rgba(0, 0, 0, 0.01),
      3.1px 1.1px 17.9px rgba(0, 0, 0, 0.013), 14px 5px 80px rgba(0, 0, 0, 0.02);
  }
  </style>
  