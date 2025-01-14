import React, { FC } from 'react';
import { Header, SpaceBetween } from '@cloudscape-design/components';
import { useSelector } from 'react-redux';
import { DashboardState } from '~/store/state';
import { DashboardMessages } from '~/messages';
import { AppKitComponentTags } from '~/types';
import TextSettings from './sections/textSettingSection/text';
import LinkSettings from './sections/textSettingSection/link';
import InputSettings from './sections/inputSettingsSection';
import { BaseSettings } from './sections/baseSettingSection';
import AxisSetting from './sections/axisSettingSection';
import ThresholdsSection from './sections/thresholdsSection/thresholdsSection';
import PropertiesAlarmsSection from './sections/propertiesAlarmSection';
import './index.scss';
const SidePanel: FC<{ messageOverrides: DashboardMessages }> = ({ messageOverrides }) => {
  const selectedWidgets = useSelector((state: DashboardState) => state.selectedWidgets);
  if (selectedWidgets.length !== 1) {
    return <div className='iot-side-panel'>{messageOverrides.sidePanel.defaultMessage}</div>;
  }

  const selectedWidget = selectedWidgets[0];
  const isAppKitWidget = AppKitComponentTags.find((tag) => tag === selectedWidget.componentTag);
  const isTextWidget = selectedWidget.componentTag === 'text';
  const isInputWidget = selectedWidget.componentTag === 'input';

  return (
    <div className='iot-side-panel'>
      <Header variant='h3'>{messageOverrides.sidePanel.header}</Header>
      <SpaceBetween size='xs' direction='vertical'>
        <BaseSettings messageOverrides={messageOverrides} />
        {isTextWidget && <TextSettings messageOverride={messageOverrides} />}
        {isTextWidget && <LinkSettings messageOverride={messageOverrides} />}
        {isInputWidget && <InputSettings messageOverride={messageOverrides} />}
        {isAppKitWidget && (
          <>
            <PropertiesAlarmsSection messageOverrides={messageOverrides} />
            <ThresholdsSection messageOverrides={messageOverrides} />
            <AxisSetting messageOverrides={messageOverrides} />
          </>
        )}
      </SpaceBetween>
    </div>
  );
};

export default SidePanel;
