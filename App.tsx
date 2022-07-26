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

const renderers = {
  'render-props': ({ i }) => <RenderPropsWithTarget i={i} />,
  'render-props-memoized': ({ i }) => <RenderPropsWithTargetMemoized i={i} />,
  'element-types': ({ i }) => <ElementTypeWithTarget i={i} />,
  'element-types-memoized': ({ i }) => <ElementTypeWithTargetMemoized i={i} />,
  nodes: ({ i }) => <NodesWithTarget i={i} />,
  'nodes-memoized': ({ i }) => <NodesWithTargetMemoized i={i} />,
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
  const { count, rerender } = useForceRerender();

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
      <div onClick={rerender}>Rerender {count}</div>
      <PerformanceTest renderDropdown={renderers[testName]} />
    </React.Fragment>
  );
};

const useForceRerender = () => {
  const [count, setCount] = useState(0);
  const rerender = () => {
    setCount((count) => count + 1);
  };
  return { count, rerender };
};

const PerformanceTest = ({
  renderDropdown,
}: {
  renderDropdown: ({ i }: { i: number }) => React.ReactNode;
}) => {
  return (
    <React.Fragment>
      {Array(4000)
        .fill(0)
        .map((i, k) => {
          return renderDropdown({ i: k });
        })}
    </React.Fragment>
  );
};
