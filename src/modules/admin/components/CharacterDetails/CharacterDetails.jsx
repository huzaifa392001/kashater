import React from 'react'
import classes from './CharacterDetails.module.css'

const CharacterDetails = (props) => {
    const { character } = props
    return (
        <div className={classes.left_side}>

            <div className={classes.character_details_box}>
                <div className={classes.book_boxs}>
                    <img src={character?.image} alt="book_character" />
                </div>
                <div className={classes.character_details}>
                    <h5>{character?.character_type} - {character?.name}</h5>
                    <p>{character?.user_name}</p>
                </div>
            </div>
            <div className={classes.book_boxs_main}>
                <div className={classes.book_boxs}>
                    <img src={character?.user_image} alt="user_character" />
                </div>

            </div>

        </div>
    )
}

export default CharacterDetails