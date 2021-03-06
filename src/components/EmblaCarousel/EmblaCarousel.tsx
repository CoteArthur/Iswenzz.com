import React, { useState, useEffect, useCallback, FunctionComponent, memo } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import useInterval from "utility/useInterval";
import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons/EmblaCarouselButtons";
import { Grid } from "@material-ui/core";
import "./Embla.css";

export interface EmblaCarouselProps
{
	autoplay: boolean,
	delayLength: number,
	children: any[],
	height?: string,
	width?: string,
	style?: React.CSSProperties
}

/**
 * A carousel component that use all JSX children as carousel items.
 * The carousel provides a next/prev arrow and buttons to scroll through the carousel.
 * @param props - EmblaCarouselProps
 */
export const EmblaCarouselComponent: FunctionComponent<EmblaCarouselProps> = (props: EmblaCarouselProps) => 
{
	const [embla, setEmbla] = useState<any>(null);
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);
	const [delay,] = useState(props.delayLength);
	const [isRunning,] = useState(props.autoplay);

	const scrollTo = useCallback(index => embla.scrollTo(index), [embla]);
	const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla.scrollNext(), [embla]);

	useInterval(() => 
	{
		if (selectedIndex === scrollSnaps.length - 1)
			scrollTo(0);
		else
			scrollNext();
	}, isRunning ? delay : null);

	useEffect(() => 
	{
		const onSelect = () => 
		{ 
			setSelectedIndex(embla.selectedScrollSnap());
			setPrevBtnEnabled(embla.canScrollPrev());
			setNextBtnEnabled(embla.canScrollNext());
		};
		if (embla) 
		{
			setScrollSnaps(embla.scrollSnapList());
			embla.on("select", onSelect);
			onSelect();
		}
		return () => embla && embla.destroy();
	}, [embla]);

	return (
		<Grid style={props.style} container direction="row" justify="center" alignItems="center">
			<div style={{ width: props.width, height: props.height }} className="embla">
				<EmblaCarouselReact className="embla__viewport" emblaRef={setEmbla} 
				options={{ loop: false, draggable: false }} htmlTagName="div">
				<div style={{ width: props.width, height: props.height }} 
				className="embla__container">
					{props.children.map((Child, index) => (
						<div className="embla__slide" key={index}>
							{Child}
						</div>
					))}
				</div>
				</EmblaCarouselReact>
				<div className="embla__dots">
					{scrollSnaps.map((snap, index) => (
						<DotButton selected={index === selectedIndex} onClick={() => scrollTo(index)} key={index} />
					))}
				</div>
				<PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
				<NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
			</div>
		</Grid>
	);
};

export default memo(EmblaCarouselComponent);