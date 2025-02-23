import React from 'react';
import './status.css';
import { DEFAULT_STATUS_SETTINGS, DEFAULT_STATUS_COLOR, STATUS_ICON_SHRINK_FACTOR } from './constants';

import { ErrorBadge, LoadingSpinner, StatusIcon, Value } from '../shared-components';
import { StatusProperties } from './types';
import { highContrastColor } from './highContrastColor';
import { DEFAULT_MESSAGE_OVERRIDES } from '../../common/dataTypes';
import { Threshold } from '../../common/thresholdTypes';

export const StatusBase: React.FC<StatusProperties> = ({
  icon,
  error,
  isLoading,
  propertyPoint,
  alarmPoint,
  unit,
  name,
  color = DEFAULT_STATUS_COLOR,
  settings = {},
}) => {
  const { showName, showUnit, showValue, showIcon, fontSize } = {
    ...DEFAULT_STATUS_SETTINGS,
    ...settings,
  };

  // Primary point to display
  const point = alarmPoint || propertyPoint;

  const backgroundColor = color;
  const foregroundColor = highContrastColor(backgroundColor);

  /** Display Settings. We want to dynamically construct the layout dependent on what information is shown */
  const emphasizeValue = !showValue;
  const emphasizeNameAndUnit = showValue && !showName && !showUnit;

  /** If anything is emphasized, then something is emphasized */
  const somethingIsEmphasized = emphasizeValue || emphasizeNameAndUnit;

  const breachedThreshold: Threshold | undefined = undefined;

  return (
    <div
      className='status-widget'
      style={{
        backgroundColor,
        color: foregroundColor,
        justifyContent: somethingIsEmphasized ? 'center' : 'unset',
      }}
    >
      {showName && name}
      {error && <ErrorBadge>{error}</ErrorBadge>}
      {isLoading && <LoadingSpinner size={fontSize} />}

      {!isLoading && breachedThreshold && breachedThreshold.description != null && (
        <div style={{ color: foregroundColor }} className={`description ${emphasizeValue ? 'large center' : ''}`}>
          {breachedThreshold.description}
        </div>
      )}
      {!somethingIsEmphasized && !isLoading && <div className='divider' />}
      {showValue && point && !isLoading && (
        <div className={emphasizeNameAndUnit ? 'center' : ''}>
          {alarmPoint && propertyPoint && (
            <div className='secondary'>
              <span style={{ color: foregroundColor }}>
                {DEFAULT_MESSAGE_OVERRIDES.liveTimeFrameValueLabel}:{' '}
                <Value value={propertyPoint ? propertyPoint.y : undefined} unit={showUnit ? unit : undefined} />
              </span>
            </div>
          )}
          <div className={`value ${emphasizeNameAndUnit ? 'large' : ''}`} style={{ color: foregroundColor }}>
            {showIcon && icon && (
              <>
                <StatusIcon
                  name={icon}
                  size={fontSize * STATUS_ICON_SHRINK_FACTOR}
                  color={highContrastColor(backgroundColor)}
                />
                <div className='spacer' />
              </>
            )}
            <Value value={point ? point.y : undefined} unit={showUnit && alarmPoint == null ? unit : undefined} />
          </div>
        </div>
      )}
    </div>
  );
};
