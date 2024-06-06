import React, { useState } from "react";
import styles from '../css/dropdown.module.css'

export default function DropDown({ options, displayText ,handler }) {

    const [showList, setShowList] = useState(false);
    const [searchQuery, setSearchQuert] = useState("");

    const itemOnClickHanlder = ({target}) => {
        handler(target.dataset.value);
        setShowList(false);
    }

    const returnFilterList = () => {
        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');
            return options.filter((option) => regex.test(option.text))
        }
        return options
    }

    return (

        <div className={styles.Picker}>
            <div className={styles.PikcerButton}>
                {displayText}
                <button type="button" onClick={() => setShowList(!showList)}>🔍</button>
            </div>

            {showList &&
                <div className={styles.DropDown}>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuert(e.target.value)} />
                    {returnFilterList().map((item, index) => <div key={index} className={styles.DropDownItem} data-value={item.value} onClick={itemOnClickHanlder}>{item.text}</div>)}
                </div>
            }
        </div>
    );
}