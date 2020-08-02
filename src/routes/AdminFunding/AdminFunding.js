import React from 'react';
import AdminMenu from 'components/AdminMenu/AdminMenu';

const AdminFunding = () => {
    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <AdminMenu />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminFunding;