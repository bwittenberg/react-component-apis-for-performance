import { useRef } from 'react';
import * as React from 'react';

type ProfilerContextType = {
  onRender: React.ComponentProps<typeof React.Profiler>['onRender'];
  renderCounts: Record<string, number>;
  renderTimes: Record<string, number[]>;
  timeoutId: number | undefined;
};

const ProfilerContext = React.createContext<ProfilerContextType>(undefined);

export const ProfilerProvider = ({ children }) => {
  const value = useRef<ProfilerContextType>({
    timeoutId: undefined,
    renderCounts: {},
    renderTimes: {},
    onRender: (id, phase, actualDuration) => {
      if (value.current.renderCounts[id] === undefined) {
        value.current.renderTimes[id] = [actualDuration];
        value.current.renderCounts[id] = 1;
      } else {
        value.current.renderCounts[id] += 1;
        value.current.renderTimes[id].push(actualDuration);
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

export const useProfilerLogger = () => {
  const value = React.useContext(ProfilerContext);
  React.useEffect(() => {
    clearTimeout(value.timeoutId);
    value.timeoutId = setTimeout(() => {
      const data = Object.entries(value.renderTimes).map(([key, v]) => ({
        name: key,
        avg: v.reduce((acc, v) => acc + v, 0) / v.length,
        renderCount: value.renderCounts[key],
      }));
      console.table(data.concat({ name: 'spacer' }));
    }, 100);
  });
};
