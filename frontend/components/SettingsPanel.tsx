import React from 'react';
import useHarnessSettingsStore from '../store/useHarnessSettingsStore';

const SettingsPanel = () => {
  const { globalServiceLoopLength, globalTwistPitch, setGlobalServiceLoopLength, setGlobalTwistPitch } = useHarnessSettingsStore();

  return (
    <div className="settings-panel">
      <h3>Harness Settings</h3>
      <div>
        <label htmlFor="globalServiceLoop">Global Service Loop (mm)</label>
        <input
          type="number"
          id="globalServiceLoop"
          name="globalServiceLoop"
          value={globalServiceLoopLength}
          onChange={(e) => setGlobalServiceLoopLength(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="globalTwistPitch">Global Twist Pitch (mm)</label>
        <input
          type="number"
          id="globalTwistPitch"
          name="globalTwistPitch"
          value={globalTwistPitch}
          onChange={(e) => setGlobalTwistPitch(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
