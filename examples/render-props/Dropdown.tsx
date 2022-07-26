import * as React from 'react';
import { memo } from 'react';

type Props = {
  target: () => React.ReactNode;
};

export const Dropdown = memo(({ target }: Props) => {
  return <div>{target()}</div>;
});

export const BoundDropdown = memo((i) => {
  const target = () => <div>render-props {i}</div>;
  return <Dropdown target={target} />;
});
