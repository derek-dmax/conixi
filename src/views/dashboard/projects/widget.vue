<script>
import { BriefcaseIcon, AwardIcon, ClockIcon } from "@zhuowenli/vue-feather-icons";

export default {
  setup() {
    return {
      projectsWidgets: [
        {
          id: 1,
          feaIcon: "briefcase",
          feaIconClass: "primary",
          label: "Active Projects",
          counter: "67",
          suffix: "",
          badgeClass: "danger",
          icon: "ri-arrow-down-s-line",
          percentage: "5.02 %",
          caption: "Projects this month",
        },
        {
          id: 2,
          feaIcon: "award",
          feaIconClass: "warning",
          label: "New Suppliers",
          counter: "7",
          separator: ",",
          suffix: "",
          badgeClass: "success",
          icon: "ri-arrow-up-s-line",
          percentage: "3.58 %",
          caption: "Suppliers this month",
        },
        {
          id: 3,
          feaIcon: "clock",
          feaIconClass: "info",
          label: "Total Days",
          counter: "168d",
          suffix: "m",
          badgeClass: "danger",
          icon: "ri-arrow-down-s-line",
          percentage: "10.35 %",
          caption: "Work this month",
        },
      ],
    };
  },
  components: {
    BriefcaseIcon,
    AwardIcon,
    ClockIcon,
  },
};
</script>

<template>
  <div class="col-xl-4" v-for="(item, index) of projectsWidgets" :key="index">
    <div class="card card-animate">
      <div class="card-body py-1">
        <div class="d-flex align-items-center">
          <div class="avatar-sm flex-shrink-0">
            <span
              class="avatar-title rounded-2 fs-2"
              :class="{
                'bg-soft-primary text-primary': item.feaIconClass === 'primary',
                'bg-soft-warning text-warning': item.feaIconClass === 'warning',
                'bg-soft-info text-info': item.feaIconClass === 'info',
              }"
            >
              <template v-if="item.feaIcon == 'briefcase'">
                <BriefcaseIcon size="24" class="text-primary"></BriefcaseIcon>
              </template>

              <template v-if="item.feaIcon == 'award'">
                <AwardIcon size="24" class="text-warning"></AwardIcon>
              </template>

              <template v-if="item.feaIcon == 'clock'">
                <ClockIcon size="24" class="text-info"></ClockIcon>
              </template>
            </span>
          </div>
          <div class="flex-grow-1 overflow-hidden ms-3">
            <div class="mb-1">
              <span class="text-uppercase fw-medium text-muted text-truncate">
                {{ item.label }}
              </span>
            </div>
            <div class="d-flex align-items-center mb-1">
              <h4 class="fs-4 flex-grow-1 mb-0">
                <span class="counter-value">{{ item.counter }}</span>
              </h4>
              <span :class="`badge badge-soft-${item.badgeClass} fs-12`"
                ><i :class="`${item.icon} fs-13 align-middle me-1`"></i
                >{{ item.percentage }}</span
              >
            </div>
            <p class="text-muted text-truncate mb-0">{{ item.caption }}
              <a style="float: right" href="javascript:void(0);" class="btn btn-soft-info btn-sm"
                  >Export Data</a
                >
            </p>
          </div>
        </div>
      </div>
      <!-- end card body -->
    </div>
  </div>
</template>
