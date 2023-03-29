import { ReactNode, useContext } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { TabsProvider, TabsContext } from '@/contexts/TabsContext'
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

    const { currentTab, updateTabs } = useContext(TabsContext)

    const animationControls = useAnimation();

    async function sequence() {
        await animationControls.start({
            y: 10,
            opacity: 0,
        })
    }

    return (

        <div className='tabs'>
            <div className='tabs__choice'>

                {tabs.map((tab, i) =>
                    <button
                        className={`tabs__choice__item w-${tabs.length} ${currentTab == i ? 'active' : ''}`}
                        type='button'
                        key={`tabBtn-${i}-${id}`}
                        onClick={() => updateTabs(i)}
                    >
                        {tab.tabTitle}
                    </button>
                )}

            </div>

            <div className='tabs__content'>

                <AnimatePresence mode='wait'>
                    <motion.div
                        className='full'
                        key={`tabContent-${currentTab}-${id}`}
                        initial={{ y: 10, opacity: 0, height: '100px', overflow: 'hidden' }}
                        animate={{ y: 0, opacity: 1, height: 'auto', transitionEnd: { overflow: 'initial' } }}
                        exit={{ y: -5, opacity: 0, height: '100px', overflow: 'hidden' }}
                        transition={{ duration: 0.3 }}

                    >
                        {tabs[currentTab].tabContent}
                    </motion.div>
                </AnimatePresence>

            </div>
        </div >
    )
}
