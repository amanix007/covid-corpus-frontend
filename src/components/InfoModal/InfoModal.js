import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { INFO_ID } from "actions";
import infoModalData from 'const/infoModalData.json';
import { useAppState } from "components/AppState";

const InfoModal = () => {
    const [{ infoId }, dispatch] = useAppState();
    const [isOpen, setIsOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const toggle = () => { dispatch({ type: INFO_ID, infoId: '' }) };

    React.useEffect(() => {
        if (infoId) {
            const x = infoModalData[infoId];

            if (x) {
                setModalData(x);
                setIsOpen(true);
            }
        }
        else {
            setModalData(null);
            setIsOpen(false);
        }
    }, [infoId]);

    return (
        <>
            {modalData && (<Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{modalData.title}</ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{__html: modalData.body}} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Close
          </Button>
                </ModalFooter>
            </Modal>
            )}
        </>
    )
}

export default InfoModal;