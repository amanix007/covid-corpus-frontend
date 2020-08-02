import React from "react";
import StepIndicator from "components/StepIndicator";
import ProjectType1x1 from "./ProjectType1x1";
import ProjectType1x2 from "./ProjectType1x2";
import ProjectType1x3 from "./ProjectType1x3";
import ProjectType1x4 from "./ProjectType1x4";
import { Col, Row } from "reactstrap";
import Loading from 'components/Loading';
import { projectResearchActivityService } from "services";

const totalNumbersStepIndicator = 4;

const scrollToRef = (ref) =>
    window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        // behavior: 'smooth'
    });

const ProjectActivityEdit = ({ id }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [stepIndicator, setStepIndicator] = React.useState(1);

    const headerRef = React.useRef(null);

    React.useEffect(() => {
        if (id) {
            setIsLoading(true);
            projectResearchActivityService.getById(id).then(data => {
                setSelectedItem(data);
                setIsLoading(false);
            });
        }
    }, []);

    return (
        <React.Fragment>
            <main id="sj-main" className="sj-main sj-haslayout">
                <div className="sj-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <Row>
                                    <Col>
                                        <h3 ref={headerRef}>Research Project</h3>
                                    </Col>
                                </Row>

                                <StepIndicator
                                    currentNumber={stepIndicator}
                                    totalNumbers={totalNumbersStepIndicator}
                                    setStepIndicator={setStepIndicator}
                                />

                                {isLoading && <Loading />}

                                {!isLoading && stepIndicator == 1 && (
                                    <ProjectType1x1
                                        selectedItem={selectedItem}
                                        message={message}
                                        setStepIndicator={setStepIndicator}
                                        setSelectedItem={setSelectedItem}
                                        currentStep={stepIndicator}
                                    />
                                )}

                                {!isLoading && stepIndicator == 2 && (
                                    <ProjectType1x3
                                        selectedItem={selectedItem}
                                        message={message}
                                        setStepIndicator={setStepIndicator}
                                        setSelectedItem={setSelectedItem}
                                        currentStep={stepIndicator}
                                    />
                                )}



                                {!isLoading && stepIndicator == 3 && (
                                    <ProjectType1x4
                                        selectedItem={selectedItem}
                                        message={message}
                                        setStepIndicator={setStepIndicator}
                                        setSelectedItem={setSelectedItem}
                                        currentStep={stepIndicator}
                                    />
                                )}

                                {!isLoading && stepIndicator == 4 && (

                                    <ProjectType1x2
                                        selectedItem={selectedItem}
                                        message={message}
                                        setStepIndicator={setStepIndicator}
                                        setSelectedItem={setSelectedItem}
                                        currentStep={stepIndicator}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ProjectActivityEdit;