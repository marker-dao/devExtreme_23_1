"use strict";

exports.getAppointmentRenderingStrategyName = void 0;
const getAppointmentRenderingStrategyName = viewType => {
  const appointmentRenderingStrategyMap = {
    day: {
      renderingStrategy: 'vertical'
    },
    week: {
      renderingStrategy: 'week'
    },
    workWeek: {
      renderingStrategy: 'week'
    },
    month: {
      renderingStrategy: 'horizontalMonth'
    },
    timelineDay: {
      renderingStrategy: 'horizontal'
    },
    timelineWeek: {
      renderingStrategy: 'horizontal'
    },
    timelineWorkWeek: {
      renderingStrategy: 'horizontal'
    },
    timelineMonth: {
      renderingStrategy: 'horizontalMonthLine'
    },
    agenda: {
      renderingStrategy: 'agenda'
    }
  };
  const {
    renderingStrategy
  } = appointmentRenderingStrategyMap[viewType];
  return renderingStrategy;
};
exports.getAppointmentRenderingStrategyName = getAppointmentRenderingStrategyName;