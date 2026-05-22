import React, { act, useState } from "react"
import classes from "./MyOrders.module.css"
import SearchBar from "../../components/UI/Search/Search"
import TabBarWithRender from "../../components/UI/Tabs/Tabs"
import MyOrdersSet from "./MyOrdersSet/MyOrdersSet"
import MyRequests from "./MyRequests/MyRequests"

const MyOrders = () => {
  const [searchVlue, setSearchVlue] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const [myOrderCount, setMyOrderCount] = useState(0)

  const onTabClick = index => {
    console.log(activeTab, index)

    if (activeTab !== index) {
      setSearchVlue("")
    } // Reset search value when switching tabs
    setActiveTab(index) // Update the active tab index
  }

  return (
    <div className={classes.containerrrr}>
      <h1 className={classes.heading}>My Orders</h1>
      <p className={classes.sub_heading}>{myOrderCount} Items</p>
      <div className={classes.table_set}>
        <TabBarWithRender
          tabs={[
            {
              title: "My Orders",
              render: () => (
                <>
                  <MyOrdersSet
                    searchVlue={searchVlue}
                    setMyOrderCount={setMyOrderCount}
                  />
                </>
              ),
            },
            {
              title: "My Requests",
              render: () => (
                <>
                  <MyRequests searchValue={searchVlue} />
                </>
              ),
            },
          ]}
          onTabClick={onTabClick}
          activeTab={activeTab}
          searchVlue={searchVlue}
          setSearchVlue={setSearchVlue}
          type="serch"
          page="myorder"
          placeholder="Search for orders..."
        />
      </div>
    </div>
  )
}

export default MyOrders
