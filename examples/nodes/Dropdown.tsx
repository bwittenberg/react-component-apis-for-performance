import * as React from 'react';
import { memo, ReactElement, useMemo } from 'react';
import { Profiler } from '../../useProfiler';

type Props = {
  target: ReactElement<{ exampleName: string }>;
  cmpName: string;
};

export const Dropdown = memo(({ target, cmpName }: Props) => {
  return (
    <Profiler id={cmpName}>
      {React.cloneElement(target, { exampleName: cmpName })}
    </Profiler>
  );
});

const Target = ({ children }) => <div>{children}</div>;

export const DropdownWithTarget = ({ i }) => {
  return <Dropdown cmpName="nodes" target={<Target>nodes-{i}</Target>} />;
};

export const DropdownWithTargetMemoized = ({ i }) => {
  const Target = ({ exampleName, i }) => (
    <div>
      {exampleName}-{i}
    </div>
  );
  const renderedTarget = useMemo(
    () => <Target exampleName={'overridden'} i={i} />,
    [i]
  );
  return <Dropdown cmpName="nodes-memoized" target={renderedTarget} />;
};
