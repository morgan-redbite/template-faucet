import React from 'react';
import * as styles from './index.module.scss';

interface IViewBaseProps {
    children: {
        body?: JSX.Element,
        footer?: JSX.Element
    }
}

export const Generic = ({ children }: IViewBaseProps) => {

    return (
        <>
            <div className={styles.generic}>
                <div className={styles.generic_body}>{children.body}</div>
                <div id="footer" className={styles.generic_footer}>{children.footer}</div>
            </div>
        </>
    )
}
