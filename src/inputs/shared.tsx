import { Moment } from 'moment';
import * as React from 'react';

import {
  YearView,
  YearViewPropsNames,
  MonthView,
  MonthViewPropsNames,
  DayView,
  DayViewPropsNames,
  HourView,
  HourViewPropsNames,
  MinuteView,
  MinuteViewPropsNames,
  DatesRangeView,
  DatesRangeViewPropsNames,
  MonthRangeView,
  MonthRangeViewPropsNames,
} from '../views';
import {
  noop,
  extractPropsByNames,
} from '../lib';

/**
 * Filter out all moments that don't have
 * all dates in month disabled.
 * @param {*} moments
 * @return An array of moments; each of these moments
 * doesn't have any selectable date in month.
 */
export function getDisabledMonths(moments: Moment[]): Moment[] {
  if (!moments) {
    return;
  }
  const disabledMonths = [];
  const checkedMonths = [];
  for (const m of moments) {
    if (checkedMonths.indexOf(m.month()) < 0) {
      const momentsForMonth = moments.filter((mForMonth) => mForMonth.month() === m.month());
      const momentsForMonthUniq = [];
      for (const mForMonth of momentsForMonth) {
        if (momentsForMonthUniq.indexOf(mForMonth) < 0) {
          momentsForMonthUniq.push(mForMonth);
        }
      }
      if (momentsForMonthUniq.length === m.daysInMonth()) {
        disabledMonths.push(m);
      }
      checkedMonths.push(m);
    }
  }

  return disabledMonths;
}

/**
 * Filter out all moments that don't have
 * all months in year disabled.
 * @param {*} moments
 * @return An array of moments; each of these moments
 * doesn't have any selectable month in year.
 */
export function getDisabledYears(moments: Moment[]): Moment[] {
  if (!moments) {
    return;
  }
  const disabledYears = [];
  const checkedYears = [];
  for (const y of moments) {
    if (checkedYears.indexOf(y.year()) < 0) {
      const momentsForYear = getDisabledMonths(moments.filter((mForYear) => mForYear.year() === y.year()));
      const momentsForYearUniq = [];
      for (const mForYear of momentsForYear) {
        if (momentsForYearUniq.indexOf(mForYear) < 0) {
          momentsForYearUniq.push(mForYear);
        }
      }
      if (momentsForYearUniq.length === 12) {
        disabledYears.push(y);
      }
      checkedYears.push(y);
    }
  }

  return disabledYears;
}

export function getYearView(yearViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, YearViewPropsNames);

  return (
    <YearView
      { ...this.getUnusedProps() }
      { ...yearViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}

export function getMonthView(monthViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, MonthViewPropsNames);

  return (
    <MonthView
      { ...this.getUnusedProps() }
      { ...monthViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}

export function getDayView(dayViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, DayViewPropsNames);

  return (
    <DayView
      { ...this.getUnusedProps() }
      { ...dayViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}

export function getHourView(hourViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, HourViewPropsNames);

  return (
    <HourView
      { ...this.getUnusedProps() }
      { ...hourViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}

export function getMinuteView(minuteViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, MinuteViewPropsNames);

  return (
    <MinuteView
      { ...this.getUnusedProps() }
      { ...minuteViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      localization={ this.props.localization }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}

export function getDatesRangeView(datesRangeViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, DatesRangeViewPropsNames);

  return (
    <DatesRangeView
      { ...this.getUnusedProps() }
      { ...datesRangeViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}

export function getMonthRangeView(monthRangeViewProps): React.ReactElement {
  const sharedProps = extractPropsByNames(this.props, MonthRangeViewPropsNames);

  return (
    <MonthRangeView
      { ...this.getUnusedProps() }
      { ...monthRangeViewProps }
      { ...sharedProps }
      onMount={ this.onCalendarViewMount }
      localization={ this.props.localization }
      onHeaderClick={ this.switchToPrevMode ? this.switchToPrevMode : noop }
      hasHeader={ this.hasHeader }
    />
  );
}
