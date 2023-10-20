<script>
import { BriefcaseIcon, AwardIcon, FileIcon, ClockIcon, MapIcon, PackageIcon, WindIcon } from "@zhuowenli/vue-feather-icons";

export default {
  setup() {
    return {
      adminWidgets: [
        {
          id: 1,
          feaIcon: "briefcase",
          feaIconClass: "primary",
          label: "Load Projects",
          counter: "67",
          suffix: "",
          url: "/apps/projects-list",
          badgeClass: "danger",
          icon: "ri-arrow-down-s-line",
          percentage: "5.02 %",
          caption: "Load projects from CSV template",
        },
        {
          id: 2,
          feaIcon: "award",
          feaIconClass: "warning",
          label: "Load Suppliers",
          counter: "7",
          separator: ",",
          suffix: "",
          url: "/apps/crm-suppliers",
          badgeClass: "success",
          icon: "ri-arrow-up-s-line",
          percentage: "3.58 %",
          caption: "Load suppliers from CSV template",
        },
        {
          id: 2,
          feaIcon: "map",
          feaIconClass: "info",
          label: "Manage Locations",
          counter: "7",
          separator: ",",
          suffix: "",
          url: "",
          badgeClass: "success",
          icon: "ri-arrow-up-s-line",
          percentage: "3.58 %",
          caption: "Manage and load locations",
        },
        {
          id: 3,
          feaIcon: "package",
          feaIconClass: "danger",
          label: "Manage Categories",
          counter: "7",
          separator: ",",
          suffix: "",
          url: "",
          badgeClass: "success",
          icon: "ri-arrow-up-s-line",
          percentage: "3.58 %",
          caption: "Manage and load categories",
        },
        {
          id: 4,
          feaIcon: "wind",
          feaIconClass: "primary",
          label: "Manage Workflows",
          counter: "7",
          separator: ",",
          suffix: "",
          url: "",
          badgeClass: "success",
          icon: "ri-arrow-up-s-line",
          percentage: "3.58 %",
          caption: "Manage and define workflows",
        },
        {
          id: 5,
          feaIcon: "file",
          feaIconClass: "warning",
          label: "Manage Document Types",
          counter: "7",
          separator: ",",
          suffix: "",
          url: "",
          badgeClass: "success",
          icon: "ri-arrow-up-s-line",
          percentage: "3.58 %",
          caption: "Manage and load document types",
        },
      ],
    };
  },
  components: {
    BriefcaseIcon,
    AwardIcon,
    ClockIcon,
    MapIcon,
    WindIcon,
    PackageIcon,
    FileIcon,
  },
};
</script>

<template>
  <div class="col-xl-4" v-for="(item, index) of adminWidgets" :key="index">
    <div class="card card-animate">
      <div class="card-body py-1">
        <div class="d-flex align-items-center">
          <div class="avatar-sm flex-shrink-0">
            <span
              class="avatar-title rounded-2 fs-2"
              :class="{
                'bg-soft-primary text-primary': item.feaIconClass === 'primary',
                'bg-soft-warning text-warning': item.feaIconClass === 'warning',
                'bg-soft-danger text-danger': item.feaIconClass === 'danger',
                'bg-soft-success text-success': item.feaIconClass === 'success',
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

              <template v-if="item.feaIcon == 'map'">
                <MapIcon size="24" class="text-info"></MapIcon>
              </template>

              <template v-if="item.feaIcon == 'package'">
                <PackageIcon size="24" class="text-info"></PackageIcon>
              </template>

              <template v-if="item.feaIcon == 'file'">
                <FileIcon size="24" class="text-info"></FileIcon>
              </template>

              <template v-if="item.feaIcon == 'wind'">
                <WindIcon size="24" class="text-info"></WindIcon>
              </template>
            </span>
          </div>
          <div class="flex-grow-1 overflow-hidden ms-3">
            <div class="mb-1">
              <span class="text-uppercase fw-medium text-muted text-truncate">
                {{ item.label }}
              </span>
              <router-link style="float: right" class="btn btn-info btn-sm" :to="item.url" v-if="item.url">
                <span class="align-middle" style="color:white">Manage</span>
              </router-link>
              <a v-else style="float: right" href="javascript:void(0);" class="btn btn-soft-info btn-sm"
              >Manage</a
              >
            </div>
            <p class="text-muted text-truncate mb-0">{{ item.caption }}
            </p>
          </div>
        </div>
        <a style="float: left" href="javascript:void(0);" class="btn btn-soft-info btn-sm mt-2 mb-1"
                >Download Template</a
              >
        <a style="float: right" href="javascript:void(0);" class="btn btn-soft-info btn-sm mt-2 mb-1"
          >Import Template</a
          >
      </div>
      <!-- end card body -->
    </div>
  </div>
</template>
