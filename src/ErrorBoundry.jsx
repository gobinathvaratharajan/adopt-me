import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundry extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundry caught an error", error, info)
    }

    render() {
        if(this.state.hasError) {
            return (
                <h1>
                    There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
                </h1>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundry;
