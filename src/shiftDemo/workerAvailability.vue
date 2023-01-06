<template>
  <div class="card">
    <div class="card">
      <div class="card-header fs-20">Availability for Terry Marsh</div>
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <h4>Regular Availability</h4>
            <table class="table table-hover text-center">
              <thead>
                <tr>
                  <th><i class="bx bx-calendar"></i></th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AM</td>

                  <td id="monam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="tueam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="wedam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="thuam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="friam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="satam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="sunam">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>PM</td>
                  <td id="monpm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="tuepm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="wedpm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="thupm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="fripm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="satpm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                  <td id="sunpm">
                    <i class="bx bx-check-circle text-success"></i>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>NTS</td>
                  <td id="monnts">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td id="tuents">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td id="wednts">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td id="thunts">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td id="frints">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td id="satnts">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                  <td id="sunnts">
                    <i class="bx bxs-x-circle absent text-warning"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-8">
            <div
              id="calendar"
              class="fc fc-media-screen fc-direction-ltr fc-theme-standard"
            >
              <div class="fc-header-toolbar fc-toolbar">
                <div class="fc-toolbar-chunk">
                  <h2 class="fc-toolbar-title">January 2023</h2>
                </div>
                <div class="fc-toolbar-chunk"></div>
                <div class="fc-toolbar-chunk">
                  <button
                    disabled=""
                    class="fc-today-button fc-button fc-button-primary"
                    type="button"
                  >
                    today
                  </button>
                  <div class="fc-button-group">
                    <button
                      class="fc-prev-button fc-button fc-button-primary"
                      type="button"
                      aria-label="prev"
                    >
                      <span class="fc-icon fc-icon-chevron-left"></span></button
                    ><button
                      class="fc-next-button fc-button fc-button-primary"
                      type="button"
                      aria-label="next"
                    >
                      <span class="fc-icon fc-icon-chevron-right"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="fc-view-harness fc-view-harness-active"
                style="height: 471.852px"
              >
                <div class="fc-daygrid fc-dayGridMonth-view fc-view">
                  <table class="fc-scrollgrid fc-scrollgrid-liquid">
                    <thead>
                      <tr class="fc-scrollgrid-section fc-scrollgrid-section-header">
                        <td>
                          <div class="fc-scroller-harness">
                            <div class="fc-scroller" style="overflow: hidden scroll">
                              <table class="fc-col-header" style="width: 628px">
                                <colgroup></colgroup>
                                <tbody>
                                  <tr>
                                    <th class="fc-col-header-cell fc-day fc-day-sun">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Sun</a>
                                      </div>
                                    </th>
                                    <th class="fc-col-header-cell fc-day fc-day-mon">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Mon</a>
                                      </div>
                                    </th>
                                    <th class="fc-col-header-cell fc-day fc-day-tue">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Tue</a>
                                      </div>
                                    </th>
                                    <th class="fc-col-header-cell fc-day fc-day-wed">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Wed</a>
                                      </div>
                                    </th>
                                    <th class="fc-col-header-cell fc-day fc-day-thu">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Thu</a>
                                      </div>
                                    </th>
                                    <th class="fc-col-header-cell fc-day fc-day-fri">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Fri</a>
                                      </div>
                                    </th>
                                    <th class="fc-col-header-cell fc-day fc-day-sat">
                                      <div class="fc-scrollgrid-sync-inner">
                                        <a class="fc-col-header-cell-cushion">Sat</a>
                                      </div>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="fc-scrollgrid-section fc-scrollgrid-section-body fc-scrollgrid-section-liquid"
                      >
                        <td>
                          <div class="fc-scroller-harness fc-scroller-harness-liquid">
                            <div
                              class="fc-scroller fc-scroller-liquid-absolute"
                              style="overflow: hidden scroll"
                            >
                              <div
                                class="fc-daygrid-body fc-daygrid-body-unbalanced"
                                style="width: 628px"
                              >
                                <table
                                  class="fc-scrollgrid-sync-table"
                                  style="width: 628px; height: 434px"
                                >
                                  <colgroup></colgroup>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sun fc-day-past"
                                        data-date="2023-01-01"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">1</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-mon fc-day-past"
                                        data-date="2023-01-02"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">2</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-tue fc-day-past"
                                        data-date="2023-01-03"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">3</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-wed fc-day-past"
                                        data-date="2023-01-04"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">4</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-thu fc-day-past"
                                        data-date="2023-01-05"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">5</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-fri fc-day-today"
                                        data-date="2023-01-06"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">6</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sat fc-day-future"
                                        data-date="2023-01-07"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">7</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sun fc-day-future"
                                        data-date="2023-01-08"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">8</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-mon fc-day-future"
                                        data-date="2023-01-09"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">9</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-tue fc-day-future"
                                        data-date="2023-01-10"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">10</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-wed fc-day-future"
                                        data-date="2023-01-11"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">11</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-thu fc-day-future"
                                        data-date="2023-01-12"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">12</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-fri fc-day-future"
                                        data-date="2023-01-13"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">13</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sat fc-day-future"
                                        data-date="2023-01-14"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">14</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sun fc-day-future"
                                        data-date="2023-01-15"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">15</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-mon fc-day-future"
                                        data-date="2023-01-16"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">16</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-tue fc-day-future"
                                        data-date="2023-01-17"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">17</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-wed fc-day-future"
                                        data-date="2023-01-18"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">18</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-thu fc-day-future"
                                        data-date="2023-01-19"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">19</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-fri fc-day-future"
                                        data-date="2023-01-20"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">20</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sat fc-day-future"
                                        data-date="2023-01-21"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">21</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sun fc-day-future"
                                        data-date="2023-01-22"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">22</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-mon fc-day-future"
                                        data-date="2023-01-23"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">23</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-tue fc-day-future"
                                        data-date="2023-01-24"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">24</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-wed fc-day-future"
                                        data-date="2023-01-25"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">25</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-thu fc-day-future"
                                        data-date="2023-01-26"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">26</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-fri fc-day-future"
                                        data-date="2023-01-27"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">27</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sat fc-day-future"
                                        data-date="2023-01-28"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">28</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sun fc-day-future"
                                        data-date="2023-01-29"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">29</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-mon fc-day-future"
                                        data-date="2023-01-30"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">30</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-tue fc-day-future"
                                        data-date="2023-01-31"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">31</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-wed fc-day-future fc-day-other"
                                        data-date="2023-02-01"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">1</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-thu fc-day-future fc-day-other"
                                        data-date="2023-02-02"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">2</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-fri fc-day-future fc-day-other"
                                        data-date="2023-02-03"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">3</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sat fc-day-future fc-day-other"
                                        data-date="2023-02-04"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">4</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sun fc-day-future fc-day-other"
                                        data-date="2023-02-05"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">5</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other"
                                        data-date="2023-02-06"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">6</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-tue fc-day-future fc-day-other"
                                        data-date="2023-02-07"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">7</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-wed fc-day-future fc-day-other"
                                        data-date="2023-02-08"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">8</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-thu fc-day-future fc-day-other"
                                        data-date="2023-02-09"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">9</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-fri fc-day-future fc-day-other"
                                        data-date="2023-02-10"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">10</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                      <td
                                        class="fc-daygrid-day fc-day fc-day-sat fc-day-future fc-day-other"
                                        data-date="2023-02-11"
                                      >
                                        <div
                                          class="fc-daygrid-day-frame fc-scrollgrid-sync-inner"
                                        >
                                          <div class="fc-daygrid-day-top">
                                            <a class="fc-daygrid-day-number">11</a>
                                          </div>
                                          <div class="fc-daygrid-day-events"></div>
                                          <div class="fc-daygrid-day-bg"></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
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
    </div>
  </div>
</template>

<script setup></script>

<style>
.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}
.card-header {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
