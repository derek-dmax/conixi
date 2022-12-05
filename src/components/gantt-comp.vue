<template>
  <div ref="gantt"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
export default {
  name: "gantt",
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },

  mounted: function () {
	gantt.config.columns = [
		{name: "wbs", label: "WBS", width: 40, template: gantt.getWBSCode, resize: true},
		{name: "text", label: "Task name", tree: true, width: 170, resize: true, min_width: 10},
		{name: "start_date", align: "center", width: 90, resize: true},
		{name: "duration", align: "center", width: 80, resize: true},
		{name: "add", width: 40}
	];

	gantt.templates.rightside_text = function (start, end, task) {
		if (task.type == gantt.config.types.milestone)
			return task.text + " / ID: #" + task.id;
		return "";
	};

	gantt.config.start_on_monday = false;

	gantt.config.scale_height = 36 * 2;
    gantt.config.row_height = 25;
	gantt.config.scales = [
		{unit: "month", step: 1, format: "%F"},
		{unit: "week", step: 1, format: function (date) {
			var dateToStr = gantt.date.date_to_str("%d %M");
			var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
			return dateToStr(date) + " - " + dateToStr(endDate);
		}},
		{unit: "day", step: 2, format: "%D"}
	];

    gantt.config.xml_date = "%Y-%m-%d";
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
  },
};
</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
