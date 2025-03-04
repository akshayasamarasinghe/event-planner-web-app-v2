import {Loader} from "@mantine/core";

const Loading = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                bottom: "0px",
                right: "0px",
                display: "flex",
                overflow: "auto",
                backgroundColor: "rgba(0,0,0,0.22)",
                zIndex: 10,
            }}
        >
            <div
                style={{
                    margin: "auto",
                    maxHeight: "100%",
                }}
            >
                <Loader/>
            </div>
        </div>
    );
}

export default Loading;
