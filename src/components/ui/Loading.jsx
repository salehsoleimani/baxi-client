import Lottie from "lottie-react";
import loaderAniamtion from "../../assets/animation/loading.json";
import styles from './Loading.module.css'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className={styles.loaderContainer}>
            <Lottie className={styles.loader} options={defaultOptions}
                    animationData={loaderAniamtion}
            />

        </div>
    );
};

export default Loading;
