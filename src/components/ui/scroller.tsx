"use client";
import React, { useState, useRef } from "react";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";
// Define a type for the testimonial structure
type Testimonial = {
  image: string;
  testName: string;
  testCompany: string;
  title: string;
  body: string;
};

const Scroller: React.FC = () => {
const [middleCard, setMiddleCard] = useState<number>(0); // always center
const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCircleClick = (index: number) => {
    if (containerRef.current) {
      const cardWidth = 360;
      const newScrollPosition = index * cardWidth;
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrevClick = () => {
    if (middleCard > 0) {
      handleCircleClick(middleCard - 1);
    }
  };

  const handleNextClick = () => {
    if (middleCard < testimonials.length - 1) {
      handleCircleClick(middleCard + 1);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const containerMidpoint =
      container.scrollLeft + container.offsetWidth / 2 - 360;

    let closestDistance = Infinity;
    let middleIndex = 0;

    testimonials.forEach((_, index) => {
      const cardWidth = 360;
      const cardStart = index * cardWidth;
      const cardMidpoint = cardStart + cardWidth / 2;
      const distanceToMid = Math.abs(cardMidpoint - containerMidpoint);

      if (distanceToMid < closestDistance) {
        closestDistance = distanceToMid;
        middleIndex = index;
      }
    });

    setMiddleCard(middleIndex);
  };

  return (
    <div className="flex justify-center" data-aos="fade-up">
      <div className="relative transition-all duration-100">
        <div
          ref={containerRef}
          className="relative overflow-x-scroll w-screen lg:w-[1080px] gap-0 bg-none rounded-lg flex px-[360px] py-10"
          id="scroller-card container"
          onScroll={handleScroll}
        >
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <div
              key={index}
              className="w-[360px] flex-shrink-0 rounded-lg text-black flex flex-col items-center justify-center p-0"
              id="scroller-card holder"
            >
              <div
                className={`${
                  index === middleCard
                    ? "w-[360px] h-[280px] p-4"
                    : "w-[270px] h-[200px] items-center p-3"
                } bg-white rounded-[10px] flex flex-col justify-start shadow-2xl`}
                aria-label="scroller-card"
              >
                <div className="flex flex-row mb-2 w-full mt-2 gap-4">
                  <img
                    src={testimonial.image}
                    className={`${
                      index === middleCard
                        ? "h-[80px] w-[80px]"
                        : "h-[60px] w-[60px]"
                    } rounded-full object-cover`}
                    alt={testimonial.testName}
                  />

                  <div>
                    {/* Name and Company */}
                    <div className="flex flex-col" aria-label="top-text-holder">
                      <p
                        className={`flex font-bold ${
                          index === middleCard ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {testimonial.testName}
                      </p>
                      <p
                        className={`${
                          index === middleCard ? "text-sm" : "text-xs"
                        } whitespace-nowrap`}
                      >
                        {testimonial.testCompany} - {testimonial.title}
                      </p>
                    </div>

                    {/* Stars */}
                    <div className="flex mt-2">
                    <div className="flex" aria-label="star-holder">
                        {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                    </div>

                  </div>
                </div>

                <div
                  className="flex flex-col items-center w-full mt-2"
                  aria-label="bottom-row"
                >
                  <p className={index === middleCard ? "" : "text-[13px]"}>
                    {testimonial.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          type="button"
          className="absolute top-1/2 transform -translate-y-1/2 left-0 z-5 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrevClick}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-100 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          className="absolute top-1/2 transform -translate-y-1/2 right-0 z-5 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNextClick}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-100 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>

        {/* Circle Indicators */}
        <div className="flex justify-center gap-6 mt-4 mb-8" aria-label="indicator">
        {testimonials.map((_, index) => (
            <div
            key={index}
            onClick={() => handleCircleClick(index)}
            className="w-5 h-5 rounded-full shadow-md cursor-pointer flex items-center justify-center"
            >
            <svg width="16" height="16">
                <circle
                cx="8"
                cy="8"
                r="6"
                fill={index === middleCard ? "#cb5959" : "white"}
                />
            </svg>
            </div>
        ))}
        </div>

      </div>
    </div>
  );
};

export default Scroller;
