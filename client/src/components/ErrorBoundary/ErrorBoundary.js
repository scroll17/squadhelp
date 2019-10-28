import React, { Component, logErrorToMyService } from "react"
import style from "./ErrorBoundary.module.sass"

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={style.errorBoundary}>
                    <h1>
                        Что-то пошло не так.
                    </h1>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;