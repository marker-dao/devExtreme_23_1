/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/utils/view_provider_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { VIEWS } from '../../../utils/options/constants_view';
import { ViewDataGenerator } from '../m_view_data_generator';
import { ViewDataGeneratorDay } from '../m_view_data_generator_day';
import { ViewDataGeneratorMonth } from '../m_view_data_generator_month';
import { ViewDataGeneratorTimelineMonth } from '../m_view_data_generator_timeline_month';
import { ViewDataGeneratorWeek } from '../m_view_data_generator_week';
import { ViewDataGeneratorWorkWeek } from '../m_view_data_generator_work_week';
export const getViewDataGeneratorByViewType = viewType => {
  switch (viewType) {
    case VIEWS.MONTH:
      return new ViewDataGeneratorMonth(viewType);
    case VIEWS.TIMELINE_MONTH:
      return new ViewDataGeneratorTimelineMonth(viewType);
    case VIEWS.DAY:
    case VIEWS.TIMELINE_DAY:
      return new ViewDataGeneratorDay(viewType);
    case VIEWS.WEEK:
    case VIEWS.TIMELINE_WEEK:
      return new ViewDataGeneratorWeek(viewType);
    case VIEWS.WORK_WEEK:
    case VIEWS.TIMELINE_WORK_WEEK:
      return new ViewDataGeneratorWorkWeek(viewType);
    default:
      return new ViewDataGenerator(viewType);
  }
};
