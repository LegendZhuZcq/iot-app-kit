import React from 'react';
import { DialProperties } from './types';
import { ErrorBadge } from '../shared-components';
import { DialSvg } from './dialSvg';
import { DEFAULT_DIAL_SETTINGS } from './constants';

export const DialBase: React.FC<DialProperties> = ({
  propertyPoint,
  alarmPoint,
  error,
  unit,
  name,
  isLoading,
  color,
  settings = {},
}) => {
  const dialSettings = {
    ...DEFAULT_DIAL_SETTINGS,
    ...settings,
  };

  const { yMin, yMax, showName, showUnit } = dialSettings;

  // Primary point to display. Dial Emphasizes the property point over the alarm point.
  const point = propertyPoint || alarmPoint;
  const value = point?.y;
  const label = (propertyPoint != null && alarmPoint != null && alarmPoint.y) || undefined;
  const percent =
    yMin != null && yMax != null && typeof value === 'number' ? (value - yMin) / (yMax / yMin) : undefined;
  return (
    <div>
      {showName && name}
      <DialSvg
        settings={dialSettings}
        value={value?.toString()}
        label={label?.toString()}
        unit={showUnit ? unit : undefined}
        percent={percent}
        isLoading={isLoading}
        color={color}
      />
      {error && <ErrorBadge>{error}</ErrorBadge>}
    </div>
  );
};
