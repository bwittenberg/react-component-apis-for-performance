import './style.css';

import * as React from 'react';
import { useState } from 'react';
import {
  DropdownWithTarget as RenderPropsWithTarget,
  DropdownWithTargetMemoized as RenderPropsWithTargetMemoized,
} from './examples/render-props/Dropdown';
import {
  DropdownWithTarget as ElementTypeWithTarget,
  DropdownWithTargetMemoized as ElementTypeWithTargetMemoized,
} from './examples/element-types/Dropdown';
import {
  DropdownWithTarget as NodesWithTarget,
  DropdownWithTargetMemoized as NodesWithTargetMemoized,
} from './examples/nodes/Dropdown';
import { ProfilerProvider, useRenderCountLogger } from './useProfiler';

const renderers: Record<
  string,
  React.ComponentProps<typeof PerformanceTest>['renderDropdown']
> = {
  'render-props': ({ index }) => <RenderPropsWithTarget i={index} />,
  'render-props-memoized': ({ index }) => (
    <RenderPropsWithTargetMemoized i={index} />
  ),
  'element-types': ({ index }) => <ElementTypeWithTarget i={index} />,
  'element-types-memoized': ({ index }) => (
    <ElementTypeWithTargetMemoized i={index} />
  ),
  nodes: ({ index }) => <NodesWithTarget i={index} />,
  'nodes-memoized': ({ index }) => <NodesWithTargetMemoized i={index} />,
};

export default function App() {
  return (
    <ProfilerProvider>
      <ProfiledApp />
    </ProfilerProvider>
  );
}

const ProfiledApp = () => {
  const [testName, setTestName] = useState('render-props');
  const [count, setCount] = useState(0);

  useRenderCountLogger();

  return (
    <React.Fragment>
      <select value={testName} onChange={(e) => setTestName(e.target.value)}>
        {Object.keys(renderers).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button onClick={() => setCount((c) => c + 1)}>Rerender</button>
      <div>Render Count = {count}</div>
      <PerformanceTest renderDropdown={renderers[testName]} />
    </React.Fragment>
  );
};

const PerformanceTest = ({
  renderDropdown,
}: {
  renderDropdown: ({ index }: { index: number }) => React.ReactNode;
}) => {
  return (
    <React.Fragment>
      {Array(2000)
        .fill(0)
        .map((_, index) => {
          return renderDropdown({ index });
        })}
    </React.Fragment>
  );
};
