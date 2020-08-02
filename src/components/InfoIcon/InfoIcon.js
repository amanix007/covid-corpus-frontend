import React from 'react';
import { INFO_ID } from "actions";
import infoModalData from 'const/infoModalData.json';
import { useAppState } from "components/AppState";

const InfoIcon = ({ infoId }) => {
    const [{ currentUser }, dispatch] = useAppState();
    const [modalData, setModalData] = React.useState(null);

    React.useEffect(() => {
        setModalData(infoModalData[infoId]);
    }, []);

    return (
        <>
            {modalData && (
                <div className="form-input-info">
                    <i
                        className="fa fa-fw fa-info-circle"
                        onClick={() => dispatch({ type: INFO_ID, infoId: infoId })}
                    ></i>
                </div>
            )}
        </>
    )
}

export default InfoIcon;