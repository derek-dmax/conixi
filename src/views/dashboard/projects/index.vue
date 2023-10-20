<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";

import Widgets from "./widget.vue";
//import Schedules from "./schedule.vue";
import Project from "./projects.vue";
import Task from "./tasks.vue";
import Member from "./members.vue";
import Chat from "./chat.vue";
import Status from "./status.vue";
import ActiveProjects from "./active-projects.vue";

export default {
  page: {
    title: "Projects",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Projects",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "Projects",
          active: true,
        },
      ],
    }
  },
  components: {
    Layout,
    PageHeader,
    Widgets,
    Project,
    Task,
    Member,
    Chat,
    ActiveProjects,
    Status
  },
}
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />

        <div class="row project-wrapper">
          <div class="col-xxl-9">
            <div class="row">
              <Widgets />
            </div>
        </div>
        <div class="col-xxl-3">
              <div class="card">
                <div class="card-body p-0">
                  <div class="row align-items-end">
                    <div class="col-sm-12">
                      <div class="mt-1 p-3">
                        <p class="fs-18 lh-base mb-1">
                          Add new reports to the dashboard <i class="mdi mdi-arrow-right"></i>
                        </p>
                        <div style="float:right" class="mr-2 mb-3">
                          <router-link to="/pages/profile" class="btn btn-primary btn-sm"
                            >Add Reports</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end card-body-->
              </div>
            </div>
        <div class="row">
                    <div class="col-xl-12">
<Project/>
                    </div>
                </div>
            </div>

        <div class="row">
            <div class="col-xl-7">
<ActiveProjects />
            </div>
            <div class="col-xl-5">
                <Task />
                </div>
        </div>

        <div class="row">
            <div class="col-xxl-4">
                <Member />
            </div>  
            <div class="col-xxl-4 col-lg-6">
                <Chat />
            </div>
            <div class="col-xxl-4 col-lg-6">
                <Status />
            </div>
        </div>

    </Layout>
</template>