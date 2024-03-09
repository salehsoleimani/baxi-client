import styles from './Icon.module.css'
const Icon = ({ src, backgroundColor}) => {
    return (
        <img src={src} className={`${styles.image} `} style={{
            backgroundColor: backgroundColor
        }}/>
    )
}

export default Icon;