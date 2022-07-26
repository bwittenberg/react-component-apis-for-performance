import { useRef } from 'react';
import * as React from 'react';

const ProfilerContext = React.createContext<{
  onRender: (id: string) => void;
  renderCounts: Record<string, number>;
  timeoutId: number;
}>(undefined);

export const ProfilerProvider = ({ children }) => {
  const value = useRef({
    timeoutId: undefined,
    renderCounts: {},
    onRender: (id) => {
      if (value.current.renderCounts[id] === undefined) {
        value.current.renderCounts[id] = 1;
      } else {
        value.current.renderCounts[id] += 1;
      }
    },
  });

  return (
    <ProfilerContext.Provider value={value.current}>
      {children}
    </ProfilerContext.Provider>
  );
};

export const Profiler = ({ id, children }) => {
  const value = React.useContext(ProfilerContext);
  return (
    <React.Profiler id={id} onRender={value.onRender}>
      {children}
    </React.Profiler>
  );
};

export const useRenderCountLogger = () => {
  const value = React.useContext(ProfilerContext);
  const startTime = performance.now();
  React.useEffect(() => {
    const totalTime = performance.now() - startTime;
    clearTimeout(value.timeoutId);
    value.timeoutId = setTimeout(() => {
      console.log('Profiler', totalTime, 'counts', value.renderCounts);
    }, 100);
  });
};
