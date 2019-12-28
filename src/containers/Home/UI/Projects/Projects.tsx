import React, { Component } from 'react';
import RadialGradient from '../../../../components/RadialGradient/RadialGradient';
import { Grid, Typography } from '@material-ui/core';
import { Transition, animated } from 'react-spring/renderprops';
import Spacing from '../../../../components/Spacing/Spacing';
import { SpringGrid, enterExitStyle } from 'react-stonecutter';
import Project, { LinkedProjectProps } from '../../../../components/Project/Project';
import '../../../../Text.scss';

const projects: LinkedProjectProps[] = require('./Projects.json');
const animStyle: any = enterExitStyle.skew; 
class Projects extends Component
{
    render(): JSX.Element
    {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
    
                {/* Projects Title */}
                <Typography align="center" variant="h3" component="h2">
                    <div className='calli-title'>
                        <Transition native items={true} from={{ overflow: 'hidden', height: 0 }}
                        enter={[{ height: 'auto' }]} delay={400} leave={{ height: 0 }}>
                        { show => show && (props => <animated.div style={props}>Projects</animated.div>)}
                        </Transition>
                    </div>
                </Typography>
    
                <Spacing height='200px' />
    
                {/* Projects */}
                <div style={{width: '100%', height: '100%', listStyleType: 'none'}}>
                    <RadialGradient position='ellipse at bottom' colors={[
                    { color: '#23272B', colorPercent: '0%' },
                    { color: '#090A0A', colorPercent: '100%' }]}>
                        <SpringGrid enter={animStyle.enter} entered={animStyle.entered} exit={animStyle.exit} 
                        component='div' columns={5} perspective={600} columnWidth={250} gutterWidth={20} 
                        gutterHeight={20} springConfig={{ stiffness: 100, damping: 30 }}>
                            {projects?.map((project) => (
                                <li key={project.title}> 
                                    <Project proj={project} />
                                </li>
                            ))}
                        </SpringGrid>
                        <Spacing height='600px' />
                    </RadialGradient>
                </div>
                
            </Grid>
        );
    }
}

export default Projects;