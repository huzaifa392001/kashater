import React, { useState } from "react"
import classes from "./ConfigureLibrary.module.css"
import TabBar from "../../../components/UI/Tabs/Tabs"
import WhatNew from "./WhatNew"
import FeaturedBooks from "./FeaturedBooks"

const ConfigureLibrary = () => {
  //   const { isLoading, success, error, sendRequest } = useApiHttp()
  const [activeTab, setActiveTab] = useState(0)

  const onTabClick = index => {
    setActiveTab(index) // Update the active tab index
  }

  return (
    <>
      <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
        <div className={classes.header_table}>
          <h3>Configure Library</h3>
          <div className={classes.table_set}>
            <TabBar
              tabs={[
                {
                  title: "What’s New",
                  render: () => (
                    <>
                      <WhatNew />
                    </>
                  ),
                },
                {
                  title: "Featured Books for the Month",
                  render: () => (
                    <>
                      <FeaturedBooks />
                    </>
                  ),
                },
              ]}
              onTabClick={onTabClick}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfigureLibrary
