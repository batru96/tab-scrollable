import { Box } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { styled } from "@mui/system";
import Tab from "./components/Tab";
import TabListComponent from "./components/TabListComponent";
import TabPanel from "./components/TabPanel";

const Container = styled(Box)({
});

function generateTabs() {
  const tabs = [];

  for (let i = 0; i < 10; i++) {
    tabs.push({ id: i, name: "Tab " + i });
  }
  return tabs;
}

function App() {
  const [tabIndex, setTabIndex] = useState(0)
  const tabs = generateTabs()

  return (
    <Container className="App">
      <TabListComponent currentTabIndex={tabIndex}>
        {tabs.map((item, index) => (
          <Tab
            style={{
              background: index === tabIndex ? "lightblue" : "inherit",
            }}
            onClick={() => setTabIndex(index)}
            key={item.id}
          >
            {item.name}
          </Tab>
        ))}
      </TabListComponent>
      {
        tabs.map((item, index) => (
          <TabPanel index={index} value={tabIndex}>{item.name}</TabPanel>
        ))
      }
    </Container>
  );
}

export default App;
