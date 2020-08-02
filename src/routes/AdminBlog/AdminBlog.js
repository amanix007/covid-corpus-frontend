import React from 'react';
import { Link } from 'react-router-dom';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import { Formik, Form, Field } from "formik";
import ValidationError from 'components/ValidationError';
import StatusRadio from '../Admin/Components/StatusRadio';
import * as Yup from "yup";
import { blogService } from '../../services';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    status: Yup.string().required("Status is required")
});

const AdminBlog = () => {
    const [blogTekst, setBlogTekst] = React.useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    return (
        <>            
            <ReactQuill
                value={blogTekst}
                name="text"
                modules={modules}
                formats={formats}
                onChange={x => setBlogTekst(x)}
                placeholder="Enter Description..."
                style={{height: '155px'}}
            />
            <hr />
            damir
            <br />
            
        </>
    )
}

export default AdminBlog;