<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";

import Widgets from "./widget.vue";
import AudiencesMetrics from "./audiences-metrics.vue";
import Referrals from "./referrals.vue";
import SessionsLocations from "./sessions-locations.vue";
import TopPages from "./top-pages.vue";
import Users from "./users.vue";

export default {
  page: {
    title: "System Admin",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "System Admin",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "System Admin",
          active: true,
        },
      ],
    };
  },
  components: {
    Layout,
    PageHeader,
    AudiencesMetrics,
    Widgets,
    Referrals,
    SessionsLocations,
    TopPages,
    Users,
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="project-wrapper">
          <div class="row">
            <Widgets />
          </div>
    </div>
    <div class="row">
      <div class="row col-xl-5" style="margin-left: 0">
        <AudiencesMetrics />
      </div>
      <div class="col-xl-7" style="margin-left: 13px">
        <SessionsLocations />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4">
        <Users />
      </div>
      <div class="col-xl-4 col-md-6">
        <Referrals />
      </div>
      <div class="col-xl-4 col-md-6">
        <TopPages />
      </div>
    </div>
  </Layout>
</template>
