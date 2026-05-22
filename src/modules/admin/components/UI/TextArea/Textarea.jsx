import * as React from 'react';
import classes from './Textarea.module.css'
export default function MinHeightTextarea(props) {

    return (
        <div className={classes.textarea_box}>
            <label htmlFor=''>{props.label}</label>
            <textarea
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange} rows={props.rows} cols={40} />
            {props.showpertext && <p className={classes.texalign_end}>{`${props.showpertext}`}</p>}
        </div>

    );
}