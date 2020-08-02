import React from 'react';
import AdminMenu from 'components/AdminMenu/AdminMenu';

const AdminDashboards = () => {
    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <AdminMenu />                            
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-9 table-responsive">
                            TBD
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminDashboards;