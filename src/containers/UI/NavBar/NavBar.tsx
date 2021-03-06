import React, { FunctionComponent, useState, memo, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as actions from 'store/actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-scroll";
import { useMediaQuery } from 'react-responsive';
import { Fab, Typography, Drawer, AppBarProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'application';
import { Flare, Brightness3 } from '@material-ui/icons';
import posed, { PoseGroup } from 'react-pose';
import MenuIcon from '@material-ui/icons/Menu';
import { useScroll } from 'react-use-gesture';
import './NavBar.scss';

const AnimationFixed = posed.div({
	enter: { 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 500,
			ease: 'easeOut'
		}
	},
	exit: {
		opacity: 0,
		scale: 1.5,
		transition: { 
			duration: 500,
			ease: 'easeIn'
		}
	}
});

const AnimationAbsolute = posed.div({
	enter: { 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 250,
			ease: 'easeOut'
		}
	},
	exit: {
		opacity: 0,
		scale: 0,
		transition: { 
			duration: 250,
			ease: 'easeIn'
		}
	}
});

const scrollConfig = {
	domTarget: window,
	eventOptions: { passive: true }
}

export const NavBar: FunctionComponent<AppBarProps> = (props: AppBarProps): JSX.Element =>
{
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state: AppState) => state.app.isDarkMode);
	const projectModalActive = useSelector((state: AppState) => state.home.projectModalActive);

	const isPortrait = useMediaQuery({ orientation: 'portrait' });
	const isTabletOrMobileDevice = useMediaQuery({ query: '(max-device-width: 1224px)' });
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const [isFixedNavbar, setFixedNavbar] = useState<boolean>(false);

	const scroll: any = useScroll(({ event }: any) => 
	{
		let isPastHeader: boolean = window.scrollY >= window.innerHeight;
		if (isPastHeader !== isFixedNavbar)
			setFixedNavbar(isPastHeader);
	}, scrollConfig);
	  
	useEffect(scroll, [scroll]);

	const toggleDarkMode = (): void =>
	{
		dispatch(actions.toggleDarkMode(!isDarkMode));
		localStorage.setItem('isDarkMode', (!isDarkMode).toString());
	}

	const toggleDrawer = (visible: boolean): void =>
	{
		setDrawerOpen(visible);
		dispatch(actions.toggleModalActive(visible));
	}

	const canShowFixedNavBar = (): boolean =>
	{
		return !projectModalActive && isFixedNavbar;
	}

	const navBarElements: JSX.Element = (
		<>
			<Link className="navbar-button" to="header-section" smooth onClick={() => toggleDrawer(false)}>
				<Button size='large' color="inherit">About</Button>
			</Link>
			<Link className="navbar-button" to="projects-section" smooth onClick={() => toggleDrawer(false)}
			offset={isTabletOrMobileDevice ? 50 : 10}>
				<Button size='large' color="inherit">Projects</Button>
			</Link>
			<Link className="navbar-button" to="level-design-section" smooth onClick={() => toggleDrawer(false)}
			offset={isTabletOrMobileDevice ? 30 : 180}>
				<Button size='large' color="inherit">Level Design</Button>
			</Link>
			<Link className="navbar-button" to="contact-section" smooth onClick={() => toggleDrawer(false)}
			offset={0}>
				<Button size='large' color="inherit">Contact</Button>
			</Link>
		</>
	);

	const navBarButtonsDesktop: JSX.Element = (
		<Grid container direction="row" justify="flex-end" alignItems="center">
			{navBarElements}
			<Fab className="navbar-button" style={{ color: isDarkMode ? 'goldenrod' : 'gainsboro' }} 
			size='small' onClick={toggleDarkMode}>
				{isDarkMode ? <Flare /> : <Brightness3 />}
			</Fab>
		</Grid>
	);

	const navBarButtonsMobile: JSX.Element = (
		<Grid container direction="row" justify="flex-end" alignItems="center">
			<Fab className="navbar-button" style={{ color: isDarkMode ? 'goldenrod' : 'gainsboro' }} 
			size='small' onClick={toggleDarkMode}>
				{isDarkMode ? <Flare /> : <Brightness3 />}
			</Fab>
			<Fab className="navbar-button" color="inherit" size='small' 
			onClick={() => toggleDrawer(!drawerOpen)}>
				<MenuIcon />
          	</Fab>
			<Drawer variant="persistent" anchor="top" open={drawerOpen} onClose={() => toggleDrawer(false)}
			PaperProps={{ style: { backgroundColor: 'rgba(50, 50, 50, 0.3)', color: "gainsboro", top: '48px' }}}>
				<div role="presentation" onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
					<Grid container direction="column" justify="center" alignItems="center">
						{navBarElements}
					</Grid>
				</div>
          	</Drawer>
		</Grid>
	);

	const navBar: JSX.Element = (
		<AppBar {...props} position={canShowFixedNavBar() ? "fixed" : "absolute"}>
			<Toolbar variant="dense">
				<Grid container spacing={3}>
					<Grid item xs={3}>
						<Typography className="navbar-logo" align="center" variant="h4" component="h4">
							Iswenzz
						</Typography>
					</Grid>
					<Grid item xs={9}>
						{isTabletOrMobileDevice || isPortrait ? navBarButtonsMobile : navBarButtonsDesktop}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);

	return (
		<PoseGroup flipMove={false}>
		{canShowFixedNavBar() || process.env.NODE_ENV === "test" ? [
			<AnimationFixed className="navbar-fixed" key="navBar-anim">
			{navBar}
			</AnimationFixed>
		] : [
			<AnimationAbsolute className="navbar-absolute" key="navBar-noanim">
			{navBar}
			</AnimationAbsolute>
		]}
		</PoseGroup>
	);
}

export default memo(NavBar);