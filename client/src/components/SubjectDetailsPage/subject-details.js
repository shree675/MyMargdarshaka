import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import './subject-details.css'

const Chapters = ({curChapter}) => {
    const chapters = ['chapter1', 'chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1']
    return(
        <div className="subject-details-chapters">
            <div style={{color: 'white', fontSize: '30px', borderBottom: 'solid 1px white', width: '90%', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>Chapters</div>
            {
                chapters.map(ch => <div className="chapter-element">
                    {ch}
                </div>)
            }
        </div>
    )
}

const SubTopics = () => {
    const subTopics = ['chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1','chapter1']
    return(
        <div className="subject-details-subtopics">
            <div style={{color: 'white', fontSize: '30px', borderBottom: 'solid 1px white', width: '90%', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>SubTopics</div>
            {
                subTopics.map(ch => <div className="chapter-element">
                    {ch}
                </div>)
            }
        </div>
    )
}

const PendingTests = ({pendingTests}) => {
    return(
        <div className="tests-tab-inner">
            {
                pendingTests.map(topic => <div className="subtopic-test-element">
                    <div style={{marginLeft: '10px'}}>{topic}</div>
                    <div className="launch-test-button">LAUNCH TEST</div>
                </div>)
            }
        </div>
    )
} 

const CompletedTests = ({completedTests}) => {
    return(
        <div className="tests-tab-inner">
            {
                completedTests.map(topic => <div className="subtopic-test-element">
                    <div style={{marginLeft: '10px'}}>{topic}</div>
                    <div className="launch-test-button">LAUNCH TEST</div>
                </div>)
            }
        </div>
    )
}

const Tests = ({pendingTests, completedTests}) => {

    const [tab, setTab] = React.useState(0)

    return(
        <div className="subject-details-tests">
            <div style={{display: 'flex', padding: '10px'}}>
                <div className="test-tab-button"  style={tab==0?{border: 'solid 3px red', opacity: 1}:{}} name="pending" onClick={() => {setTab(0)}}>PENDING TESTS</div>
                <div className="test-tab-button" style={tab==1?{border: 'solid 3px red', opacity: 1}:{}} name="completed" onClick={() => {setTab(1)}}>COMPLETED</div>
            </div>
            {tab == 0 && <PendingTests pendingTests={pendingTests}/>}
            {tab == 1 && <CompletedTests completedTests={completedTests}/>}
        </div>
    )
}

class SubjectDetails extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            subjectName: props.subjectName || 'Subject Name',
            curChapter: 1
        }
    }

    render(){
        return(
            <div>
                <div style={{display:'flex'}}>
                    <div style={{width: '30%', display: 'flex', flexDirection: 'column'}}>
                        <div className="subject-details-back">BACK</div>
                        <Chapters curChapter={this.state.curChapter}/>
                    </div>
                    <SubTopics/>
                    <div style={{width: '60%', display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                        <div style={{marginLeft: '-150px', height: '100px', paddingTop: '30px', fontSize: '50px', color: '#5D1049'}}>Subject Name</div>
                        <Tests pendingTests={['SUBTOPIC1', 'SUBTOPIC2']} completedTests={['SUBTOPIC3','SUBTOPIC4']}/>
                    </div>
                </div>
            </div>
        )
    }
}



export default SubjectDetails