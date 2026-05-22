import React, { useState } from "react"
import styled from "styled-components"
// import { Tooltip, TooltipProvider } from "react-tooltip"
// import { scrollToBottom } from "../../../services/storeSlice/scrollResetSlice"
// import { useDispatch } from "react-redux"
import classes from "./Tabs.module.css"
import SearchBar from "../Search/Search"

const TabContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 44px;
  border-radius: 1px;
  overflow-x: scroll;
  margin: 0px 0;
  margin-bottom: 1rem;
  gap: 0.5rem;
background: #2a2d33;

  border-radius: 72px;
  padding: 8px;
  backdrop-filter: blur(16px)
  &::-webkit-scrollbar {
    display: none;
  }
`

const TabButton = React.memo(styled.button`
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
  background: ${props => (props.active ? "#616468" : "transparent")};
  border-radius: 72px;

  &:focus {
    outline: none;
  }
`)

const Title = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin: 0px 7px;
  font-size: 13px;
  font-family: ${props =>
    props.active ? "var(--font-semibold)" : "var(--font-regular)"};
  color: ${props => (props.active ? "#FFFFFF" : "#FFFFFF")};
  transition: 0.2s;
`

export default function TabBar({
  tabs,
  onTabClick,
  activeTab,
  searchVlue,
  setSearchVlue,
  maxWidth = "100%",
  type,
  placeholder,
  page = false,
}) {
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
        {page === "myorder" ? (
          <>
            {type === "serch" && activeTab !== 1 && (
              <div className={classes.filters}>
                <SearchBar
                  placeholder={placeholder}
                  value={searchVlue}
                  onSearchChange={value => setSearchVlue(value)}
                  maxWidth={maxWidth}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {type === "serch" && (
              <div className={classes.filters}>
                <SearchBar
                  placeholder={placeholder}
                  value={searchVlue}
                  onSearchChange={value => setSearchVlue(value)}
                  maxWidth={maxWidth}
                />
              </div>
            )}
          </>
        )}
      </div>
      {tabs[activeTab].render()}
    </>
  )
}
