import React, { useRef, useState } from 'react'
import './TabsC.scss'
export default function TabsC(props: { tabs: any[],onTabChange?: any }) {
    const tabs = props.tabs;
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [delayActiveTabIndex, setDelayActiveTabIndex] = useState(0)

    const tabsRef = useRef(null as unknown as HTMLDivElement);

    const Body = tabs[activeTabIndex].body


    function preSetIndex(i: number) {
        setActiveTabIndex(i);
        if(props.onTabChange){
            props.onTabChange(i)
        }
        //animate__animated animate__bounce
        const prev = tabsRef.current.querySelector('.each-tab-active-border')
        prev?.classList.add('animate__animated')
        prev?.classList.add('animate__fadeOut')

  
            setDelayActiveTabIndex(i);
            setTimeout(() => {
                // @ts-ignore
                prev.className = '';

                const curr = tabsRef.current.querySelector('.each-tab-active-border')
                curr?.classList.add('animate__animated')
                curr?.classList.add('animate__fadeIn')

                setTimeout(() => {
                    // @ts-ignore
                    curr.className = 'each-tab-active-border';
                }, 400)


            }, 10)
  

    }

    return (
        <div ref={tabsRef} className='Tabs'>
            <div className='tabs-nav-container'>
                {tabs.map((tab, i) => {
                    return (<div onClick={() => preSetIndex(i)} className={'each-tab ' + (activeTabIndex == i ? ' text-primary each-tab-active ' : ' text-muted')}>

                        <div className='content'>{tab.title}</div>

                        <div className={delayActiveTabIndex == i ? 'each-tab-active-border' : ''}></div>
                    </div>

                    )
                })}

            </div>
<br />
<br />
            <div style={{textAlign:'left'}}>
                <Body />
            </div>
        </div>

    )
}