import React, { useState } from "react";
import { store } from 'react-notifications-component';

export const ccToast = (title,
    type = "success",
    message,
    insert = "top",
    container = "top-center",
    animationIn = ["animated", "fadeIn"],
    animationOut = ["animated", "fadeOut"]
) => {
    // message = type;

    store.addNotification({
        title: "",
        message: title,
        type,
        insert,
        container,
        animationIn,
        animationOut,
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    });





    // let iconClassName = "";

    // if (type === 'success') {
    //     iconClassName = "fa fa-check-circle";
    // } else if (type === 'warning') {
    //     iconClassName = "fa fa-exclamation-triangle";
    // } else if (type === 'danger') {
    //     iconClassName = "fa fa-exclamation-circle";
    // }

    // store.addNotification(
    //     {
    //         title,
    //         message,
    //         type,
    //         insert,
    //         container,
    //         animationIn,
    //         animationOut,
    //         dismiss: {
    //             duration: 3000,
    //             onScreen: true
    //         },
    //         content: (
    //             <div className={`notification-custom-${type}`}>
    //                 <div className="notification-custom-icon">
    //                     <i className={iconClassName} />
    //                 </div>
    //                 <div className="notification-custom-content">
    //                     <p className="notification-message">{title}</p>
    //                 </div>
    //             </div>
    //         )
    //     });

}





export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("fromBoundary", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}