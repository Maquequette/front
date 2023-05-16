import { useCallback, useState } from "react";

export default function useTabs() {
  const [lastTab, setLastTab] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const updateTabs = useCallback(
    (i: number) => {
      setLastTab(currentTab);
      setCurrentTab(i);
    },
    [currentTab]
  );

  return {
    lastTab,
    setLastTab,
    currentTab,
    setCurrentTab,
    updateTabs
  };
}
