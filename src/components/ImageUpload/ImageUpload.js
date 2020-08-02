import React from 'react';
import { CustomInput, FormGroup } from 'reactstrap';

const ImageUpload = ({ setImage, triggerClick, setTriggerClick }) => {
    const inputFile = React.useRef(null);

    React.useEffect(() => {
        if (triggerClick === true) {
            console.log('ref', inputFile);
            inputFile.current.click();       
            setTriggerClick(false);
        }
    }, [triggerClick]);
        
    const handleUploadFile = async e => {
        let file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (upload) {
            // console.log('handleUploadFile', upload.target.result);
            setImage(upload.target.result);
        };

        reader.readAsDataURL(file);
        e.target.value = "";
    };

    return (

        <React.Fragment>
            <FormGroup>
                <CustomInput innerRef={inputFile} onChange={handleUploadFile} type="file" style={{cursor: 'pointer'}} />
            </FormGroup>
        </React.Fragment>
    )
}

export { ImageUpload };