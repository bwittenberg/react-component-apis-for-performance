import * as React from 'react';
import { memo, useMemo } from 'react';
import { Profiler } from '../../useProfiler';

type Props = {
  target: ({ exampleName }: { exampleName: string }) => React.ReactNode;
  cmpName: string;
};

export const Dropdown = memo(({ target, cmpName }: Props) => {
  return (
    <Profiler id={cmpName}>
      <div>{target({ exampleName: 'render-props' })}</div>
    </Profiler>
  );
});

export const DropdownWithTarget = ({ i }) => {
  const target = ({ exampleName }) => (
    <div>
      {exampleName}-{i}
    </div>
  );
  return <Dropdown cmpName="render-props" target={target} />;
};

export const DropdownWithTargetMemoized = ({ i }) => {
  const target = useMemo(
    () =>
      ({ exampleName }) =>
        (
          <div>
            {exampleName}-{i}
          </div>
        ),
    [i]
  );
  return <Dropdown cmpName="render-props-memoized" target={target} />;
};
