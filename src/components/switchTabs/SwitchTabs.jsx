import React, { useEffect, useState } from 'react'
import "./style.scss";
const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        if (window.innerWidth < 640) {
            setLeft(index * 75);
        } else {
            setLeft(index * 100);
        }
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab, index);
    }
    // console.log(left)
    useEffect(() => {
        if (window.innerWidth < 640) {
            setLeft(left * 75);
        } else {
            setLeft(left * 100);
        }
    }, [window.innerWidth])
    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {
                    data.map((tab, index) => {
                        return <span
                            key={index}
                            className={`tabItem ${selectedTab === index ? "active" : ""}`}
                            onClick={() => activeTab(tab, index)}
                        >
                            {tab}
                        </span>
                    })
                }
                <span className='movingBg' style={{ left }} />
            </div>
        </div>
    )
}

export default SwitchTabs