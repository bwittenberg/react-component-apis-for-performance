import * as React from 'react';
import { memo } from 'react';

type Props = {
  Target: React.ElementType;
};

export const Dropdown = memo(({ Target }: Props) => {
  return (
    <div>
      <Target />
    </div>
  );
});
