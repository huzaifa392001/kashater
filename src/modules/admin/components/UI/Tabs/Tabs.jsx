import React, { useState } from "react"
import styled from "styled-components"
// import { Tooltip, TooltipProvider } from "react-tooltip"
// import { scrollToBottom } from "../../../services/storeSlice/scrollResetSlice"
// import { useDispatch } from "react-redux"
import classes from "./Tabs.module.css"

const TabContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 44px;
  border-radius: 1px;
  overflow-x: scroll;
  margin: 0px 0;
  margin-bottom: 1rem;
  gap: 0.9rem;
  border-bottom: 1px solid #e8e8e8;
  &::-webkit-scrollbar {
    display: none;
  }
`

const TabButton = styled.button`
  height: 100%;
  outline: none;
  cursor: pointer;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  border: none;
  font-size: 14px;
  align-items: center;
  position: relative;
  background: transparent;
  padding: 0;
  border-bottom: ${props =>
    props.active ? "3px solid rgba(243, 193, 29, 1)" : "3px solid transparent"};
  &:focus {
    outline: none;
  }
`

const Title = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin: 0px 7px;
  font-size: 14px;
  font-family: ${props =>
    props.active ? "var(--font-semibold)" : "var(--font-regular)"};
  color: ${props => (props.active ? "rgba(1, 5, 12, 1)" : "#000")};
  transition: 0.2s;
`

export default function TabBar({ tabs = [], onTabClick, activeTab = 0 }) {
  // const [tooltipContent, setTooltipContent] = useState("") // Track tooltip content
  // const dispatch = useDispatch()
  const handleTabClick = index => {
    onTabClick(index) // Call the callback function with the clicked tab index
  }

  // const handleMouseEnter = title => {
  //   // Only update tooltip if needed to prevent excessive re-renders
  //   if (title === "All Dealer Orders") {
  //     setTooltipContent(
  //       "Browse products from all dealer orders, sorted by most recent first"
  //     )
  //   } else {
  //     setTooltipContent("")
  //   }
  // }

  return (
    <>
      <div className={classes.main_tab}>
        <TabContainer>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={activeTab === index}
              onClick={() => handleTabClick(index)}
            // onMouseEnter={() => handleMouseEnter(tab.title)}
            // data-tooltip-id="tab-tooltip"
            >
              <Title active={activeTab === index}>{tab.title}</Title>
            </TabButton>
          ))}
          {/* Tooltip updates based on the tooltipContent state */}
          {/* <Tooltip id="tab-tooltip" content={tooltipContent} /> */}
        </TabContainer>
      </div>
      {tabs?.[activeTab]?.render?.()}
    </>
  )
}
