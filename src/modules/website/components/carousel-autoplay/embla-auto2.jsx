import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./embla-carousel-autoplay";
import { DotButton, useDotButton } from "./embla-dot-button";
import "./embla-auto2.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla-arrow-button";
// import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";
// import {
//   NextButton,
//   PrevButton,
//   usePrevNextButtons,
// } from "./EmblaCarouselArrowButtons";

const EmblaCarouselAuto2 = (props) => {
  const { slides, options, children, setCarouselIndex } = props;
  const progressNode = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);
  const currentIndex = emblaApi?.selectedScrollSnap();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, onAutoplayButtonClick, toggleAutoPlay } =
    useAutoplay(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  useEffect(() => {
    if (currentIndex !== null) {
      setCarouselIndex(currentIndex);
    }
  }, [currentIndex]);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    function toggleDragging() {
      if (emblaApi) {
        emblaApi.reInit({ draggable: mediaQuery.matches });
      }
    }

    toggleDragging(); // Initial check
    mediaQuery.addEventListener("change", toggleDragging);

    return () => mediaQuery.removeEventListener("change", toggleDragging);
  }, [emblaApi]);
  return (
    <div className="embla__auto">
      <div className="embla__auto__viewport" ref={emblaRef}>
        <div className="embla__auto__container">{children}</div>
      </div>

      <div className="embla__auto__controls">
        <div className="embla__auto__buttons">
          <PrevButton
            onClick={() => {
              onAutoplayButtonClick(onPrevButtonClick);
            }}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => {
              onAutoplayButtonClick(onNextButtonClick);
            }}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className="embla__auto__dots"
          onClick={() => console.log("Dots clicked")}
        >
          {/* <button onClick={() => console.log("Hello")}>heelo</button> */}
          {scrollSnaps.map((_, index) => {
            return (
              <DotButton
                key={index}
                className={`embla__auto__dot ${selectedIndex === index ? "embla__auto__dot--selected" : ""
                  }`}
                onClick={() => {
                  emblaApi.scrollTo(index);
                  // toggleAutoPlay();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselAuto2;
