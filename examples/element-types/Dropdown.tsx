import * as React from 'react';
import { memo, ElementType, useMemo } from 'react';
import { Profiler } from '../../useProfiler';

type Props = {
  Target: ElementType<{ exampleName: string }>;
  cmpName: string;
};

export const Dropdown = memo(({ Target, cmpName }: Props) => {
  return (
    <Profiler id={cmpName}>
      <Target exampleName={'element-type'} />
    </Profiler>
  );
});

export const DropdownWithTarget = ({ i }) => {
  const Target = ({ exampleName }) => (
    <div>
      {exampleName}-{i}
    </div>
  );

  return <Dropdown cmpName="element-types" Target={Target} />;
};

export const DropdownWithTargetMemoized = ({ i }) => {
  const Target = useMemo(
    () =>
      ({ exampleName }) =>
        (
          <div>
            {exampleName}-{i}
          </div>
        ),
    [i]
  );
  return <Dropdown cmpName="element-types-memoized" Target={Target} />;
};
