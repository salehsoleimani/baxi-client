import cx from 'classnames'
import { forwardRef } from 'react'
import styles from './SheetContent.module.css'

const SheetContent = forwardRef(
    ({ className, ...props }, ref) => (
        <div
            className={cx(
                styles.spacing,
                styles.container,
                // 'grid grid-flow-row place-items-stretch text-xl',
                // 'gap-4',
                className
            )}
            {...props}
            ref={ref}
        />
    )
)

export default SheetContent;