<template>
  <div class="col d-flex flex-column h-sm-100">
    <main class="row overflow-auto m-1 fs-6 bg-light">
      <div class="card">
        <div class="card-body px-0">
          <ul class="m-2 p-1 nav nav-pills nav-fill">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: selTab === 'Planning' }"
                @click="selTab = 'Planning'"
                >View/Create <i class="bx bx-align-left"></i
              ></a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: selTab === 'Control' }"
                @click="selTab = 'Control'"
                >Control <i class="bx bx-alarm"></i
              ></a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: selTab === 'Review' }"
                @click="selTab = 'Review'"
                >Review <i class="ri-dashboard-2-line"></i
              ></a>
            </li>
          </ul>
          <div v-if="selTab === 'Planning'">
            <table class="table table-hover mt-2">
              <thead>
                <tr>
                  <th class="p-0">
                    <div class="form-group col-auto flex-fill">
                      <span class="p-1">Client</span>
                      <select
                        name="location"
                        class="form-select-sm mb-2"
                        id="location"
                        v-model="selClient"
                        @change="changeClient"
                      >
                        <option value="All">All</option>
                        <option
                          v-for="(client, index) in clients"
                          :key="index"
                          :value="client"
                        >
                          {{ client }}
                        </option>
                        <option value="Add New Client ...">Add new client ...</option>
                      </select>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="form-group col-auto flex-fill">
                      <label for="location" class="p-1">Category</label>
                      <select
                        name="group"
                        class="form-select-sm"
                        id="group"
                        v-model="selectCategory"
                      >
                        <option value="All">All</option>
                        <option
                          :value="category"
                          v-for="(category, index) in categories"
                          :key="index"
                        >
                          {{ category.name }}
                        </option>
                        <option value="Add New Category">Add new category ...</option>
                      </select>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="form-group col-auto flex-fill">
                      <label for="location" class="p-1">Sub-Category</label>
                      <select
                        name="group"
                        class="form-select-sm"
                        id="group"
                        v-model="selSubCategory"
                      >
                        <option value="All">All</option>
                        <option
                          :value="subCategory"
                          v-for="(subCategory, index) in subCategories"
                          :key="index"
                        >
                          {{ subCategory.name }}
                        </option>
                        <option value="Add New Category">Add new sub category ...</option>
                      </select>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="form-group col-auto flex-fill">
                      <label for="projectType" class="p-1">Project Type</label>
                      <select
                        class="form-select-sm"
                        name="projectType"
                        id="projectType"
                        v-model="selProjectType"
                      >
                        <option value="All">All</option>
                        <option
                          v-for="(pType, index) in projectTypes"
                          :key="index"
                          :value="pType.name"
                        >
                          {{ pType.name }}
                        </option>
                      </select>
                    </div>
                  </th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(proj, index) in displayedProjectList" :key="index">
                  <td @click="selWorker = proj.client">{{ proj.client }}</td>
                  <td>{{ proj.category }}</td>
                  <td>{{ proj.subCategory }}</td>
                  <td>{{ proj.projectType }}</td>
                  <td>{{ proj.description }}</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end mt-3">
              <div class="pagination-wrap hstack gap-2">
                <a
                  class="page-item pagination-prev disabled"
                  href="#"
                  v-if="page != 1"
                  @click="page--"
                >
                  Previous
                </a>
                <ul class="pagination listjs-pagination mb-0">
                  <li
                    :class="{
                      active: pageNumber == page,
                      disabled: pageNumber == '...',
                    }"
                    v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                    :key="index"
                    @click="page = pageNumber"
                  >
                    <a class="page" href="#">{{ pageNumber }}</a>
                  </li>
                </ul>
                <a
                  class="page-item pagination-next"
                  href="#"
                  @click="page++"
                  v-if="page < pages.length"
                >
                  Next
                </a>
              </div>
            </div>
            <button
              type="button"
              class="btn"
              :class="{ 'btn-primary': !published, 'btn-warning': published }"
              data-bs-dismiss="modal"
              style="float: right"
              v-if="startNextWeek !== payrolledWeek"
              @click="published = !published"
            >
              <span v-if="!published && startNextWeek !== payrollWeek">Publish</span>
              <span v-if="startNextWeek === payrollWeek">Payroll Export</span>
              <span v-if="published && startNextWeek !== payrollWeek">Retract</span>
            </button>
            <div v-else class="text-info fs-13 text-center">
              <i class="bx bx-lock"></i>&NonBreakingSpace;Payroll Extracted at 13:16 on
              Wed 3rd January by Derek Macrae
            </div>
            <div
              class="modal fade"
              id="workerAddModal"
              tabindex="-1"
              aria-labelledby="workerAddModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-light p-3">
                    <h5 class="modal-title" id="workerAddModalTitle">
                      {{ workerScreenTitle }}
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#workerViewModal"
                        title="Impersonate Worker"
                        @click="selWorker = worker.worker"
                        ><i class="bx bx-street-view text-info"></i
                      ></a>
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="close-modal"
                    ></button>
                  </div>
                  <form action="#" id="addform">
                    <div class="modal-body">
                      <input type="hidden" id="id-field" />

                      <div class="mb-3" id="modal-id" style="display: none">
                        <label for="id-field1" class="form-label">ID</label>
                        <input
                          type="text"
                          id="idfield1"
                          class="form-control"
                          placeholder="ID"
                          readonly
                        />
                      </div>

                      <div class="mb-3">
                        <label for="customername-field" class="form-label"
                          >Worker Name</label
                        >
                        <input
                          type="text"
                          id="customername"
                          class="form-control"
                          placeholder="Enter Worker Name"
                          required
                          v-model="worker.worker"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="payRef-field" class="form-label"
                          >Payroll Reference</label
                        >
                        <input
                          type="text"
                          id="payRef"
                          class="form-control"
                          v-model="worker.payRef"
                          placeholder="Enter Payroll reference."
                          required
                        />
                      </div>

                      <div class="mb-3">
                        <label for="email-field" class="form-label">Email</label>
                        <input
                          type="email"
                          id="email"
                          class="form-control"
                          placeholder="Enter Email"
                          v-model="worker.email"
                          required
                        />
                      </div>

                      <div class="mb-3">
                        <label for="phone-field" class="form-label">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          class="form-control"
                          placeholder="Enter Phone no."
                          v-model="worker.phone"
                          required
                        />
                      </div>

                      <div class="mb-3">
                        <label for="date-field" class="form-label">Joining Date</label>
                        <flat-pickr
                          :config="config"
                          class="form-control"
                          id="joindate"
                          v-model="worker.fromDate"
                        ></flat-pickr>
                      </div>
                      <div v-if="currPool == 'Agency'">
                        <label for="status-field" class="form-label">Agency</label>
                        <select class="form-control" data-trigger id="statusfield">
                          <option value="">Select Agency ...</option>
                          <option value="Active">Blue Arrow</option>
                          <option value="Block">PerTemps</option>
                          <option value="Add">Add Agency ...</option>
                        </select>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          id="closeWorkerAddmodal"
                          class="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          v-if="workerScreenTitle.slice(0, 3) === 'Add'"
                        >
                          Load Worker File
                        </button>
                        <button type="button" class="btn btn-success" @click="addWorker">
                          <span v-if="workerScreenTitle.slice(0, 3) === 'Add'"
                            >Add Worker</span
                          >
                          <span v-else>Update Worker</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="availabilityModal"
              tabindex="-1"
              aria-labelledby="availabilityModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog availModal">
                <div class="modal-content">
                  <div class="modal-header" style="background: #5ea3cb">
                    <div class="row">
                      <h4
                        class="modal-title col-12 text-white"
                        id="availabilityModalTitle"
                      >
                        {{ selWorker }}
                      </h4>
                      <h6 class="col-12 text-white">{{ selClient }}</h6>
                    </div>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body mt-0">
                    <div>
                      <h4>Regular Availability</h4>
                      <table class="table table-hover text-center">
                        <thead>
                          <tr>
                            <th><i class="bx bx-calendar fs-20"></i></th>
                            <th
                              class="bg-light text-center"
                              v-for="(shift, index) in weekShifts"
                              :key="index"
                            >
                              {{ moment(startNextWeek).add(index, "days").format("ddd") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(sh, index) in shiftHeaders" :key="index">
                            <td>{{ sh.slice(0, 3) }}</td>
                            <td v-for="(shift, index) in weekShifts" :key="index">
                              <i
                                class="bx bx-check-circle text-success fillBtn"
                                v-if="
                                  shift.unavailable.indexOf(selWorker) === -1 &&
                                  sh === selCategory
                                "
                              >
                                <!-- will need to change when worker is available for multiple shifts -->
                              </i>
                              <span v-else>
                                <i class="bx bxs-x-circle absent text-warning"></i>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="workerViewModal"
              tabindex="-1"
              aria-labelledby="workerViewModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog workerViewModal">
                <div class="modal-content">
                  <div class="fs-13 pa-2">
                    <i class="bx bx-street-view text-info fs-14" style="padding: 4px"></i>
                    <span id="workerViewModalTitle" class="text-info">
                      impersonating {{ selWorker }}
                    </span>
                  </div>
                  <div class="modal-header">
                    <div class="row">
                      <h6 class="col-12">{{ selClient }}</h6>
                    </div>
                  </div>
                  <div class="modal-body pt-1">
                    <h5 class="text-center">Available Shifts</h5>
                    <div class="form-group col-auto flex-fill">
                      <div class="input-group">
                        <span
                          class="input-group-text"
                          style="width: 100px; padding: 0.05rem 0.2rem; font-size: 15px"
                          >Shift</span
                        >
                        <select
                          name="shiftGroup"
                          style="width: 100px; padding: 0.05rem 0.2rem; font-size: 15px"
                          class="form-select"
                          id="group"
                          v-model="selectCategory"
                        >
                          <option
                            :value="shift"
                            v-for="(shift, index) in shifts"
                            :key="index"
                          >
                            {{ shift }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-auto flex-fill">
                      <div class="input-group">
                        <span
                          class="input-group-text"
                          style="width: 100px; padding: 0.05rem 0.2rem; font-size: 15px"
                          >Week Starting</span
                        >
                        <select
                          style="padding: 0.05rem 0.2rem; font-size: 15px"
                          class="form-select"
                          name="weekStart"
                          id="weekStart"
                          v-model="startNextWeek"
                        >
                          <option
                            v-for="(week, index) in weekStarts"
                            :key="index"
                            :value="week.format('YYYY-MM-DD')"
                          >
                            {{
                              week.format("dddd").substring(0, 3) +
                              " " +
                              week.format("DD MMM")
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <table class="table table-hover mt-2 mb-0">
                      <thead>
                        <th
                          class="bg-light text-center"
                          v-for="(shift, index) in weekShifts"
                          :key="index"
                        >
                          {{ moment(startNextWeek).add(index, "days").format("ddd Do") }}
                        </th>
                      </thead>
                      <tbody>
                        <td
                          class="text-center"
                          v-for="(shift, index2) in weekShifts"
                          :class="{ 'bg-light': !(index2 % 2) }"
                          :key="index2"
                        >
                          <button
                            type="button"
                            class="btn btn-sm fillBtn"
                            @click="removeWorker(worker, shift)"
                            v-if="
                              shift.assigned.indexOf(selWorker) !== -1 &&
                              shift.noShow.indexOf(selWorker) === -1
                            "
                          >
                            <i class="bx bx-check-circle"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm noShowBtn"
                            @click="removeWorker({ worker: worker }, shift)"
                            v-if="shift.noShow.indexOf(selWorker) !== -1"
                          >
                            <i class="bx bxs-hide fs-20"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm addWorker"
                            @click="assignWorker({ worker: worker }, shift)"
                            v-if="
                              shift.shifts !== shift.assigned.length &&
                              shift.assigned.indexOf(selWorker) === -1 &&
                              shift.unavailable.indexOf(selWorker) === -1
                            "
                          >
                            <i class="ri-question-line"></i>
                          </button>
                          <span
                            v-if="
                              shift.shifts === shift.assigned.length &&
                              shift.assigned.indexOf(selWorker) === -1 && // not already assigned
                              shift.unavailable.indexOf(selWorker) === -1 && // not a No Show worker
                              shift.noShow.indexOf(selWorker) === -1
                            "
                            >-</span
                          >
                          <i
                            class="bx bxs-x-circle absent text-warning"
                            style="padding-top: 6px"
                            v-if="
                              shift.assigned.indexOf(selWorker) === -1 &&
                              shift.unavailable.indexOf(selWorker) !== -1
                            "
                          ></i>
                        </td>
                      </tbody>
                    </table>
                    <div
                      class="fs-14 text-danger pa-2 text-center mb-2"
                      v-if="thisWeekShifts.filter((sh) => sh.worker === selWorker).length"
                    >
                      {{
                        thisWeekShifts.filter((sh) => sh.worker === selWorker).length + 1
                      }}
                      Shift<span
                        v-if="
                          thisWeekShifts.filter((sh) => sh.worker === selWorker).length >
                          1
                        "
                        >s</span
                      >
                      available - please select which ones you wish to work by clicking
                      the <i class="ri-question-line text-info fs-16"></i> icons above.
                    </div>
                    <h5 class="text-center">Booked Shifts</h5>
                    <div class="accordion" id="default-accordion-example">
                      <div class="accordion-item">
                        <h4 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                            v-if="
                              lastWeekShifts.filter((sh) => sh.worker === selWorker)
                                .length
                            "
                          >
                            Last Week's Shifts
                          </button>
                        </h4>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse collapsed"
                          aria-labelledby="headingOne"
                          data-bs-parent="#default-accordion-example"
                          v-if="
                            lastWeekShifts.filter((sh) => sh.worker === selWorker).length
                          "
                        >
                          <div class="accordion-body" style="padding: 0 !important">
                            <table class="table table-hover mt-2">
                              <thead>
                                <th>Status</th>
                                <th>Date</th>
                                <th class="text-center">Start</th>
                                <th class="text-center">End</th>
                                <th class="text-center">Hrs</th>
                                <th class="text-center">Brk</th>
                                <th class="text-center">Paid Hrs</th>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(shift, index) in lastWeekShifts.filter(
                                    (sh) => sh.worker === selWorker
                                  )"
                                  :key="index"
                                >
                                  <td class="text-left fs-14">
                                    {{ shift.status }}
                                  </td>
                                  <td class="text-left fs-14">
                                    {{ moment(shift.date).format("ddd Do") }}
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{
                                      Clickable: shift.status !== 'No Show',
                                      NoShow: shift.status === 'No Show',
                                      Submitted: shift.status === 'Submitted',
                                      Started:
                                        shift.status === 'Started' ||
                                        shift.status === 'Approved',
                                    }"
                                  >
                                    <span
                                      v-if="!shift.editStart"
                                      @click="shift.editStart = true"
                                      :title="
                                        shift.status !== 'No Show'
                                          ? 'Click to enter a different start time'
                                          : 'Cannot change start time'
                                      "
                                    >
                                      {{ shift.start }}
                                    </span>
                                    <input
                                      style="max-width: 60px; margin: auto"
                                      @change="
                                        shift.editStart = false;
                                        shift.status = 'Started';
                                      "
                                      @keyup.enter="shift.editStart = false"
                                      @keyup.tab="shift.editStart = false"
                                      v-else
                                      type="timestamp"
                                      name="start"
                                      v-model="shift.start"
                                    />
                                    <span
                                      @click="
                                        shift.status =
                                          shift.status === 'Started'
                                            ? 'Planned'
                                            : 'Started';
                                        shift.start =
                                          shift.status !== 'Started'
                                            ? shift.originalStart
                                            : shift.start;
                                      "
                                      title="click to set shift as started on time"
                                      ><i
                                        class="bx bx-stopwatch fs-20"
                                        style="color: #5ea3cb"
                                        title="click to set shift as started on time"
                                      ></i
                                    ></span>
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{
                                      NoShow: shift.status === 'No Show',
                                      Submitted: shift.status === 'Submitted',
                                      Started: shift.status === 'Approved',
                                    }"
                                  >
                                    {{ shift.end }}
                                    <span
                                      @click="
                                        shift.status =
                                          shift.status === 'Approved'
                                            ? 'Started'
                                            : 'Approved'
                                      "
                                      ><i
                                        class="bx bx-stopwatch fs-20"
                                        style="color: #5ea3cb"
                                      ></i
                                    ></span>
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{ NoShow: shift.status === 'No Show' }"
                                  >
                                    {{ shift.hours }}
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{ NoShow: shift.status === 'No Show' }"
                                  >
                                    {{ shift.break }}
                                  </td>
                                  <td class="text-center fs-14">
                                    {{
                                      shift.status === "No Show" ? "-" : shift.paidhours
                                    }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h4 class="accordion-header" id="headingTwo">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                            v-if="currentShifts.length"
                          >
                            Today's shifts
                          </button>
                        </h4>
                        <div
                          id="collapseTwo"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#default-accordion-example"
                          v-if="
                            currentShifts.filter((sh) => sh.worker === selWorker).length
                          "
                        >
                          <div class="accordion-body" style="padding: 0 !important">
                            <table class="table table-hover mt-2">
                              <thead>
                                <th>Status</th>
                                <th>Date</th>
                                <th class="text-center">Start</th>
                                <th class="text-center">End</th>
                                <th class="text-center">Hrs</th>
                                <th class="text-center">Brk</th>
                                <th class="text-center">Paid Hrs</th>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(shift, index) in currentShifts.filter(
                                    (sh) => sh.worker === selWorker
                                  )"
                                  :key="index"
                                >
                                  <td
                                    class="text-left fs-14"
                                    :class="{
                                      Clickable: shift.status !== 'No Show',
                                      NoShow: shift.status === 'No Show',
                                      Submitted: shift.status === 'Submitted',
                                      Started:
                                        shift.status === 'Started' ||
                                        shift.status === 'Approved',
                                    }"
                                  >
                                    {{ shift.status }}
                                  </td>
                                  <td class="text-left fs-14">
                                    {{ moment(shift.date).format("ddd Do") }}
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{
                                      Clickable: shift.status !== 'No Show',
                                      NoShow: shift.status === 'No Show',
                                      Submitted: shift.status === 'Submitted',
                                      Started:
                                        shift.status === 'Started' ||
                                        shift.status === 'Approved',
                                    }"
                                  >
                                    <span
                                      v-if="!shift.editStart"
                                      @click="shift.editStart = true"
                                      :title="
                                        shift.status !== 'No Show'
                                          ? 'Click to enter a different start time'
                                          : 'Cannot change start time'
                                      "
                                    >
                                      {{ shift.start }}
                                    </span>
                                    <input
                                      class="form-control"
                                      @change="
                                        shift.editStart = false;
                                        shift.status = 'Started';
                                      "
                                      @keyup.enter="shift.editStart = false"
                                      @keyup.tab="shift.editStart = false"
                                      v-else
                                      type="time"
                                      name="start"
                                      v-model="shift.start"
                                      title="click to set shift as started on time"
                                    />
                                    <span
                                      v-if="!shift.editStart"
                                      @click="
                                        shift.status =
                                          shift.status === 'Started'
                                            ? 'Planned'
                                            : 'Started';
                                        shift.start =
                                          shift.status !== 'Started'
                                            ? shift.originalStart
                                            : shift.start;
                                      "
                                      ><i
                                        class="bx bx-stopwatch fs-20"
                                        style="color: #5ea3cb"
                                      ></i
                                    ></span>
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{
                                      NoShow: shift.status === 'No Show',
                                      Started:
                                        shift.status === 'Approved' ||
                                        shift.status === 'Submitted',
                                    }"
                                  >
                                    {{ shift.end }}
                                    <span
                                      @click="
                                        shift.status =
                                          shift.status === 'Approved' ||
                                          shift.status === 'Submitted'
                                            ? 'Started'
                                            : 'Submitted'
                                      "
                                      ><i
                                        class="bx bx-stopwatch fs-20"
                                        style="color: #5ea3cb"
                                      ></i
                                    ></span>
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{ NoShow: shift.status === 'No Show' }"
                                  >
                                    {{ shift.hours }}
                                  </td>
                                  <td
                                    class="text-center fs-14"
                                    :class="{ NoShow: shift.status === 'No Show' }"
                                  >
                                    {{ shift.break }}
                                  </td>
                                  <td class="text-center fs-14">
                                    {{
                                      shift.status === "No Show" ? "-" : shift.paidhours
                                    }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="selTab === 'Control'">
            <!-- Base Example -->
            <div class="accordion" id="default-accordion-example">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    v-if="currentShifts.length"
                  >
                    Today's shifts
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#default-accordion-example"
                  v-if="currentShifts.length"
                >
                  <div class="accordion-body">
                    <table class="table table-hover mt-2">
                      <thead>
                        <tr>
                          <th>
                            Worker
                            <i
                              class="bx bx-help-circle tourIcon"
                              @click="startTour"
                              v-if="currentShifts.length"
                            ></i>
                          </th>
                          <th>Status</th>
                          <th>Date</th>
                          <th class="text-center">Start/Started</th>
                          <th class="text-center">End/Ended</th>
                          <th class="text-center">Hours</th>
                          <th class="text-center">Break</th>
                          <th class="text-center">Paid Hours</th>
                          <th class="text-center">Show/No Show</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(shift, index) in currentShifts" :key="index">
                          <td @click="selWorker = shift.worker">
                            <a
                              class="worker"
                              :class="{ NoShow: shift.status === 'No Show' }"
                              >{{ shift.worker }}</a
                            >
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#availabilityModal"
                              title="Amend worker availability"
                              ><i class="bx bx-calendar-minus absence"></i
                            ></a>
                          </td>
                          <td
                            class="text-left fs-14"
                            :class="{
                              Clickable: shift.status !== 'No Show',
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.status }}
                          </td>
                          <td
                            class="text-left fs-14"
                            :class="{
                              Clickable: shift.status !== 'No Show',
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ moment(shift.date).format("ddd Do MMM") }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              Clickable: shift.status !== 'No Show',
                              NoShow: shift.status === 'No Show',
                              Submitted: shift.status === 'Submitted',
                              Started:
                                shift.status === 'Started' || shift.status === 'Approved',
                            }"
                          >
                            <span
                              v-if="!shift.editStart"
                              @click="shift.editStart = true"
                              :title="
                                shift.status !== 'No Show'
                                  ? 'Click to enter a different start time'
                                  : 'Cannot change start time'
                              "
                            >
                              {{ shift.start }}
                            </span>
                            <input
                              style="max-width: 60px; margin: auto"
                              @change="
                                shift.editStart = false;
                                shift.status = 'Started';
                              "
                              @keyup.enter="shift.editStart = false"
                              @keyup.tab="shift.editStart = false"
                              v-else
                              type="timestamp"
                              name="start"
                              v-model="shift.start"
                            />
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Started' ? 'Planned' : 'Started';
                                shift.start =
                                  shift.status !== 'Started'
                                    ? shift.originalStart
                                    : shift.start;
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted: shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.end }}
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Approved' ? 'Started' : 'Approved'
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.hours }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.break }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.status === "No Show" ? "-" : shift.paidhours }}
                          </td>
                          <td
                            class="text-center fs-14"
                            v-if="!(shift.status === 'Submitted')"
                          >
                            <i
                              class="bx bxs-hide text-danger fs-18"
                              @click="setNoShow(shift)"
                              v-if="shift.status !== 'No Show'"
                            ></i>
                            <i
                              class="bx bxs-show text-danger fs-18"
                              @click="setShow(shift)"
                              v-else
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    This Week's Shifts
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#default-accordion-example"
                >
                  <div class="accordion-body">
                    <div class="mb-3">
                      Week: {{ startThisWeek.format("DD-MMM") }} to
                      {{ endThisWeek.format("DD-MMM") }}
                      <button type="button" class="btn btn-danger" style="float: right">
                        Approve All Remaining Shifts
                      </button>
                    </div>
                    <table class="table table-hover mt-2">
                      <thead>
                        <tr>
                          <th>
                            Worker
                            <i
                              class="bx bx-help-circle tourIcon"
                              @click="startTour"
                              v-if="thisWeekShifts.length"
                            ></i>
                          </th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Start/Started</th>
                          <th>End/Ended</th>
                          <th>Hours</th>
                          <th>Break</th>
                          <th>Paid Hours</th>
                          <th>Show/No Show</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(shift, index) in thisWeekShifts" :key="index">
                          <td @click="selWorker = shift.worker">
                            <a
                              class="worker"
                              :class="{ NoShow: shift.status === 'No Show' }"
                              >{{ shift.worker }}</a
                            >
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#availabilityModal"
                              title="Amend worker availability"
                              ><i class="bx bx-calendar-minus absence"></i
                            ></a>
                          </td>
                          <td
                            class="text-left fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.status }}
                          </td>
                          <td
                            class="text-left fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted:
                                shift.status === 'Started' ||
                                shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ moment(shift.date).format("ddd Do MMM") }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              Clickable: shift.status !== 'No Show',
                              NoShow: shift.status === 'No Show',
                              Submitted: shift.status === 'Submitted',
                              Started:
                                shift.status === 'Started' || shift.status === 'Approved',
                            }"
                          >
                            <span
                              v-if="!shift.editStart"
                              @click="shift.editStart = true"
                              :title="
                                shift.status !== 'No Show'
                                  ? 'Click to enter a different start time'
                                  : 'Cannot change start time'
                              "
                            >
                              {{ shift.start }}
                            </span>
                            <input
                              style="max-width: 60px; margin: auto"
                              @change="
                                shift.editStart = false;
                                shift.status = 'Started';
                              "
                              @keyup.enter="shift.editStart = false"
                              @keyup.tab="shift.editStart = false"
                              v-else
                              type="timestamp"
                              name="start"
                              v-model="shift.start"
                            />
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Started' ? 'Planned' : 'Started';
                                shift.start =
                                  shift.status !== 'Started'
                                    ? shift.originalStart
                                    : shift.start;
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted: shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.end }}
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Approved' ? 'Started' : 'Approved'
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{ NoShow: shift.status === 'No Show' }"
                          >
                            {{ shift.hours }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{ NoShow: shift.status === 'No Show' }"
                          >
                            {{ shift.break }}
                          </td>
                          <td class="text-center fs-14">
                            {{ shift.status === "No Show" ? "-" : shift.paidhours }}
                          </td>
                          <td class="text-center fs-14">
                            <i
                              class="bx bxs-hide text-danger fs-18"
                              @click="shift.status = 'No Show'"
                              v-if="shift.status !== 'No Show'"
                            ></i>
                            <i
                              class="bx bxs-show text-danger fs-18"
                              @click="shift.status = 'Planned'"
                              v-else
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Last Week's Shifts
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#default-accordion-example"
                >
                  <div class="accordion-body">
                    <div class="mb-3">
                      Week: {{ startLastWeek.format("DD-MMM") }} to
                      {{ endLastWeek.format("DD-MMM") }}
                      <button type="button" class="btn btn-danger" style="float: right">
                        Approve All Remaining Shifts
                      </button>
                    </div>
                    <table class="table table-hover mt-2">
                      <thead>
                        <tr>
                          <th>
                            Worker
                            <i
                              class="bx bx-help-circle tourIcon"
                              @click="startTour"
                              v-if="lastWeekShifts.length"
                            ></i>
                          </th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Start/Started</th>
                          <th>End/Ended</th>
                          <th>Hours</th>
                          <th>Break</th>
                          <th>Paid Hours</th>
                          <th>Show/No Show</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(shift, index) in lastWeekShifts" :key="index">
                          <td @click="selWorker = shift.worker">
                            <a
                              class="worker"
                              :class="{ NoShow: shift.status === 'No Show' }"
                              >{{ shift.worker }}</a
                            >
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#availabilityModal"
                              title="Amend worker availability"
                              ><i class="bx bx-calendar-minus absence"></i
                            ></a>
                          </td>
                          <td class="text-left fs-14">
                            {{ shift.status }}
                          </td>
                          <td class="text-left fs-14">
                            {{ moment(shift.date).format("ddd Do MMM") }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              Clickable: shift.status !== 'No Show',
                              NoShow: shift.status === 'No Show',
                              Submitted: shift.status === 'Submitted',
                              Started:
                                shift.status === 'Started' || shift.status === 'Approved',
                            }"
                          >
                            <span
                              v-if="!shift.editStart"
                              @click="shift.editStart = true"
                              :title="
                                shift.status !== 'No Show'
                                  ? 'Click to enter a different start time'
                                  : 'Cannot change start time'
                              "
                            >
                              {{ shift.start }}
                            </span>
                            <input
                              style="max-width: 60px; margin: auto"
                              @change="
                                shift.editStart = false;
                                shift.status = 'Started';
                              "
                              @keyup.enter="shift.editStart = false"
                              @keyup.tab="shift.editStart = false"
                              v-else
                              type="timestamp"
                              name="start"
                              v-model="shift.start"
                            />
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Started' ? 'Planned' : 'Started';
                                shift.start =
                                  shift.status !== 'Started'
                                    ? shift.originalStart
                                    : shift.start;
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
                              Submitted: shift.status === 'Submitted',
                              Started: shift.status === 'Approved',
                            }"
                          >
                            {{ shift.end }}
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Approved' ? 'Started' : 'Approved'
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{ NoShow: shift.status === 'No Show' }"
                          >
                            {{ shift.hours }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{ NoShow: shift.status === 'No Show' }"
                          >
                            {{ shift.break }}
                          </td>
                          <td class="text-center fs-14">
                            {{ shift.status === "No Show" ? "-" : shift.paidhours }}
                          </td>
                          <td class="text-center fs-14">
                            <i
                              class="bx bxs-hide text-danger fs-18"
                              @click="shift.status = 'No Show'"
                              v-if="shift.status !== 'No Show'"
                            ></i>
                            <i
                              class="bx bxs-show text-danger fs-18"
                              @click="shift.status = 'Planned'"
                              v-else
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="selTab === 'Review'">
            <div class="card">
              <div class="card-header border-0 align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Shift Fulfilment</h4>
                <div>
                  <button type="button" class="btn btn-soft-secondary btn-sm me-1">
                    ALL
                  </button>
                  <button type="button" class="btn btn-soft-secondary btn-sm me-1">
                    1M
                  </button>
                  <button type="button" class="btn btn-soft-secondary btn-sm me-1">
                    6M
                  </button>
                  <button type="button" class="btn btn-primary btn-sm">1Y</button>
                </div>
              </div>
              <!-- end card header -->
              <div
                class="card-header p-0 border-0 bg-soft-light"
                style="position: relative; top: -30px"
              >
                <div class="row g-0 text-center">
                  <span class="fs-18 text-info">December Performance</span>
                  <div class="col-6 col-sm-3">
                    <div class="p-3 border border-dashed border-start-0">
                      <h5 class="mb-1">
                        <count-to :startVal="0" :endVal="212" :duration="2800"></count-to>
                        <span class="text-success ms-1 fs-12"
                          >96%<i class="ri-arrow-right-up-line ms-1 align-middle"></i
                        ></span>
                      </h5>
                      <p class="text-muted mb-0">Filled Shifts</p>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6 col-sm-3">
                    <div class="p-3 border border-dashed border-start-0">
                      <h5 class="mb-1">
                        <count-to :startVal="0" :endVal="192" :duration="2800"></count-to>
                        <span class="text-success ms-1 fs-12"
                          >87%<i class="ri-arrow-right-up-line ms-1 align-middle"></i
                        ></span>
                      </h5>
                      <p class="text-muted mb-0">Filled From Pool</p>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6 col-sm-3">
                    <div class="p-3 border border-dashed border-start-0">
                      <h5 class="mb-1">
                        <count-to :startVal="0" :endVal="13" :duration="2800"></count-to>
                        <span class="text-success ms-1 fs-12"
                          >5.9%<i class="ri-arrow-right-down-line ms-1 align-middle"></i
                        ></span>
                      </h5>
                      <p class="text-muted mb-0">Unfilled</p>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6 col-sm-3">
                    <div class="p-3 border border-dashed border-start-0">
                      <h5 class="mb-1">
                        <count-to :startVal="0" :endVal="5" :duration="2800"></count-to>
                        <span class="text-danger ms-1 fs-12"
                          >2.3%<i class="ri-arrow-right-up-line ms-1 align-middle"></i
                        ></span>
                      </h5>
                      <p class="text-muted mb-0">No Shows</p>
                    </div>
                  </div>
                  <!--end col-->
                </div>
              </div>
              <!-- end card header -->
              <div class="card-body p-0 pb-2">
                <div>
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    :series="series"
                    :options="chartOptions"
                    height="309"
                  ></apexchart>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useShepherd } from "vue-shepherd";
import moment from "moment";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { CountTo } from "vue3-count-to";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";

const store = useStore();

const projectList = computed(() => store.getters["projects/projectList"]);
const categories = computed(() => store.getters["projects/categories"]);
const subCategories = computed(() => store.getters["projects/subCategories"]);
const projectTypes = computed(() => store.getters["projects/projectTypes"]);

function getChartColorsArray(colors) {
  colors = JSON.parse(colors);
  return colors.map(function (value) {
    var newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
      if (color) {
        color = color.replace(" ", "");
        return color;
      } else return newValue;
    } else {
      var val = value.split(",");
      if (val.length == 2) {
        var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(
          val[0]
        );
        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
}

onMounted(() => {
  let aw = weekShifts.value.filter((shift) => shift.agencyWorkers.length);
  let aws = new Set();
  setPages();
  aw.forEach((shift) => {
    shift.agencyWorkers.forEach((worker) => {
      aws.add(worker);
    });
  });

  aws.forEach((worker) => {
    agencyWorkers.value.push({
      id: "ag" + uuidv4().slice(20),
      worker: worker,
      client: "School Passenger Assistants (Portsmouth)",
      shift: "PM (14:00 - 16:30)",
      fromDate: "01-Jan-2022",
      toDate: "31-Dec-2023",
    });
  });
});

const currPool = ref("Pool");

const series = [
  {
    name: "Filled from Pool",
    data: [3, 12, 20, 28, 40, 38, 43, 42, 56, 78, 122, 192],
  },
  {
    name: "Agency Fill",
    data: [120, 118, 116, 111, 96, 102, 92, 95, 91, 72, 25, 20],
  },
  {
    name: "Unfilled",
    data: [3, 1, 5, 2, 2, 9, 8, 4, 1, 5, 12, 13],
  },
  {
    name: "No Show",
    data: [3, 1, 5, 2, 2, 3, 2, 4, 1, 5, 4, 5],
  },
];

const chartOptions = {
  chart: {
    type: "bar",
    height: 309,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "20%",
      borderRadius: 6,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    fontWeight: 400,
    fontSize: "8px",
    offsetX: 0,
    offsetY: 0,
    markers: {
      width: 9,
      height: 9,
      radius: 4,
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  grid: {
    show: false,
  },
  colors: getChartColorsArray(
    '["--vz-success", "--vz-primary", "--vz-gray-100", "--vz-danger"]'
  ),
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: true,
      strokeDashArray: 1,
      height: 1,
      width: "100%",
      offsetX: 0,
      offsetY: 0,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
};

const config = {
  enableTime: false,
  dateFormat: "Y-M-d",
};

const tour = useShepherd({
  useModalOverlay: true,
});

const startTour = () => {
  tour.start();
};

const setNoShow = (shift) => {
  shift.status = "No Show";
};

const workerScreenTitle = ref("");

const setShow = (shift) => {
  shift.status = "Planned";
};

const addWorker = () => {
  worker.value.client = selClient.value;
  worker.value.shift = selCategory.value;
  if (currPool.value === "Pool") {
    shiftsWorkers.value.push(worker.value);
  } else {
    agencyWorkers.value.push(worker.value);
  }
  document.getElementById("closeWorkerAddmodal").click();
};

const worker = ref({
  id: uuidv4().slice(0, 20),
  worker: "",
  client: "",
  shift: "",
  email: "",
  phone: "",
  fromDate: moment().format("DD-MMM-YYYY"),
  toDate: "31-Dec-2023",
  payRef: uuidv4(),
});

const payrolledWeek = moment().isoWeekday(-13).format("YYYY-MM-DD");
const payrollWeek = moment().isoWeekday(-6).format("YYYY-MM-DD");

const weekStarts = ref([
  moment().isoWeekday(-13),
  moment().isoWeekday(-6),
  moment().isoWeekday(1),
  moment().isoWeekday(8),
  moment().isoWeekday(15),
  moment().isoWeekday(22),
  moment().isoWeekday(29),
]);

const selTab = ref("Planning");
const startNextWeek = ref(moment().isoWeekday(8).format("YYYY-MM-DD"));
const startThisWeek = ref(moment(startNextWeek.value).subtract(7, "days"));
const endThisWeek = ref(moment(startThisWeek.value).add(6, "days"));
const startLastWeek = ref(moment(startThisWeek.value).subtract(7, "days"));
const endLastWeek = ref(moment(startLastWeek.value).add(6, "days"));

const selClient = ref("All");
const selectCategory = ref("All");
const selSubCategory = ref("All");
const selProjectType = ref("All");

const filteredProjectList = computed(() => {
  const pl = [];
  const projectKeys = Object.keys(projectList.value);
  projectKeys.forEach((key) => {
    if (projectList.value[key].client === selClient.value || selClient.value == "All") {
      pl.push(projectList.value[key]);
    }
  });
  return pl;
});

const page = ref(1);
const perPage = ref(5);
const pages = ref([]);
const setPages = () => {
  let numberOfPages = Math.ceil(filteredProjectList.value.length / perPage.value);
  for (let index = 1; index <= numberOfPages; index++) {
    pages.value.push(index);
  }
};

console.log(pages.value);

const paginate = (data) => {
  let from = page.value * perPage.value - perPage.value;
  let to = page.value * perPage.value;
  return data.slice(from, to);
};

const displayedProjectList = computed(() => paginate(filteredProjectList.value));

const published = ref(false);

let clientShifts = [
  {
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    code: "AM",
    start: "07:00",
    end: "09:30",
    hours: 2.5,
    break: 0,
  },
  {
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    code: "PM",
    start: "14:00",
    end: "16:30",
    hours: 2.5,
    break: 0,
  },
  {
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    code: "DAY",
    start: "09:00",
    end: "17:00",
    hours: 7,
    break: 60,
  },
];

let shifts = computed(() => {
  let shiftsSelected = clientShifts
    .filter((shift) => shift.client === selClient.value)
    .map((shift) => shift.shift);
  return shiftsSelected;
});

const selCategory = ref(shifts.value[0]);

const clientDayShifts = reactive([
  {
    id: uuidv4(),
    date: "2022-12-26",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    agencyWorkers: ["Aneetra Sanjeewa"],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2022-12-27",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Sandra Robinson", "Danny Ton"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2022-12-28",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2022-12-29",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Danny Ton"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2022-12-30",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Sandra Robinson"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2022-12-31",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-01",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-02",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Sandra Robinson"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-03",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Danny Ton"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-01-04",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-05",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-06",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Sandra Robinson", "Terry Marsh"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-07",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-08",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-09",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Jack Day", "Sandra Robinson"],
    agencyWorkers: ["Alfredo Mauritz"],
    noShow: [],
    unavailable: ["Danny Ton", "Derek Macrae", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-01-10",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 3,
    assigned: ["Danny Ton", "Terry Marsh"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-01-11",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 3,
    assigned: ["Danny Ton", "Terry Marsh"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-12",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 3,
    assigned: ["Danny Ton", "Terry Marsh"],
    agencyWorkers: ["Mohamed Bakir"],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-13",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-14",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Verity Lomas"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-15",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-16",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-17",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-01-18",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    agencyWorkers: ["Aneetra Sanjeewa"],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-19",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-20",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-21",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-22",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-23",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-24",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-01-25",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-26",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-27",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-28",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-29",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-01-30",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-01-31",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-02-01",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-02",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-03",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-04",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-05",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-06",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-07",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-02-08",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-09",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-10",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-11",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-12",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-13",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-14",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-02-15",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-16",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-17",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-18",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-19",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-20",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-21",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-02-22",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-23",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-24",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-25",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-26",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-02-27",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-02-28",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-03-01",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-02",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-03",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-04",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-03-05",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-03-06",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-07",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-03-08",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-09",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-10",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-11",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-03-12",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    id: uuidv4(),
    date: "2023-03-13",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-14",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    id: uuidv4(),
    date: "2023-03-15",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2023-03-16",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Verity Lomas"],
  },
  {
    id: uuidv4(),
    date: "2022-12-26",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2022-12-27",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: ["Laura Van Zyl", "Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2022-12-28",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2022-12-29",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2022-12-30",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Laura Van Zyl"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2022-12-31",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-01",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-02",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Laura Van Zyl"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-03",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-01-04",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-05",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-06",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Laura Van Zyl"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-07",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-08",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-09",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-09",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-10",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-11",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-12",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-13",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-14",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-15",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-16",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: ["Nathan Midgley"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-17",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-18",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-19",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-20",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: ["Nathan Midgley"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-21",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: ["Nathan Midgley"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-22",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: ["Nathan Midgley"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-23",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: ["Nathan Midgley"],
    agencyWorkers: [],
    noShow: [],
    unavailable: [],
  },
  {
    id: uuidv4(),
    date: "2023-01-10",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-01-11",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-12",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Alex Raubitschek"],
  },
  {
    id: uuidv4(),
    date: "2023-01-13",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-14",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-15",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-16",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-17",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-01-18",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-19",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-20",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-21",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-22",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-23",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-24",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-01-25",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-26",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-27",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-28",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-29",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-01-30",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-01-31",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-02-01",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-02",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-03",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-04",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-05",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-06",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-07",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-02-08",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-09",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-10",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-11",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-12",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-13",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-14",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-02-15",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-16",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-17",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-18",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-19",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-20",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-21",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-02-22",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-23",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-24",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-25",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-26",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-02-27",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-02-28",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-03-01",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-02",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-03",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-04",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-03-05",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-03-06",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-07",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-03-08",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-09",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-10",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-11",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-03-12",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    id: uuidv4(),
    date: "2023-03-13",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-14",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    id: uuidv4(),
    date: "2023-03-15",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    id: uuidv4(),
    date: "2023-03-16",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    agencyWorkers: [],
    noShow: [],
    unavailable: ["Laura Van Zyl"],
  },
]);

const workers = reactive([
  {
    id: uuidv4(),
    worker: "Terry Marsh",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    email: "terry@conixi.co.uk",
    phone: "0789345555",
    toDate: "31-Dec-2023",
  },
  {
    id: "9002",
    worker: "Verity Lomas",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Sandra Robinson",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Jack Day",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Danny Ton",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Derek Macrae",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Derek Macrae",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Laura Van Zyl",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Alex Raubitschek",
    client: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
  {
    id: uuidv4(),
    worker: "Nathan Midgley",
    client: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    fromDate: "01-Jan-2022",
    email: "",
    phone: "",
    toDate: "31-Dec-2023",
  },
]);

const selWorker = ref(workers[0].worker);

let shiftHeaders = computed(() => {
  let sh = new Set();
  clientShifts
    .filter((shift) => shift.client === selClient.value)
    .forEach((shift) => sh.add(shift.shift));
  return sh;
});

let weekShifts = computed(() => {
  let ws = clientDayShifts
    .filter(
      (shift) => shift.client === selClient.value && shift.shift === selCategory.value
    ) // client & shift desc matches
    .filter(
      (shift) =>
        moment(shift.date).diff(moment(startNextWeek.value), "days") >= 0 && // lies in current week
        moment(shift.date).diff(moment(startNextWeek.value), "days") <= 6
    );
  let ws2 = [];
  ws.forEach((shift) => {
    let noShow = [];
    currentShifts.value
      .filter((cShift) => cShift.id === shift.id && cShift.status === "No Show")
      .forEach((ns) => noShow.push(ns.worker));
    ws2.push({
      id: shift.id,
      date: shift.date,
      shifts: shift.shiftCount,
      assigned: shift.assigned,
      noShow: noShow,
      agencyWorkers: shift.agencyWorkers,
      unavailable: shift.unavailable,
    });
  });
  return reactive(ws2);
});

let currentShifts = computed(() => {
  let ws = clientDayShifts.filter(
    (shift) => shift.date === moment().format("YYYY-MM-DD")
  );
  let ws2 = [];
  ws.forEach((shift) => {
    shift.assigned.forEach((assigned) => {
      let clientShift = clientShifts.find(
        (ts) => ts.client === shift.client && ts.shift == shift.shift
      );
      ws2.push({
        id: shift.id,
        date: shift.date,
        client: shift.client,
        shift: shift.shift,
        start: clientShift.start,
        end: clientShift.end,
        originalStart: clientShift.start,
        originalEnd: clientShift.end,
        hours: clientShift.hours,
        break: clientShift.break,
        originalBreak: clientShift.break,
        paidhours: clientShift.hours - clientShift.break / 60,
        worker: assigned,
        status: "Planned",
        editStart: false,
        editEnd: false,
        eidtBreak: false,
      });
    });
  });
  return reactive(ws2);
});

let thisWeekShifts = computed(() => {
  let ws = clientDayShifts.filter(
    (shift) =>
      startThisWeek.value.diff(moment(shift.date)) <= 0 &&
      startThisWeek.value.diff(moment(shift.date)) >= -518400000 // one week
  );
  let ws2 = [];
  ws.forEach((shift) => {
    shift.assigned.forEach((assigned) => {
      let clientShift = clientShifts.find(
        (ts) => ts.client === shift.client && ts.shift == shift.shift
      );
      ws2.push({
        id: shift.id,
        date: shift.date,
        client: shift.client,
        shift: shift.shift,
        start: clientShift.start,
        end: clientShift.end,
        originalStart: clientShift.start,
        originalEnd: clientShift.end,
        hours: clientShift.hours,
        break: clientShift.break,
        originalBreak: clientShift.break,
        paidhours: clientShift.hours - clientShift.break / 60,
        worker: assigned,
        status:
          shift.date === "2023-01-10" && assigned === "Terry Marsh"
            ? "Submitted"
            : "Planned",
        editStart: false,
        editEnd: false,
        eidtBreak: false,
      });
    });
  });
  return reactive(ws2);
});

let lastWeekShifts = computed(() => {
  let ws = clientDayShifts.filter(
    (shift) =>
      startLastWeek.value.diff(moment(shift.date)) <= 0 &&
      startLastWeek.value.diff(moment(shift.date)) >= -518400000 // one week
  );
  let ws2 = [];
  ws.forEach((shift) => {
    shift.assigned.forEach((assigned) => {
      let clientShift = clientShifts.find(
        (ts) => ts.client === shift.client && ts.shift == shift.shift
      );
      ws2.push({
        id: shift.id,
        date: shift.date,
        client: shift.client,
        shift: shift.shift,
        start: clientShift.start,
        end: clientShift.end,
        originalStart: clientShift.start,
        originalEnd: clientShift.end,
        hours: clientShift.hours,
        break: clientShift.break,
        originalBreak: clientShift.break,
        paidhours: clientShift.hours - clientShift.break / 60,
        worker: assigned,
        status: "Planned",
        editStart: false,
        editEnd: false,
        eidtBreak: false,
      });
    });
  });
  return reactive(ws2);
});

let agencyWorkers = ref([]);

let shiftsWorkers = computed(() => {
  // client & shift desc matches
  let ws = workers.filter(
    (shift) => shift.client === selClient.value && shift.shift === selCategory.value
  );
  return reactive(ws);
});

const changeClient = () => {
  selCategory.value = shifts.value[0];
  console.log(shifts.value[0]);
};

const assignWorker = (worker, shift) => {
  shift.assigned.push(worker.worker);
};

const removeWorker = (worker, shift) => {
  shift.assigned = shift.assigned.filter((assign) => worker.worker !== assign);
};

let clients = ["Hampshire County Council", "Surrey County Council"];

tour.addStep({
  id: "shiftUnfilledStep",
  text:
    "Any unfilled shifts will show in red here, the first number is the number of filled shifts, " +
    "the second is total shifts. When all a day's shifts are filled only the total is shown in green.",
  attachTo: {
    element: ".unfilled",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "shiftNumberStep",
  text: "Click on the minus or plus icons to change the number of shifts required.",
  attachTo: {
    element: ".changeCategory",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "changeCategoryDisabledStep",
  text: "You cannot reduce the shift number below the assigned worker count.",
  attachTo: {
    element: ".changeCategoryDisabled",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "workerProfileStep",
  text: "Click on the worker name to see profile details.",
  attachTo: {
    element: ".worker",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "workerAvailabilityStep",
  text:
    "Click on the orange calendar icon beside each worker to set availability for the worker.",
  attachTo: {
    element: ".absence",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "assignWorkerStep",
  text: "Assigned workers show in green as a tick within a circle.",
  attachTo: {
    element: ".fillBtn",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "workerUnavailableStep",
  text: "An orange cross icon shows that the worker is unavailable for the shift.",
  attachTo: {
    element: ".bxs-x-circle",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "shiftAssignStep",
  text:
    "Assign workers to the shift by clicking the person icon with a plus sign on the correct day on the worker line.",
  attachTo: {
    element: ".addWorker",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: tour.complete,
    },
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "shiftUnassignStep",
  text: "Remove workers by clicking on the assigned worker icon.",
  attachTo: {
    element: ".fillBtn",
    on: "bottom",
  },
  buttons: [
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "End",
      action: tour.next,
    },
  ],
});
</script>

<style>
button {
  padding: 5px 20px !important;
}
.shepherd-button {
  padding: 0.1rem 1.5rem !important;
}

.changeCategory {
  color: #a0c0d3;
  cursor: pointer;
}

.changeCategoryDisabled {
  color: #eee2df;
  cursor: not-allowed;
}

.changeCategory:hover {
  color: black !important;
}
.green {
  background-color: green !important;
}

.amber {
  background-color: rgb(209, 159, 67) !important;
}

.red {
  background-color: red !important;
}

.gray {
  background-color: gray !important;
}

.yellow {
  background-color: yellow !important;
}

body {
  font-family: Tahoma;
}

.shiftBtn {
  border: 2px solid darkgray !important;
  border-radius: 12px !important;
  height: 38px;
}

.fillBtn {
  color: green !important;
  font-size: 20px !important;
  padding: 0 !important;
}

.noShowBtn {
  color: red !important;
  font-size: 20px !important;
  padding: 0 !important;
}

.shortCell {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

.workerAddIcon {
  float: right;
  color: #2e5c76;
}

.NoShow {
  text-decoration: line-through !important;
  color: red;
}

.Started {
  font-weight: bold;
  color: rgb(61, 189, 97);
}

.Submitted {
  font-weight: bold;
  color: rgb(124, 83, 26);
}

.Clickable {
  cursor: pointer;
}

.Ended {
  font-weight: bold;
  color: rgb(61, 189, 97);
}

.tourIcon {
  position: relative;
  top: -30px;
  left: -75px;
  font-size: 23px;
  color: blue;
  cursor: pointer;
}

.absence {
  color: rgb(205, 167, 95);
  font-size: 16px;
  float: right;
}

.absent {
  color: rgb(205, 167, 95);
  font-size: 20px;
  cursor: not-allowed;
}

.waiting {
  color: #a0c0d3;
  font-size: 20px;
  cursor: not-allowed;
}

.filled {
  color: green !important;
  padding: 0 !important;
}

.unfilled {
  color: red !important;
  font-weight: bold !important;
}

.worker {
  text-decoration: none !important;
  padding-right: 5px;
  font-size: 0.8em;
  cursor: pointer;
}

.addWorker {
  font-size: 20px !important;
  padding: 0 !important;
  color: #5ea3cb;
}

td {
  padding: 5px !important;
}

th {
  font-size: 16px !important;
  font-weight: 400 !important;
}
div.error {
  color: #cd0a0a;
  font-weight: bold;
  background: #f2c2c2 url(/images/skin/exclamation.png) 8px 50% no-repeat;
  border: 1px solid #cd0a0a;
  margin: 10px 0 5px 0;
  padding: 5px 5px 5px 30px;
}
.availModal {
  width: 80%;
}
</style>
