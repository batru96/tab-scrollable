import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import ScrollButton from "./ScrollButton";

const TabList = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Scrollbar = styled("div")({
  display: "flex",
  overflowX: "auto",
  justifyContent: "flex-start",
  scrollbarWidth: "none",
});

const scrollSize = 100;

function TabListComponent({ currentTabIndex, children }) {
  const [showStartButton, setShowStartButton] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  const [scrollable, setScrollable] = useState(true);

  const tabListRef = useRef(null);
  const scrollbarRef = useRef(null);

  const scroll = useCallback((value) => {
    scrollbarRef.current.scroll({
      left: value,
      behavior: "smooth",
    });
  }, []);

  const previous = () => {
    scroll(scrollbarRef.current.scrollLeft - scrollSize);
  };

  const next = () => {
    scroll(scrollbarRef.current.scrollLeft + scrollSize);
  };

  useEffect(() => {
    // This useEffect for scroll to tab
    if (scrollbarRef.current) {
      const selectedElem = scrollbarRef.current.children[currentTabIndex];
      if (selectedElem) {
        scroll(
          selectedElem.offsetLeft - scrollbarRef.current.offsetLeft - scrollSize
        );
      }
    }
  }, [currentTabIndex, scroll]);

  useEffect(() => {
    const firstTab = scrollbarRef.current.children[0];
    const lastTab =
      scrollbarRef.current.children[scrollbarRef.current.children.length - 1];

    const option = {
      root: scrollbarRef.current,
      threshold: 0.99,
    };

    const firstObserver = new IntersectionObserver((entries) => {
      setShowStartButton(!entries[0].isIntersecting);
    }, option);

    const lastObserver = new IntersectionObserver((entries) => {
      setShowEndButton(!entries[0].isIntersecting);
    }, option);

    firstObserver.observe(firstTab);
    lastObserver.observe(lastTab);

    return () => {
      firstObserver.disconnect();
      lastObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onResize = (event) => {
      if (scrollbarRef.current) {
        const { clientWidth, scrollWidth } = scrollbarRef.current;
        setScrollable(clientWidth < scrollWidth);
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <TabList ref={tabListRef}>
      {scrollable && (
        <ScrollButton onClick={previous} isShow={showStartButton} />
      )}
      <Scrollbar ref={scrollbarRef}>{children}</Scrollbar>
      {scrollable && (
        <ScrollButton onClick={next} isShow={showEndButton} right />
      )}
    </TabList>
  );
}

export default TabListComponent;
