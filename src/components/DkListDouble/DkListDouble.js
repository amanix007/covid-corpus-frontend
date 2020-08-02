import React from 'react';

const DkListDouble = ({ list, deleteFromList }) => {
    return (
        <React.Fragment>
            {list.map((x) => {
                return (
                    <React.Fragment>
                        <div className="dk-list-title">
                            {x.categoryName}
                        </div>
                        <div className="dk-list-subtitle">
                            {x.name}
                            <span
                                className="duo-list-delete pull-right"
                                onClick={() => deleteFromList(x.id)}
                            >
                                <i className="fa fa-minus-square"></i>
                            </span>
                        </div>
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
}

export default DkListDouble;