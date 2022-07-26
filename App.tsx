import * as React from 'react';
import { useState } from 'react';
import { Dropdown } from './examples/element-types/Dropdown';
import { Dropdown as Node } from './examples/nodes/Dropdown';
import { Dropdown as RenderProps } from './examples/render-props/Dropdown';
import './style.css';

const Target = () => <div>Element Type</div>;

const renderers = {
  'render-props': () => <RenderProps target={() => <div>render-props</div>} />,
  node: () => <Node target={<div>node</div>} />,
  'element-type': () => <Dropdown Target={Target} />,
};

export default function App() {
  const [testName, setTestName] = useState('render-props');
  const { count, rerender } = useForceRerender();

  useRenderTimer('App');

  return (
    <div>
      <select value={testName} onChange={(e) => setTestName(e.target.value)}>
        {Object.keys(renderers).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div onClick={rerender}>Rerender {count}</div>
      <PerformanceTest renderDropdown={renderers[testName]} />
    </div>
  );
}

const useForceRerender = () => {
  const [count, setCount] = useState(0);
  const rerender = () => {
    setCount((count) => count + 1);
  };
  return { count, rerender };
};

const useRenderTimer = (message: string) => {
  const startTime = performance.now();
  React.useEffect(() => {
    console.log(message, performance.now() - startTime);
  }, [startTime]);
};

const PerformanceTest = ({
  renderDropdown,
}: {
  renderDropdown: () => React.ReactNode;
}) => {
  return (
    <React.Fragment>
      {Array(2000)
        .fill(0)
        .map((v, k) => {
          return renderDropdown();
        })}
    </React.Fragment>
  );
};
