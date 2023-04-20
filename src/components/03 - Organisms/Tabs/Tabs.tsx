import { ReactNode, useContext, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { TabsContext } from '@/contexts/TabsContext'
import './Tabs.scss'
import { useLocation, useNavigate } from 'react-router-dom'


export interface ITabs {
    tabs: Array<ITabsParameters>
    id?: String
    anchorNavigation?: Boolean
}

export interface ITabsParameters {
    tabTitle: String
    tabContent: ReactNode
    anchor?: String
}

export default function Tabs({
    tabs,
    id = '',
    anchorNavigation = false
}: ITabs) {

    const location = useLocation()
    const navigate = useNavigate()
    const { currentTab, updateTabs } = useContext(TabsContext)
    const animationControls = useAnimation();

    async function sequence() {
        await animationControls.start({
            y: 10,
            opacity: 0,
        })
    }

    useEffect(() => {
        tabs.forEach((tab, i) => {
            if (tab.anchor === location.hash) {
                updateTabs(i)
            }
        })
    }, [location])

    return (

        <div className='tabs'>
            <div className='tabs__choice'>

                {tabs.map((tab, i) =>
                    <button
                        className={`tabs__choice__item w-${tabs.length} ${currentTab == i ? 'active' : ''}`}
                        type='button'
                        key={`tabBtn-${i}-${id}`}
                        onClick={() => anchorNavigation ? navigate(location.pathname + tab.anchor) : updateTabs(i)}
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
