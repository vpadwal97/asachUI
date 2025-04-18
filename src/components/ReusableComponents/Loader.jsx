import { ThreeDots } from "react-loader-spinner";

function Loader(props) {
    return (
        <div className="d-flex justify-content-center">
            <ThreeDots
                visible={props.loader}
                height="96"
                width="96"
                color="var(--bs-primary)"
                strokeWidth="6"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}
export default Loader;
