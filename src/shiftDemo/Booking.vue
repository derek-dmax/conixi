<template>
  <div class="col d-flex flex-column h-sm-100">
    <main class="row overflow-auto m-1 fs-6 bg-light">
      <div class="card">
        <div class="card-body px-0">
          <ul class="m-2 p-1 nav nav-pills nav-fill">
            <li class="nav-item">
              <a class="nav-link active" href="/employer/bookingControl"
                >Planning <i class="bx bx-align-left"></i
              ></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/employer/currentControl"
                >Control <i class="bx bx-alarm"></i
              ></a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#"
                >Review <i class="ri-dashboard-2-line"></i
              ></a>
            </li>
          </ul>
          <div>
            <div class="row d-flex mt-1 mb-1">
              <div class="form-group col-auto flex-fill">
                <label for="location">Team/Location</label>
                <select name="location" class="form-select" id="location" v-model="team" @change="changeTeam">
                  <option v-for="(team, index) in teamLocations" :key="index" :value="team">{{ team }}</option>
                  <option value="Add New Team ...">Add new team/location ...</option>
                </select>
              </div>
              <div class="form-group col-auto flex-fill">
                <label for="location">Shift</label>
                <select name="group" class="form-select" id="group" v-model="selShift" @change="changeShift">
                  <option :value="shift" v-for="(shift, index) in shifts" :key="index">{{shift}}</option>
                  <option value="Add New Shift">Add new shift ...</option>
                </select>
              </div>
              <div class="form-group col-auto flex-fill">
                <label for="weekStarting">Week Starting</label>
                <select class="form-select" name="weekStart" id="weekStart" v-model="startWeek">
                  <option v-for="(week, index) in weekStarts" :key="index" :value="week.format('YYYY-MM-DD')">
                    {{ week.format('dddd').substring(0,3) + ' ' + week.format('DD MMM')}}
                  </option>
                </select>
              </div>
            </div>

            <table class="table table-hover mt-2">
              <thead>
                <tr>
                  <th>
                    Worker
                    <i class="bx bx-help-circle tourIcon" @click="startTour"></i>
                  </th>
                  <th class="bg-light text-center" v-for="(shift, index) in weekShifts" :key="index">
                    {{ moment(startWeek).add(index - 1, 'days').format('dddd').substring(0,3) + ' ' + moment(startWeek).add(index - 1, 'days').format('DD MMM') }}<br />
                    <span
                      class="counter"
                      :class="{
                                filled: shift.shifts === shift.assigned.length,
                                unfilled: shift.shifts !== shift.assigned.length,
                              }">
                      {{ shift.assigned.length }} 
                      <span v-if="shift.shifts !== shift.assigned.length">/ {{ shift.shifts }}</span>
                      </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="/employer/showProfile/66106" class="worker">Terry March</a>
                    <a
                      href="/employer/workerAvailability/66106"
                      target="_blank"
                      title="Amend worker availability"
                      ><i class="bx bx-calendar-minus absence"></i
                    ></a>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="monStart-66106"
                      data-date="2023-01-02"
                      data-id="66106"
                      name="monStart"
                    />
                    <button
                      type="button"
                      data-id="monStart-90339"
                      class="btn btn-sm fillBtn"
                    >
                      <i class="bx bx-check-circle"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="tueStart-66106"
                      data-date="2023-01-03"
                      data-id="66106"
                      name="tueStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="wedStart-66106"
                      data-date="2023-01-04"
                      data-id="66106"
                      name="wedStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="thuStart-66106"
                      data-date="2023-01-05"
                      data-id="66106"
                      name="thuStart"
                    />
                    <button
                      type="button"
                      data-id="thuStart-66106"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="friStart-66106"
                      data-date="2023-01-06"
                      data-id="66106"
                      name="friStart"
                    />
                    <button
                      type="button"
                      data-id="friStart-66106"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="satStart-66106"
                      data-date="2023-01-07"
                      data-id="66106"
                      name="satStart"
                    />
                    <button
                      type="button"
                      data-id="satStart-66106"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="sunStart-66106"
                      data-date="2023-01-08"
                      data-id="66106"
                      name="sunStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a href="/employer/showProfile/62430" class="worker">Verity Lomas</a>
                    <a
                      href="/employer/workerAvailability/62430"
                      target="_blank"
                      title="Amend worker availability"
                      ><i class="bx bx-calendar-minus absence"></i
                    ></a>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="monStart-62430"
                      data-date="2023-01-02"
                      data-id="62430"
                      name="monStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="tueStart-62430"
                      data-date="2023-01-03"
                      data-id="62430"
                      name="tueStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="wedStart-62430"
                      data-date="2023-01-04"
                      data-id="62430"
                      name="wedStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="thuStart-62430"
                      data-date="2023-01-05"
                      data-id="62430"
                      name="thuStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="friStart-62430"
                      data-date="2023-01-06"
                      data-id="62430"
                      name="friStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="satStart-62430"
                      data-date="2023-01-07"
                      data-id="62430"
                      name="satStart"
                    />
                    <button
                      type="button"
                      data-id="satStart-62430"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="sunStart-62430"
                      data-date="2023-01-08"
                      data-id="62430"
                      name="sunStart"
                    />
                    <button
                      type="button"
                      data-id="sunStart-62430"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a href="/employer/showProfile/56144" class="worker"
                      >Sandra Robinson</a
                    >
                    <a
                      href="/employer/workerAvailability/56144"
                      target="_blank"
                      title="Amend worker availability"
                      ><i class="bx bx-calendar-minus absence"></i
                    ></a>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="monStart-56144"
                      data-date="2023-01-02"
                      data-id="56144"
                      name="monStart"
                    />
                    -
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="tueStart-56144"
                      data-date="2023-01-03"
                      data-id="56144"
                      name="tueStart"
                    />
                    <button
                      type="button"
                      data-id="tueStart-56144"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="wedStart-56144"
                      data-date="2023-01-04"
                      data-id="56144"
                      name="wedStart"
                    />
                    -
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="thuStart-56144"
                      data-date="2023-01-05"
                      data-id="56144"
                      name="thuStart"
                    />
                    <button
                      type="button"
                      data-id="thuStart-56144"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="friStart-56144"
                      data-date="2023-01-06"
                      data-id="56144"
                      name="friStart"
                    />
                    <button
                      type="button"
                      data-id="friStart-56144"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="satStart-56144"
                      data-date="2023-01-07"
                      data-id="56144"
                      name="satStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="sunStart-56144"
                      data-date="2023-01-08"
                      data-id="56144"
                      name="sunStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a href="/employer/showProfile/90339" class="worker">Jack Day</a>
                    <a
                      href="/employer/workerAvailability/90339"
                      target="_blank"
                      title="Amend worker availability"
                      ><i class="bx bx-calendar-minus absence"></i
                    ></a>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="monStart-90339"
                      data-date="2023-01-02"
                      data-id="90339"
                      name="monStart"
                    />
                    -
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="tueStart-90339"
                      data-date="2023-01-03"
                      data-id="90339"
                      name="tueStart"
                    />
                    <button
                      type="button"
                      data-id="monStart-90339"
                      class="btn btn-sm fillBtn"
                    >
                      <i class="bx bx-check-circle"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="wedStart-90339"
                      data-date="2023-01-04"
                      data-id="90339"
                      name="wedStart"
                    />
                    -
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="thuStart-90339"
                      data-date="2023-01-05"
                      data-id="90339"
                      name="thuStart"
                    />
                    <button
                      type="button"
                      data-id="thuStart-90339"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="friStart-90339"
                      data-date="2023-01-06"
                      data-id="90339"
                      name="friStart"
                    />
                    <button
                      type="button"
                      data-id="friStart-90339"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="satStart-90339"
                      data-date="2023-01-07"
                      data-id="90339"
                      name="satStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="sunStart-90339"
                      data-date="2023-01-08"
                      data-id="90339"
                      name="sunStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a href="/employer/showProfile/80969" class="worker">Danny Ton</a>
                    <a
                      href="/employer/workerAvailability/80969"
                      target="_blank"
                      title="Amend worker availability"
                      ><i class="bx bx-calendar-minus absence"></i
                    ></a>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="monStart-80969"
                      data-date="2023-01-02"
                      data-id="80969"
                      name="monStart"
                    />
                    -
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="tueStart-80969"
                      data-date="2023-01-03"
                      data-id="80969"
                      name="tueStart"
                    />
                    <button
                      type="button"
                      data-id="tueStart-80969"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="wedStart-80969"
                      data-date="2023-01-04"
                      data-id="80969"
                      name="wedStart"
                    />
                    <button
                      type="button"
                      data-id="monStart-90339"
                      class="btn btn-sm fillBtn"
                    >
                      <i class="bx bx-check-circle"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="thuStart-80969"
                      data-date="2023-01-05"
                      data-id="80969"
                      name="thuStart"
                    />
                    <button
                      type="button"
                      data-id="thuStart-80969"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="friStart-80969"
                      data-date="2023-01-06"
                      data-id="80969"
                      name="friStart"
                    />
                    <button
                      type="button"
                      data-id="friStart-80969"
                      class="btn btn-sm addWorker"
                    >
                      <i class="bx bxs-user-plus"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <input
                      type="hidden"
                      id="satStart-80969"
                      data-date="2023-01-07"
                      data-id="80969"
                      name="satStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td class="bg-light text-center">
                    <input
                      type="hidden"
                      id="sunStart-80969"
                      data-date="2023-01-08"
                      data-id="80969"
                      name="sunStart"
                    />
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="modal fade"
              id="eventModal"
              tabindex="-1"
              aria-labelledby="eventModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="eventModalTitle">Shift</h5>
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
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useShepherd } from "vue-shepherd"
import moment from 'moment'

const tour = useShepherd({
  useModalOverlay: true,
})

const startTour = () => {
  tour.start()
}

const weekStarts = ref([
  moment().isoWeekday(-6),
  moment().isoWeekday(1),
  moment().isoWeekday(8),
  moment().isoWeekday(15),
  moment().isoWeekday(22),
  moment().isoWeekday(29)
])

const startWeek = ref(moment().isoWeekday(8).format('YYYY-MM-DD'))

const team = ref("General Drivers")
let teamShifts = [
  {team: "General Drivers", shift: "AM (09:00 - 15:00)"},
  {team: "General Drivers", shift: "PM (12:00 - 17:00)"},
  {team: "General Drivers", shift: "NTS (20:00 - 02:00)"},
  {team: "Advanced Drivers", shift: "AM (08:00 - 17:00)"},
  {team: "Advanced Drivers", shift: "PM (12:00 - 18:00)"},
]

let shifts = computed(() => {
  let shiftsSelected = teamShifts.filter(shift => shift.team === team.value).map(shift => shift.shift)
  return shiftsSelected
})

const selShift = ref(shifts.value[0])

const teamDayShifts = reactive(
[
  {date: '2022-12-26', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Terry March']},
  {date: '2022-12-27', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: ['Sandra Robinson', 'Danny Ton']},
  {date: '2022-12-28', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Jack Day']},
  {date: '2022-12-29', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Danny Ton']},
  {date: '2022-12-30', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Sandra Robinson']},
  {date: '2022-12-31', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-01', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Terry March']},
  {date: '2023-01-02', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Sandra Robinson']},
  {date: '2023-01-03', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: ['Danny Ton']},
  {date: '2023-01-04', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Jack Day']},
  {date: '2023-01-05', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-06', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Sandra Robinson']},
  {date: '2023-01-07', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-08', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Terry March']},
  {date: '2023-01-09', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Jack Day']},
  {date: '2023-01-10', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: ['Danny Ton']},
  {date: '2023-01-11', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-12', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-13', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Danny Ton']},
  {date: '2023-01-14', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Jack Day']},
  {date: '2023-01-15', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-16', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-17', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-01-18', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Terry March']},
  {date: '2023-01-19', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: ['Jack Day']},
  {date: '2023-01-20', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-21', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-22', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-23', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-24', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-01-25', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-26', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-27', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-28', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-29', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-30', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-01-31', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-02-01', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-02', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-03', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-04', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-05', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-06', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-07', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-02-08', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-09', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-10', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-11', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-12', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-13', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-14', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-02-15', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-16', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-17', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-18', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-19', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-20', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-21', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-02-22', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-23', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-24', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-25', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-26', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-27', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-02-28', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-03-01', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-02', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-03', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-04', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-05', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-06', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-07', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-03-08', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-09', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-10', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-11', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-12', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-13', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-14', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 2, assigned: []},
  {date: '2023-03-15', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
  {date: '2023-03-16', team: 'General Drivers', shift: 'AM (09:00 - 15:00)', shiftCount: 1, assigned: []},
]
)

let weekShifts = computed(() => {
  let ws = teamDayShifts
    .filter(shift => shift.team === team.value && shift.shift === selShift.value) // team & shift desc matches
    .filter(shift => moment(shift.date).diff(moment(startWeek.value), 'days') >= 0 // lies in current week
      && moment(shift.date).diff(moment(startWeek.value), 'days') <= 6)
  let ws2 = []
  ws.forEach(shift => ws2.push({date: shift.date, shifts: shift.shiftCount, assigned: shift.assigned}))
  return ws2
})

const changeTeam = () => {
  selShift.value = shifts.value[0]
  console.log(shifts.value[0])
}

const changeShift = () => {
  console.log(selShift.value)
}

let teamLocations = [
  "General Drivers",
  "Advanced Drivers",
]

tour.addStep({
  id: "shiftNumberStep",
  text: "Click on the shift number to change the number of shifts required.",
  attachTo: {
    element: ".filled",
    on: "bottom",
  },
  buttons: [
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

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
  id: "shiftNumberStep",
  text:
    "Assign workers to the shift by clicking the person icon with a plus sign on the correct day on the worker line.",
  attachTo: {
    element: ".addWorker",
    on: "bottom",
  },
  buttons: [
    {
      text: "Prev",
      action: tour.back,
    },
    {
      text: "Next",
      action: tour.next,
    },
  ],
})

</script>

<style>
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
  font-size: 26px !important;
  padding:0;
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
  font-size: 26px;
  cursor: not-allowed;
}

.filled {
  color: green !important;
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
  font-size: 30px !important;
  padding:0;
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
</style>
