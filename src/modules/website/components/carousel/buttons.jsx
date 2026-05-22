import React, { useCallback, useEffect, useState } from "react";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <svg
        className="embla__button__svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: "rotate(-180deg)" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.84769 2.44576C9.04772 2.24579 9.31898 2.13345 9.60182 2.13345C9.88467 2.13345 10.1559 2.24579 10.356 2.44576L15.156 7.24576C15.3559 7.44579 15.4683 7.71705 15.4683 7.99989C15.4683 8.28273 15.3559 8.554 15.156 8.75403L10.356 13.554C10.1548 13.7483 9.88534 13.8558 9.60566 13.8534C9.32599 13.851 9.05845 13.7388 8.86068 13.541C8.66291 13.3433 8.55073 13.0757 8.5483 12.7961C8.54587 12.5164 8.65339 12.2469 8.84769 12.0458L11.7352 9.06656H1.60182C1.31893 9.06656 1.04761 8.95418 0.847576 8.75414C0.647537 8.5541 0.535156 8.28279 0.535156 7.99989C0.535156 7.71699 0.647537 7.44568 0.847576 7.24565C1.04761 7.04561 1.31893 6.93323 1.60182 6.93323H11.7352L8.84769 3.95403C8.64772 3.754 8.53538 3.48273 8.53538 3.19989C8.53538 2.91705 8.64772 2.64579 8.84769 2.44576Z"
          fill="white"
        />
      </svg>

      {children}
    </button>
  );
};

export const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      {...restProps}
    >
      <svg
        className="embla__button__svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.84769 2.44576C9.04772 2.24579 9.31898 2.13345 9.60182 2.13345C9.88467 2.13345 10.1559 2.24579 10.356 2.44576L15.156 7.24576C15.3559 7.44579 15.4683 7.71705 15.4683 7.99989C15.4683 8.28273 15.3559 8.554 15.156 8.75403L10.356 13.554C10.1548 13.7483 9.88534 13.8558 9.60566 13.8534C9.32599 13.851 9.05845 13.7388 8.86068 13.541C8.66291 13.3433 8.55073 13.0757 8.5483 12.7961C8.54587 12.5164 8.65339 12.2469 8.84769 12.0458L11.7352 9.06656H1.60182C1.31893 9.06656 1.04761 8.95418 0.847576 8.75414C0.647537 8.5541 0.535156 8.28279 0.535156 7.99989C0.535156 7.71699 0.647537 7.44568 0.847576 7.24565C1.04761 7.04561 1.31893 6.93323 1.60182 6.93323H11.7352L8.84769 3.95403C8.64772 3.754 8.53538 3.48273 8.53538 3.19989C8.53538 2.91705 8.64772 2.64579 8.84769 2.44576Z"
          fill="white"
        />
      </svg>
      {children}
    </button>
  );
};
