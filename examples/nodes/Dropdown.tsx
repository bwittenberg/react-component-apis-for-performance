import * as React from 'react';
import { memo } from 'react';

type Props = {
  target: React.ReactNode;
};

export const Dropdown = memo(({ target }: Props) => {
  return <div>{target}</div>;
});
