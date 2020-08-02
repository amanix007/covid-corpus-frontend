import React from "react";

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useAppState } from 'components/AppState';

import { userService } from "services";
import { Button } from "@material-ui/core";
import Loading from "components/Loading";
import { ccToast } from "helpers/CommonFunctions";



const AssignCategory = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
    const [categoryList, setCategory] = React.useState([]);
    const [userCatagoryList, setUserCatagory] = React.useState([]);





    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    React.useEffect(() => {
        setIsLoading(true);
        userService.get_all_category()
            .then((data) => {
                let categoryList = [];
                for (const property in data.sub_categories) {
                    categoryList.push({
                        name: property,
                        list: data.sub_categories[property]

                    })
                }

                setCategory(categoryList);


                setIsLoading(false);
            });


        userService.get_user_category(props.user.id)
            .then((data2) => {
                let categoryList = [];
                for (const property2 in data2.sub_categories) {
                    categoryList.push({
                        name: property2,
                        list: data2.sub_categories[property2]
                    })
                }
                // categoryList.push({

                //     name: "BioMedical",
                //     list: [
                //         { "id": "97d93555-8eb2-458e-8ef7-c70577f3578c", "name": "Environmental sciences", "category": "Other" }
                //     ]

                // })

                setUserCatagory(categoryList);


                setIsLoading(false);
            });

    }, []);




    const handleChange = (e, i, data) => {
        console.log('e:', e.target.checked)
        // e.preventDefault();
        let newData = [...userCatagoryList];

        setUserCatagory(newData);
        // setState({ ...state, [event.target.name]: event.target.checked });


        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            newData[i].list.push(data);
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = newData[i].list.indexOf(data);

            newData[i].list.splice(index, 1)

        }

    };

    const update = () => {
        setIsSubmitLoading(true)
        let reqobj = {
            editor_id: props.user.id,
            sub_categories: [

            ]
        }

        for (let i = 0; userCatagoryList.length > i; i++) {
            let item = userCatagoryList[i];
            for (let j = 0; item.list.length > j; j++) {
                reqobj.sub_categories.push({
                    id: item.list[j].id
                })
            }
        }



        userService.assignEditor(reqobj)
            .then((data) => {
                console.log('data:', data)
                setIsLoading(false);
                setIsSubmitLoading(false);
                ccToast("Successfully Completed", "success")
                props.cancel();
            });

    }
if(isLoading){
    return <Loading />
}

    return (
        <div className="AssignCategory">
            <div className="d-flex justify-content-between mb-4">
            <h3><strong> Assign Category to: {props.user.name}</strong></h3>
            <div className="text-right">
                <button  onClick={props.cancel} className="dk-btn dk-btn-blue"
                style={{marginRight: 8}}
                >Cancel</button>
                <button type="submit" onClick={update} className="dk-btn dk-btn-blue">Update
                
                {" "}
                  {isSubmitLoading && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
                </button>
            </div>
            </div>
            <div className="category-list">
                {categoryList.map((cat, i) => {
                    return (
                        <div className="category" key={i}>

                            <div className="main-category">

                                <h5><strong> {cat.name.replace(/_/g, " ")}</strong></h5>
                            </div>

                            <div className="sub-item-list">
                                {cat.list.map((data, j) => {
                                    let checked = false;
                                    for (let x = 0; userCatagoryList.length > x; x++) {
                                        let item = userCatagoryList[x];

                                        for (let y = 0; item.list.length > y; y++) {
                                            if (data.id === item.list[y].id) {
                                                checked = true;
                                            }
                                        }
                                    }

                                    return (
                                        <div className="sub-item">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={(e) => handleChange(e, i, data)}
                                                        name={data.id}
                                                        color="primary"
                                                        value={data}
                                                    />
                                                }
                                                label={data.name}
                                            />
                                        </div>
                                    )
                                })}



                            </div>



                        </div>

                    )

                })}

            </div>
           


        </div>
    );
};

export default AssignCategory;
