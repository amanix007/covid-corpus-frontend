import React from 'react';
import { NavLink } from 'react-router-dom';
import { blogCategoryService } from '../../services';
import Paging from 'components/Paging';

const Home = () => {
    const [blogCategories, setBlogCategories] = React.useState(null);
    const [pageId, setPageId] = React.useState(1);

    React.useEffect(() => {
        blogCategoryService.getActive().then((data) => setBlogCategories(data));
    }, []);

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <aside id="sj-sidebarvtwo" className="sj-sidebar">

                                <div class="sj-widget sj-widgetspeciality">
                                    <div class="dk-widgetheading">
                                        <h3>Filter by Category</h3>
                                    </div>
                                    <div class="sj-widgetcontent">
                                        <div class="sj-selectgroup">
                                            {blogCategories && blogCategories.map(x =>
                                                <>
                                                    <span class="sj-checkbox fullWidth">
                                                        <input id={x.id} type="checkbox" name="blogCategory" value={x.id} />
                                                        <label for={x.id}>{x.name}</label>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        <div class="col-12 col-sm-12 col-md-7 col-lg-6" >
                            <div>
                                <div className="blog">
                                    <span className="blogCategory">Blog Category B</span>

                                    <img src="images/upload-articlebg.jpg" alt="" className="mb-1" />
                                    <div style={{ fontSize: "0.75rem", color: '#90909C' }} className="mb-2 clearfix">
                                        <div style={{ float: 'left' }}><i class="fa fa-user"></i> Damir Kovačević </div>
                                        <div style={{ float: 'right' }}><i class="fa fa-calendar"></i> 23.04.2020</div>
                                    </div>
                                    <h3>Blog Title</h3>
                                    <div className="blogContent text-justify mt-2">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                                        It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                                        a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
                                        from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                                        Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                                        written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                                        The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                    <br />
                                        <a href="#">Read more...</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Paging pageId={pageId} totalNumber={13} recordsPerPage={10} setPageId={setPageId} />
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                            <NavLink
                                className="sj-btn sj-btnactive dk-btn mb-3"
                                to="/Admin/Blog"
                            >
                                Submit Blog
                            </NavLink>
                            <NavLink className="sj-btn dk-btn mb-3" to="/UsefulLinks">Useful Links</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;