import React, { memo, FunctionComponent } from 'react';
import Spacing from 'components/Spacing/Spacing';
import RadialGradient from 'components/RadialGradient/RadialGradient';
import { Parallax } from 'react-parallax';
import { useSelector } from 'react-redux';
import { AppState } from 'application';
import Text from 'components/Text/Text';
import { Grid, Container, Divider } from '@material-ui/core';
import VisibilitySensor from "react-visibility-sensor";
import posed from 'react-pose';
import TrailText from 'components/TrailText/TrailText';
import 'Text.scss';
import { useMediaQuery } from 'react-responsive';

const intro = {
	header: `Hello there!`,
	title: `My name is Alexis, I'm a Software Engineer and a Level Designer.`,
	desc: `I've experience working on a diverse set of programming topics for the past 5 years 
	such as software development, web development, database design, graphics programming, game development,
	UI/UX design, and reverse engineering.`
}

const webDev: { title: string, points: string[] } = {
	title: "Web Development",
	points: [
		"• Javascript ES7+",
		"• Typescript",
		"• HTML5",
		"• CSS & SCSS / SASS",
	]
};

const webDevStack: { title: string, points: string[] } = {
	title: "Web Stacks",
	points: [
		"• React",
		"• Redux",
		"• JQuery",
		"• MySQL / MangoDB",
		"• Bootstrap / Material UI",
	]
};

const softDev: { title: string, points: string[] } = {
	title: "Software Development",
	points: [
		"• C C++",
		"• C# VB C++/CLI",
		"• Java",
		"• Python",
		"• GSC",
		"• Bash / Shell / Powershell",
		"• Assembly x86 / x64",
	]
};

const softDevStack: { title: string, points: string[] } = {
	title: "Software Stacks",
	points: [
		"• .NET",
		"• Qt",
		"• Winform & WPF",
		"• DirectX",
		"• Selenium",
	]
};

const levelDesign: { title: string, points: string[] } = {
	title: "Level Design",
	points: [
		"• BSP Blockout & Landscape",
		"• Detail geometry",
		"• Shader / Material creation",
		"• Lighting, FX / SFX placement",
		"• Level optimization & Portaling"
	]
};

const levelDesignEditors: { title: string, points: string[] } = {
	title: "Editors",
	points: [
		"• Unreal Engine 4",
		"• Unity 5",
		"• Radiant / GtkRadiant",
	]
};

const AnimationUp = posed.div({
	enter: { 
		y: '0%', 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 1000,
			ease: 'easeOut'
		}
	},
	exit: {
		y: '100%',
		opacity: 0,
		scale: 1,
		transition: { 
			duration: 1000,
			ease: 'easeIn'
		}
	}
});

const AnimationRight = posed.div({
	enter: { 
		x: '0%', 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 1000,
			ease: 'easeOut'
		}
	},
	exit: {
		x: '100%',
		opacity: 0,
		scale: 1,
		transition: { 
			duration: 1000,
			ease: 'easeIn'
		}
	}
});

const AnimationLeft = posed.div({
	enter: { 
		x: '0%', 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 1000,
			ease: 'easeOut'
		}
	},
	exit: {
		x: '-100%',
		opacity: 0,
		scale: 1,
		transition: { 
			duration: 1000,
			ease: 'easeIn'
		}
	}
});

export const IntroSkill: FunctionComponent = (): JSX.Element =>
{
	const isDarkMode = useSelector((state: AppState) => state.app.isDarkMode);
	const isTabletOrMobileDevice = useMediaQuery({ query: '(max-device-width: 1224px)' });

	const skillGrid: JSX.Element = (
		<Grid style={{paddingBottom: '100px'}} container alignItems="center" 
		direction="row" justify="space-around">
			
			{/* Web Development */}
			<div style={{padding: '20px 0px 20px 0px'}}>
				<Text className='poiret-h2' items={[webDev.title]} />
				<Text className='ubuntu-h4' items={webDev.points} />
				<Spacing height='20px' />
				<Text className='poiret-h2' items={[webDevStack.title]} />
				<Text className='ubuntu-h4' items={webDevStack.points} />
			</div>

			{/* Software Development */} 
			<div style={{padding: '20px 0px 20px 0px'}}>
				<Text className='poiret-h2' items={[softDev.title]} />
				<Text className='ubuntu-h4' items={softDev.points} />
				<Spacing height='20px' />
				<Text className='poiret-h2' items={[softDevStack.title]} />
				<Text className='ubuntu-h4' items={softDevStack.points} />
			</div>

			{/* Level Design */}
			<div style={{padding: '20px 0px 20px 0px'}}>
				<Text className='poiret-h2' items={[levelDesign.title]} />
				<Text className='ubuntu-h4' items={levelDesign.points} />
				<Spacing height='20px' />
				<Text className='poiret-h2' items={[levelDesignEditors.title]} />
				<Text className='ubuntu-h4' items={levelDesignEditors.points} />
			</div>

		</Grid>
	)

	return (
		<Grid container direction="column" justify="center" alignItems="stretch">

			{/* First Section */}
			<RadialGradient position='ellipse at bottom' colors={[
				{ color: isDarkMode ? '#0e0f14' : '#e5e5e5', colorPercent: '0%' },
				{ color: isDarkMode ? '#181a21' : '#f4f4f4', colorPercent: '100%' }
			]}>
				<VisibilitySensor partialVisibility offset={{ bottom: isTabletOrMobileDevice ? 20 : 200 }}>
				{({ isVisible }) => (
					<Grid style={{paddingTop: '100px', paddingBottom: '100px'}} container direction="row" 
					justify="center" alignItems="center">
						{/* About me */}
						<AnimationUp style={{width: '100%', height: '100%'}} pose={isVisible ? "enter" : "exit"} 
						key="about-animation">
							<Container maxWidth="md">
								<Text align="left" color="textPrimary" component="h1" variant="h1"
								className='poiret-h1' items={[intro.header]} />
								<Divider style={{ width: '350px', height: '2px', marginTop: '16px', 
								marginBottom: '16px' }} />
								<Text align="left" style={{marginTop: '16px', marginBottom: '16px'}} 
								color="textPrimary" component="h3" variant="h3"
								className='ubuntu-h3' items={[intro.title]} />
								<Text align="left" color="textPrimary" paragraph component="h4" variant="h4"
								className='ubuntu-h4' items={[intro.desc]} />
							</Container>
						</AnimationUp>
					</Grid>
				)}
				</VisibilitySensor>
			</RadialGradient>

			<Parallax style={{backgroundColor: isDarkMode ? 'black' : 'rgb(122, 206, 255)'}} 
			bgImageAlt="index" strength={400}
			bgImage={require(`assets/images/index/${isDarkMode ? 'stars' : 'clouds'}.svg`)}>
				<Spacing height='100px' />
			</Parallax>

			{/* Second Section */}
			<RadialGradient position='ellipse at top' colors={[
				{ color: isDarkMode ? '#0e0f14' : '#e5e5e5', colorPercent: '0%' },
				{ color: isDarkMode ? '#181a21' : '#f4f4f4', colorPercent: '100%' }
			]}>
				<VisibilitySensor partialVisibility offset={{ bottom: isTabletOrMobileDevice ? 10 : 200 }}>
				{({ isVisible }) => (
					<Container>
						<AnimationLeft 
						pose={isVisible ? "enter" : "exit"} key="about-skill-header-animation">
							<Container style={{paddingTop: '50px', paddingBottom: '50px'}}>
								<TrailText align="center" color="textPrimary" component="h1" variant="h1"
								className='poiret-h1' active={isVisible} items={["Technological Skills"]} />
								<Divider style={{ margin: '10px 0px 10px 0px', width: '100%', height: '2px'}} />
							</Container>
						</AnimationLeft>
						{isTabletOrMobileDevice ? skillGrid : (
							<AnimationRight 
							pose={isVisible ? "enter" : "exit"} key="about-skill-animation">
								{skillGrid}
							</AnimationRight>
						)}
					</Container>
				)}
				</VisibilitySensor>
			</RadialGradient>
		</Grid>
	);
}

export default memo(IntroSkill);