import { useState } from "react"

export default function useTabs() {

    const [lastTab, setLastTab] = useState<number>(0);
    const [currentTab, setCurrentTab] = useState<number>(0);

    const updateTabs = (i: number) => {
        setLastTab(currentTab)
        setCurrentTab(i)
    }

    return {
        lastTab,
        setLastTab,
        currentTab,
        setCurrentTab,
        updateTabs
    }

}
