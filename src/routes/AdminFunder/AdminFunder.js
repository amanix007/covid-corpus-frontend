import React from 'react';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import Loading from "components/Loading";
import Edit from './Edit';
import List from './List';
import { funderService } from 'services';

const AdminFunder = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    const [message, setMessage] = React.useState(null);
    const [funders, setFunders] = React.useState(null);
    const [editEnable, setEditEnable] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    React.useEffect(() => {
        loadFunders();
    }, []);

    const loadFunders = () => {
        setIsLoading(true);
        funderService.get().then(data => {
            setFunders(data);
            setIsLoading(false);
        });
    }

    const handleEdit = (id) => {
        setIsLoading(true);
        funderService.getById(id).then(item => {
            setSelectedItem(item);
            setEditEnable(true);
            setIsLoading(false);
        });
    }

    const handleNew = (e) => {
        e.preventDefault();
        setEditEnable(true);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setSelectedItem(null);
        setEditEnable(false);
    }

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <AdminMenu />
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-9 table-responsive">
                            <div className="dk-page-title">Funders</div>

                            {isLoading && <Loading />}

                            {!isLoading && (
                                <React.Fragment>
                                    {editEnable && (
                                        <Edit
                                            selectedItem={selectedItem}
                                            handleCancel={handleCancel}
                                            setEditEnable={setEditEnable}
                                            reloadList={loadFunders}
                                        />
                                    )}
                                    {!editEnable && funders && (
                                        <List
                                            handleNew={handleNew}
                                            list={funders}
                                            handleEdit={handleEdit}
                                        />
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminFunder;