import React from 'react';
import './Home.scss';
import BackgroundContainer from '../../components/BackgroundContainer/BackgroundContainer';
import CheckedInStatus from '../../components/CheckedInStatus/CheckedInStatus';
import Header from '../../components/Header/Header.js';
import ContainerPanel from '../../components/ContainerPanel/ContainerPanel.js';
import TabbedContent from '../../components/TabbedContent/TabbedContent.js';
import StudyBox from '../../components/StudyBox/StudyBox.js';

const Home = (props) => (
    <div className="Page Home">
        <BackgroundContainer>
            <Header/>
            <CheckedInStatus/>
            <ContainerPanel>
                <TabbedContent tabs={['Friends', 'Courses']}
                               tabContents={[
                                   <div>
                                       <StudyBox contacts={[{name: 'Kate', course: 'NSCI200'}, {name: 'Sasha', course: 'PHIL210'}]} location="McLennan" noun={['friend is', 'friends are']}/>
                                       <StudyBox contacts={[{name: 'Grace', course: 'MATH223'}]} location="Burnside" noun={['friend is', 'friends are']}/>
                                   </div>,
                                   <div>
                                       Find other people studying the same course as you

                                       <StudyBox contacts={[{name: 'Kate', course: 'NSCI200'}, {name: 'Sasha', course: 'PHIL210'}]} location="McLennan" noun={['person is', 'people are']}/>
                                   </div>
                               ]}/>
            </ContainerPanel>
        </BackgroundContainer>
    </div>
);

export default Home;