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
                >Planning <i class="bx bx-align-left"></i
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
            <div class="row d-flex mt-1 mb-1">
              <div class="form-group col-auto flex-fill">
                <label for="location">Team/Location</label>
                <select
                  name="location"
                  class="form-select"
                  id="location"
                  v-model="selTeam"
                  @change="changeTeam"
                >
                  <option
                    v-for="(team, index) in teamLocations"
                    :key="index"
                    :value="team"
                  >
                    {{ team }}
                  </option>
                  <option value="Add New Team ...">Add new team/location ...</option>
                </select>
              </div>
              <div class="form-group col-auto flex-fill">
                <label for="location">Shift</label>
                <select name="group" class="form-select" id="group" v-model="selShift">
                  <option :value="shift" v-for="(shift, index) in shifts" :key="index">
                    {{ shift }}
                  </option>
                  <option value="Add New Shift">Add new shift ...</option>
                </select>
              </div>
              <div class="form-group col-auto flex-fill">
                <label for="weekStarting">Week Starting</label>
                <select
                  class="form-select"
                  name="weekStart"
                  id="weekStart"
                  v-model="startWeek"
                >
                  <option
                    v-for="(week, index) in weekStarts"
                    :key="index"
                    :value="week.format('YYYY-MM-DD')"
                  >
                    {{
                      week.format("dddd").substring(0, 3) + " " + week.format("DD MMM")
                    }}
                  </option>
                </select>
              </div>
            </div>
            <table class="table table-hover mt-2">
              <thead>
                <tr>
                  <th>
                    Worker
                    <i
                      class="bx bx-help-circle tourIcon"
                      @click="startTour"
                      v-if="shiftsWorkers.length"
                    ></i>
                  </th>
                  <th
                    class="bg-light text-center"
                    v-for="(shift, index) in weekShifts"
                    :key="index"
                  >
                    {{
                      moment(startWeek)
                        .add(index, "days")
                        .format("dddd")
                        .substring(0, 3) +
                      " " +
                      moment(startWeek).add(index, "days").format("DD MMM")
                    }}<br />
                    <i
                      v-if="shift.shifts !== shift.assigned.length"
                      @click="changeShift(shift, -1)"
                      class="bx bx-minus-circle changeShift"
                      style="margin-right: 5px"
                    ></i>
                    <i
                      v-else
                      class="bx bx-minus-circle changeShiftDisabled"
                      style="margin-right: 5px"
                    ></i>
                    <span
                      class="counter"
                      :class="{
                        filled: shift.shifts === shift.assigned.length,
                        unfilled: shift.shifts !== shift.assigned.length,
                      }"
                    >
                      <span>{{ shift.assigned.length }}</span>
                      <span
                        v-if="shift.shifts !== shift.assigned.length"
                        class="unfilledCount"
                      >
                        / {{ shift.shifts }}</span
                      >
                    </span>
                    <i
                      class="bx bx-plus-circle changeShift"
                      style="margin-left: 5px"
                      @click="changeShift(shift, 1)"
                    ></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(worker, index) in shiftsWorkers" :key="index">
                  <td @click="selWorker = worker.worker">
                    <a class="worker">{{ worker.worker }}</a>
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#availabilityModal"
                      title="Amend worker availability"
                      ><i class="bx bx-calendar-minus absence"></i
                    ></a>
                  </td>
                  <td
                    class="text-center"
                    :class="{ 'bg-light': !(index2 % 2) }"
                    v-for="(shift, index2) in weekShifts"
                    :key="index2"
                  >
                    <button
                      type="button"
                      class="btn btn-sm fillBtn"
                      @click="removeWorker(worker, shift)"
                      v-if="shift.assigned.indexOf(worker.worker) !== -1"
                    >
                      <i class="bx bx-check-circle"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm addWorker"
                      @click="assignWorker(worker, shift)"
                      v-if="
                        shift.shifts !== shift.assigned.length &&
                        shift.assigned.indexOf(worker.worker) === -1 &&
                        shift.unavailable.indexOf(worker.worker) === -1 &&
                        !published
                      "
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                    <span
                      v-if="
                        shift.shifts === shift.assigned.length &&
                        shift.assigned.indexOf(worker.worker) === -1 &&
                        shift.unavailable.indexOf(worker.worker) === -1
                      "
                      >-</span
                    >
                    <i
                      class="bx bxs-x-circle absent text-warning"
                      v-if="
                        shift.assigned.indexOf(worker.worker) === -1 &&
                        shift.unavailable.indexOf(worker.worker) !== -1
                      "
                    ></i>
                    <i
                      class="bx bxs-user-voice waiting text-error"
                      v-if="
                        shift.shifts !== shift.assigned.length &&
                        shift.assigned.indexOf(worker.worker) === -1 &&
                        shift.unavailable.indexOf(worker.worker) === -1 &&
                        published
                      "
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              class="btn"
              :class="{ 'btn-primary': !published, 'btn-warning': published }"
              data-bs-dismiss="modal"
              style="float: right"
              @click="published = !published"
            >
              <span v-if="!published">Publish</span>
              <span v-else>Retract</span>
            </button>
            <div
              class="modal fade"
              id="shiftTimesModal"
              tabindex="-1"
              aria-labelledby="shiftTimesModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="shiftTimesModalTitle">Shift</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form action="/employer/index" method="post" class="g-2">
                      <input type="hidden" id="shift_id" value="" />
                      <input type="hidden" id="date" value="" />
                      <div class="row m-2">
                        <label for="shiftStart" class="form-label">Shift Start</label>
                        <input
                          type="time"
                          class="form-control"
                          id="shiftStart"
                          name="shiftStart"
                          value=""
                        />
                      </div>
                      <div class="row m-2">
                        <label for="shiftStart" class="form-label">Shift End</label>
                        <input
                          type="time"
                          class="form-control"
                          id="shiftEnd"
                          name="shiftEnd"
                          value=""
                        />
                      </div>
                      <div class="row m-2">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="approved"
                          />
                          <label class="form-check-label" for="approved">Approved</label>
                        </div>
                      </div>
                      <div class="row m-2">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="noShow"
                          />
                          <label class="form-check-label" for="noShow">No Show</label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
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
                      <h6 class="col-12 text-white">{{ selTeam }}</h6>
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
                              {{ moment(startWeek).add(index, "days").format("ddd") }}
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
                                  sh === selShift
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
                  >
                    Current Shifts
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#default-accordion-example"
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
                          <th>Start/Started</th>
                          <th>End/Ended</th>
                          <th>Hours</th>
                          <th>Break</th>
                          <th>Paid Hours</th>
                          <th>Show/No Show</th>
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
                          <td class="text-left fs-14">
                            {{ shift.status }}
                          </td>
                          <td class="text-left fs-14">
                            {{ moment(shift.date).format('ddd Do MMM') }}
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              Clickable: shift.status !== 'No Show',
                              NoShow: shift.status === 'No Show',
                              Started: shift.status === 'Started' || shift.status === 'Approved',
                            }"
                          >
                            <span
                              v-if="!shift.editStart"
                              @click="shift.editStart = true"
                              :title = "shift.status !== 'No Show' ? 'Click to enter a different start time' : 'Cannot change start time'">
                              {{ shift.start }}
                            </span>
                            <input style="max-width:60px;margin:auto"
                            @change ="shift.editStart = false; shift.status='Started'"
                            @keyup.enter ="shift.editStart = false"
                            @keyup.tab ="shift.editStart = false"
                              v-else type="timestamp" name="start" v-model="shift.start"/>
                            <span
                              @click="
                                shift.status =
                                  shift.status === 'Started' ? 'Planned' : 'Started';
                                shift.start = (shift.status !== 'Started' ? shift.originalStart : shift.start)
                              "
                              ><i class="bx bx-stopwatch fs-20" style="color: #5ea3cb"></i
                            ></span>
                          </td>
                          <td
                            class="text-center fs-14"
                            :class="{
                              NoShow: shift.status === 'No Show',
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
                  <div class="accordion-body">xxx</div>
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
                  <div class="accordion-body">xxx</div>
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
              <div class="card-header p-0 border-0 bg-soft-light">
                <div class="row g-0 text-center">
                  <div class="col-6 col-sm-4">
                    <div class="p-3 border border-dashed border-start-0">
                      <h5 class="mb-1">
                        <count-to :startVal="0" :endVal="854" :duration="5000"></count-to>
                        <span class="text-success ms-1 fs-12"
                          >87%<i class="ri-arrow-right-up-line ms-1 align-middle"></i
                        ></span>
                      </h5>
                      <p class="text-muted mb-0">Filled Shifts</p>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6 col-sm-4">
                    <div class="p-3 border border-dashed border-start-0">
                      <h5 class="mb-1">
                        <count-to
                          :startVal="0"
                          :endVal="1278"
                          :duration="4000"
                        ></count-to>
                        <span class="text-success ms-1 fs-12"
                          >12%<i class="ri-arrow-right-down-line ms-1 align-middle"></i
                        ></span>
                      </h5>
                      <p class="text-muted mb-0">Unfilled</p>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6 col-sm-4">
                    <div class="p-3 border border-dashed border-start-0 border-end-0">
                      <h5 class="mb-1">
                        <span class="text-success ms-1 fs-12"
                          >1%<i class="ri-arrow-right-down-line ms-1 align-middle"></i
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
import { ref, computed, reactive } from "vue";
import { useShepherd } from "vue-shepherd";
import moment from "moment";

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

const series = [
  {
    name: "Last Year",
    data: [25.3, 12.5, 20.2, 18.5, 40.4, 25.4, 15.8, 22.3, 19.2, 25.3, 12.5, 20.2],
  },
  {
    name: "Current Year",
    data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2],
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
  colors: getChartColorsArray('["--vz-primary", "--vz-gray-300"]'),
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

const tour = useShepherd({
  useModalOverlay: true,
});

const startTour = () => {
  tour.start();
};

const weekStarts = ref([
  moment().isoWeekday(-6),
  moment().isoWeekday(1),
  moment().isoWeekday(8),
  moment().isoWeekday(15),
  moment().isoWeekday(22),
  moment().isoWeekday(29),
]);

const selTab = ref("Planning");
const startWeek = ref(moment().isoWeekday(8).format("YYYY-MM-DD"));
const selTeam = ref("School Passenger Assistants (Portsmouth)");
const published = ref(false);

let teamShifts = [
  {
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    code: "AM",
    start: "07:00",
    end: "09:30",
    hours: 2.5,
    break: 0,
  },
  {
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    code: "PM",
    start: "14:00",
    end: "16:30",
    hours: 2.5,
    break: 0,
  },
  {
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    code: "DAY",
    start: "09:00",
    end: "17:00",
    hours: 7,
    break: 60,
  },
];

let shifts = computed(() => {
  let shiftsSelected = teamShifts
    .filter((shift) => shift.team === selTeam.value)
    .map((shift) => shift.shift);
  return shiftsSelected;
});

const selShift = ref(shifts.value[0]);

const teamDayShifts = reactive([
  {
    date: "2022-12-26",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2022-12-27",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Sandra Robinson", "Danny Ton"],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2022-12-28",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2022-12-29",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Danny Ton"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2022-12-30",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Sandra Robinson"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2022-12-31",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-01",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-02",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Sandra Robinson"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-03",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Danny Ton"],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-01-04",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-05",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-06",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Sandra Robinson"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-07",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-08",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-09",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: ["Jack Day", "Sandra Robinson"],
    unavailable: ["Danny Ton", "Derek Macrae"],
  },
  {
    date: "2023-01-10",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 3,
    assigned: ["Danny Ton", "Derek Macrae"],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-01-11",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 3,
    assigned: ["Terry Marsh"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-12",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-13",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-14",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Verity Lomas"],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-15",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-16",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-17",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-01-18",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Terry Marsh"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-19",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: ["Jack Day"],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-20",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-21",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-22",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-23",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-24",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-01-25",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-26",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-27",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-28",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-29",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-01-30",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-01-31",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-02-01",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-02",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-03",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-04",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-05",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-06",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-07",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-02-08",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-09",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-10",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-11",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-12",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-13",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-14",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-02-15",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-16",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-17",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-18",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-19",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-20",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-21",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-02-22",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-23",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-24",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-25",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-26",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-02-27",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-02-28",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-03-01",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-02",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-03",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-04",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-03-05",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-03-06",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-07",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-03-08",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-09",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-10",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-11",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-03-12",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Danny Ton"],
  },
  {
    date: "2023-03-13",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-14",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Verity Lomas", "Terry Marsh"],
  },
  {
    date: "2023-03-15",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2023-03-16",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Verity Lomas"],
  },
  {
    date: "2022-12-26",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2022-12-27",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: ["Laura Van Zyl", "Alex Raubitschek"],
    unavailable: ["Derek Macrae"],
  },
  {
    date: "2022-12-28",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2022-12-29",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2022-12-30",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Laura Van Zyl"],
    unavailable: [],
  },
  {
    date: "2022-12-31",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-01",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-02",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Laura Van Zyl"],
    unavailable: [],
  },
  {
    date: "2023-01-03",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-01-04",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-05",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-06",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Laura Van Zyl"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-07",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-08",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-09",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-09",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-10",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-11",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-12",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-13",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 1,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-14",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 0,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-15",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    shiftCount: 0,
    assigned: [],
    unavailable: [],
  },
  {
    date: "2023-01-10",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-01-11",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-12",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Alex Raubitschek"],
  },
  {
    date: "2023-01-13",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-14",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-15",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-16",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-17",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-01-18",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Derek Macrae"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-19",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: ["Alex Raubitschek"],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-20",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 0,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-21",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-22",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-23",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-24",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-01-25",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-26",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-27",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-28",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-29",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-01-30",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-01-31",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-02-01",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-02",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-03",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-04",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-05",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-06",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-07",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-02-08",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-09",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-10",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-11",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-12",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-13",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-14",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-02-15",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-16",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-17",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-18",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-19",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-20",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-21",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-02-22",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-23",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-24",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-25",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-26",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-02-27",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-02-28",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-03-01",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-02",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-03",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-04",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-03-05",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-03-06",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-07",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-03-08",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-09",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-10",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-11",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-03-12",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Sandra Robinson", "Jack Day", "Tony Dan"],
  },
  {
    date: "2023-03-13",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-14",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 2,
    assigned: [],
    unavailable: ["Laura Van Zyl", "Derek Macrae"],
  },
  {
    date: "2023-03-15",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
  {
    date: "2023-03-16",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    shiftCount: 1,
    assigned: [],
    unavailable: ["Laura Van Zyl"],
  },
]);

const workers = reactive([
  {
    id: "9001",
    worker: "Terry Marsh",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9002",
    worker: "Verity Lomas",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9003",
    worker: "Sandra Robinson",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9004",
    worker: "Jack Day",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9005",
    worker: "Danny Ton",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9006",
    worker: "Derek Macrae",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "AM (07:00 - 09:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9006",
    worker: "Derek Macrae",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9007",
    worker: "Laura Van Zyl",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9008",
    worker: "Alex Raubitschek",
    team: "School Passenger Assistants (Portsmouth)",
    shift: "PM (14:00 - 16:30)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
  {
    id: "9011",
    worker: "Nathan Midgley",
    team: "Equipment Cleaner (Portsmouth)",
    shift: "DAY (09:00 - 17:00)",
    fromDate: "01-Jan-2022",
    toDate: "31-Dec-2023",
  },
]);

const selWorker = ref(workers[0].worker);

let shiftHeaders = computed(() => {
  let sh = new Set();
  teamShifts
    .filter((shift) => shift.team === selTeam.value)
    .forEach((shift) => sh.add(shift.shift));
  return sh;
});

let weekShifts = computed(() => {
  let ws = teamDayShifts
    .filter((shift) => shift.team === selTeam.value && shift.shift === selShift.value) // team & shift desc matches
    .filter(
      (shift) =>
        moment(shift.date).diff(moment(startWeek.value), "days") >= 0 && // lies in current week
        moment(shift.date).diff(moment(startWeek.value), "days") <= 6
    );
  let ws2 = [];
  ws.forEach((shift) =>
    ws2.push({
      date: shift.date,
      shifts: shift.shiftCount,
      assigned: shift.assigned,
      unavailable: shift.unavailable,
    })
  );
  return reactive(ws2);
});

let currentShifts = computed(() => {
  let ws = teamDayShifts.filter((shift) => shift.date === moment().format("YYYY-MM-DD"));
  let ws2 = [];
  ws.forEach((shift) => {
    shift.assigned.forEach((assigned) => {
      let teamShift = teamShifts.find(
        (ts) => ts.team === shift.team && ts.shift == shift.shift
      );
      ws2.push({
        date: shift.date,
        team: shift.team,
        shift: shift.shift,
        start: teamShift.start,
        end: teamShift.end,
        originalStart: teamShift.start,
        originalEnd: teamShift.end,
        hours: teamShift.hours,
        break: teamShift.break,
        originalBreak: teamShift.break,
        paidhours: teamShift.hours - teamShift.break / 60,
        worker: assigned,
        status: "Planned",
        editStart: false,
        editEnd: false,
        eidtBreak: false
      });
    });
  });
  return reactive(ws2);
});

console.log(currentShifts);

let shiftsWorkers = computed(() => {
  let ws = workers.filter(
    (shift) => shift.team === selTeam.value && shift.shift === selShift.value
  ); // team & shift desc matches
  //    .filter(shift => moment(shift.date).diff(moment(startWeek.value), 'days') >= 0 // lies in current week
  //      && moment(shift.date).diff(moment(startWeek.value), 'days') <= 6)
  return reactive(ws);
});

const changeTeam = () => {
  selShift.value = shifts.value[0];
  console.log(shifts.value[0]);
};

const changeShift = (shift, change) => {
  shift.shifts = shift.shifts + change;
};

const assignWorker = (worker, shift) => {
  shift.assigned.push(worker.worker);
};

const removeWorker = (worker, shift) => {
  shift.assigned = shift.assigned.filter((assign) => worker.worker !== assign);
};

let teamLocations = [
  "School Passenger Assistants (Portsmouth)",
  "Equipment Cleaner (Portsmouth)",
];

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
    element: ".changeShift",
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
  id: "changeShiftDisabledStep",
  text: "You cannot reduce the shift number below the assigned worker count.",
  attachTo: {
    element: ".changeShiftDisabled",
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

.changeShift {
  color: #a0c0d3;
  cursor: pointer;
}

.changeShiftDisabled {
  color: #eee2df;
  cursor: not-allowed;
}

.changeShift:hover {
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
  padding: 0;
}

.NoShow {
  text-decoration: line-through !important;
  color: red;
}

.Started {
  font-weight: bold;
  color: rgb(61, 189, 97);
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
}

.addWorker {
  font-size: 20px !important;
  padding: 0;
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
