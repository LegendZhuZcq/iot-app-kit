import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ViewportManager } from '../src/components/viewport-manager';
import { useViewport } from '../src/hooks/useViewport/useViewport';

export default {
  title: 'Viewport manager',
  component: ViewportManager,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ViewportManager>;

const INITIAL_VIEWPORT = { start: new Date(2000, 0, 0), end: new Date(2002, 0, 0) };

const ViewportConsumer = () => {
  const { viewport, setViewport } = useViewport();

  const chooseRandomViewport = () => {
    setViewport({
      start: new Date(new Date(1900, 0, 0).getTime() + 100000 * Math.random()),
      end: new Date(new Date(2000, 0, 0).getTime() + 100000 * Math.random()),
    });
  };

  return (
    <div>
      Current viewport:
      <code>{JSON.stringify(viewport)}</code>
      <button onClick={chooseRandomViewport}>Choose random viewport</button>
    </div>
  );
};

export const Main: ComponentStory<typeof ViewportManager> = () => (
  <ViewportManager group='single-group' initialViewport={INITIAL_VIEWPORT}>
    <ViewportConsumer />
    <ViewportConsumer />
    <ViewportConsumer />
    <ViewportConsumer />
    <ViewportConsumer />
  </ViewportManager>
);

export const MultipleViewportManagers: ComponentStory<typeof ViewportManager> = () => (
  <div>
    <ViewportManager group='group-1' initialViewport={INITIAL_VIEWPORT}>
      <h1>Group 1</h1>
      <ViewportConsumer />
      <ViewportConsumer />
      <ViewportConsumer />
    </ViewportManager>
    <ViewportManager group='group-2' initialViewport={INITIAL_VIEWPORT}>
      <h1>Group 2</h1>
      <ViewportConsumer />
      <ViewportConsumer />
      <ViewportConsumer />
    </ViewportManager>
    <ViewportManager group='group-3' initialViewport={INITIAL_VIEWPORT}>
      <h1>Group 3</h1>
      <ViewportConsumer />
      <ViewportConsumer />
      <ViewportConsumer />
    </ViewportManager>
  </div>
);

export const MultipleViewportManagersSameGroup: ComponentStory<typeof ViewportManager> = () => (
  <div>
    <ViewportManager group='group-1' initialViewport={INITIAL_VIEWPORT}>
      <h1>Group 1</h1>
      <ViewportConsumer />
      <ViewportConsumer />
      <ViewportConsumer />
    </ViewportManager>
    <ViewportManager group='group-1' initialViewport={INITIAL_VIEWPORT}>
      <h1>Group 2</h1>
      <ViewportConsumer />
      <ViewportConsumer />
      <ViewportConsumer />
    </ViewportManager>
    <ViewportManager group='group-1' initialViewport={INITIAL_VIEWPORT}>
      <h1>Group 3</h1>
      <ViewportConsumer />
      <ViewportConsumer />
      <ViewportConsumer />
    </ViewportManager>
  </div>
);
