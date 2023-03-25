import React, { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Tabs.scss'

export interface ITabs {
    tabs: Array<ITabsParameters>
    id?: String
}

export interface ITabsParameters {
    tabTitle: String
    tabContent: ReactNode
}

export default function Tabs({
    tabs,
    id = '',
}: ITabs) {

    const [lastTab, setLastTab] = useState<number>(0);
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div className='tabs'>
            <div className='tabs__choice'>

                {tabs.map((tab, i) =>
                    <button
                        className={`tabs__choice__item w-${tabs.length} ${currentTab == i ? 'active' : ''}`}
                        type='button'
                        key={`tabBtn-${i}-${id}`}
                        onClick={() => {
                            setLastTab(currentTab)
                            setCurrentTab(i)
                        }}
                    >
                        {tab.tabTitle}
                    </button>
                )}

            </div>

            <div className='tabs__content'>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`tabContent-${currentTab}-${id}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tabs[currentTab].tabContent}
                    </motion.div>
                </AnimatePresence>

            </div>
        </div >
    )
}
