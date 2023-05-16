import { createContext, Dispatch, SetStateAction, memo } from "react";
import useTabs from "@/hooks/useTabs";

export interface ITabsContext {
  lastTab: number;
  setLastTab: Dispatch<SetStateAction<number>>;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  updateTabs: Function;
}

export const TabsContext = createContext<ITabsContext>(null!);

const TabsProvider = memo(function TabsProvider({ children }: { children: JSX.Element }) {
  const { lastTab, setLastTab, currentTab, setCurrentTab, updateTabs } = useTabs();

  return (
    <TabsContext.Provider value={{ lastTab, setLastTab, currentTab, setCurrentTab, updateTabs }}>
      {children}
    </TabsContext.Provider>
  );
});

export { TabsProvider };
