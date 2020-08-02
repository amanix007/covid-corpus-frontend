import React from "react";
import ProjectTypeBiomedical from "./ProjectTypeBiomedical";
import ProjectTypeNonBiomedical from "./ProjectTypeNonBiomedical";
import ProjectTypeOther from "./ProjectTypeOther";
import { Col, Row } from "reactstrap";
import Loading from 'components/Loading';
import DkDropdown from 'components/DkDropdown';
import { projectOtherResourceService, otherResearchFieldCategory } from "services";

const scrollToRef = (ref) =>
    window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        // behavior: 'smooth'
    });

const ProjectOtherResourceEdit = ({ id }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [fieldTypes, setFieldTypes] = React.useState(null);
    const [fieldType, setFieldType] = React.useState("-1");
    const [message, setMessage] = React.useState(null);
    const [selectedItem, setSelectedItem] = React.useState(null);

    const headerRef = React.useRef(null);

    React.useEffect(() => {
        otherResearchFieldCategory.getFieldTypes().then((data) => {
            setFieldTypes(data);
            setIsLoading(false);
          });

        if (id) {
            setIsLoading(true);
            projectOtherResourceService.getById(id).then(data => {
                setSelectedItem(data);
                setIsLoading(false);
            });
        }
    }, []);

    React.useEffect(() => {
        if (selectedItem) {
            if (selectedItem.other_resource_type === "Biomedical research")
                setFieldType("1");
            else if (selectedItem.other_resource_type === "Non-Biomedical research" && selectedItem.field_type_id)
                setFieldType(selectedItem.field_type_id);
            else if (selectedItem.other_resource_type === "Other research")
                setFieldType("3");
        }
    }, [selectedItem]);

    React.useEffect(() => {
        console.log('fieldType', fieldType)
    }, [fieldType]);

    return (
        <React.Fragment>
            <main id="sj-main" className="sj-main sj-haslayout">
                <div className="sj-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <Row>
                                    <Col>
                                        <h3 ref={headerRef}>Other Resources</h3>
                                    </Col>
                                </Row>

                                {isLoading && <Loading />}

                                {!isLoading && fieldTypes && (
                                    <>
                                        <Row>
                                            <Col>
                                                <DkDropdown
                                                    title="Discipline"
                                                    propName="fieldType"
                                                    selectedValue={fieldType}
                                                    list={fieldTypes}
                                                    onChange={(e) => setFieldType(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        
                                        {fieldType && fieldType === "1" && (
                                            <ProjectTypeBiomedical
                                                selectedItem={selectedItem}
                                                message={message}
                                                setSelectedItem={setSelectedItem}
                                            />
                                        )}

                                        {fieldType != "-1" && fieldType != "1" && fieldType != "3" && (
                                            <ProjectTypeNonBiomedical
                                                selectedItem={selectedItem}
                                                message={message}
                                                setSelectedItem={setSelectedItem}
                                                otherResearchFieldCategoryId={fieldType}
                                            />
                                        )}

                                        {fieldType && fieldType === "3" && (
                                            <ProjectTypeOther
                                                selectedItem={selectedItem}
                                                message={message}
                                                setSelectedItem={setSelectedItem}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ProjectOtherResourceEdit;