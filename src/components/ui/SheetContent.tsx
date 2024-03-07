import cx from 'classnames'
import { forwardRef } from 'react'
import styles from './SheetContent.module.css'

type Props = {
    children: React.ReactNode
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'children'>

const SheetContent = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }: Props, ref) => (
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