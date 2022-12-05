<template>
  <div ref="gantt" style="height: 900px; width: 1200px"></div>
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
    var zoomConfig = {
      levels: [
        {
          name: "day",
          scale_height: 27,
          min_column_width: 80,
          scales: [
            { unit: "day", step: 1, format: "%d %M" },
            { unit: "month", format: "%F, %Y" },
          ],
        },
        {
          name: "week",
          scale_height: 50,
          min_column_width: 50,
          scales: [
            {
              unit: "week",
              step: 1,
              format: function (date) {
                var dateToStr = gantt.date.date_to_str("%d %M");
                var endDate = gantt.date.add(date, -6, "day");
                var weekNum = gantt.date.date_to_str("%W")(date);
                return (
                  "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate)
                );
              },
            },
            { unit: "day", step: 1, format: "%j %D" },
            { unit: "month", format: "%F, %Y" },
          ],
        },
        {
          name: "month",
          scale_height: 50,
          min_column_width: 120,
          scales: [
            { unit: "month", format: "%F, %Y" },
            { unit: "week", format: "Week #%W" },
          ],
        },
        {
          name: "quarter",
          height: 50,
          min_column_width: 90,
          scales: [
            {
              unit: "quarter",
              step: 1,
              format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M");
                var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              },
            },
            { unit: "month", step: 1, format: "%M" },
          ],
        },
      ],
      useKey: "ctrlKey",
      trigger: "wheel",
      element: function () {
        return gantt.$root.querySelector(".gantt_task");
      },
    };

    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel("week");

    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
  },
};
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
