import { useRouteError } from "react-router-dom";
function ErrorPage() {
    const error = useRouteError();
    let title = " An error occured!";
    let message = "Could not find this page";
    if (error.isError) {
        if (error.message.includes("404")) {
            message = `${error.message} Page not found.`;
        } else {
            message = error.message;
        }
    }
    return <>
        <main>
            <h1>
                {title}
            </h1>
            <p>
                {message}
            </p>
        </main>
    </>
}

export default ErrorPage;