import React, { useState } from "react"
import styled from "styled-components"
import useIsMobile from "../../../hooks/useIsMobile"

// const TabContainer = styled.section`
//   display: flex;
//   flex-direction: ${props => (props.isTablet ? "row" : "column")};
//   width: 100%;
//   border-radius: 1px;
//   overflow-x: scroll;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `

const TabContainer = styled.section`
  display: flex;
  flex-direction: ${props => (props.isTablet ? "row" : "column")};
  width: 100%;
  border-radius: 1px;
  overflow-x: auto; /* enable scroll if needed */
  scrollbar-width: thin; /* for Firefox */
  scrollbar-color: #6283d4 transparent; /* for Firefox */

  /* Show scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6283d4;
    border-radius: 100px;
  }
`

const TabButton = styled.button`
  width: ${props => (!props.isTablet ? "208px" : "167px")};
  min-width: ${props => (!props.isTablet ? "170px" : "134px")};
  height: 50px;
  padding: 10px;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  align-items: center;
  position: relative;
  background: ${props => (props.active ? "#FFFFFF29" : "transparent")};
  backdrop-filter: blur(16px);

  border: none;
  border-right: ${props =>
    !props.isTablet && props.active ? "3px solid #E4D905" : "none"};
  border-bottom: ${props =>
    props.isTablet && props.active ? "3px solid #E4D905" : "none"};

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
  font-family: ${props =>
    props.active ? "var(--font-bold)" : "var(--font-Medium)"};
  font-size: 14px;
  color: ${props => (props.active ? "#FFFFFF" : "#FFFFFFDE")};
  transition: 0.2s;
  gap: 1rem;
`
const MsgBox = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  font-family: ${props =>
    props.active ? "var(--font-bold)" : "var(--font-Medium)"};
  font-size: 14px;
  color: ${props => (props.active ? "#FFFFFFDE" : "#FFFFFF")};
  transition: 0.2s;
  padding: 5px 8px;
  background: ${props => (props.active ? "#FFFFFF" : "#FFFFFFDE")};
  border-radius: 4px;
`

export default function TabBarWithRender({
  tabs,
  onTabClick,
  activeTab,
  msg,
  count,
}) {
  // const [activeTab, setActiveTab] = useState(0);
  const isLaptap = useIsMobile(1024)
  const isTablet = useIsMobile(768)
  const isMobile = useIsMobile(500)

  const handleTabClick = index => {
    // setActiveTab(index);
    onTabClick(index) // Call the callback function with the clicked tab index
  }

  return (
    <>
      <TabContainer isTablet={isTablet}>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
            isTablet={isTablet}
          >
            <Title active={activeTab === index}>
              {tab.title}
              {tab.msg === "true" && (
                <MsgBox active={activeTab === index}>{tab.count}</MsgBox>
              )}
            </Title>
          </TabButton>
        ))}
      </TabContainer>
      {tabs[activeTab].render()}
    </>
  )
}
