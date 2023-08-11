import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../laziLoadingImage/Img';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';



const CarouselCard = ({ item, posterUrl }) => {
    const carouselItemPositon = useRef();
    const navigate = useNavigate();
    // console.log(data);
    let timeout = 0;
    const handleCarouselPopUp = (e, item) => {
        timeout = setTimeout(() => {
            const elementProp = carouselItemPositon.current.getBoundingClientRect();
            console.log(elementProp);
            // const { x, y } = elementProp;
            // console.log("event", e.clientX, e.clientY);

            // console.log(x, y);
        }, 2000);
    }
    const handleRemovePopup = (e, item) => {
        clearTimeout(timeout);
        console.log("set time out is cleared")
    }
    return (
        <div
            key={item.id}
            className="carouselItem"
            ref={carouselItemPositon}
            onClick={() =>
                navigate(`/${item.media_type || endpoint}/${item.id}`)
            }
        // onMouseOver={(e) => handleCarouselPopUp(e, item.id)}
        // onMouseOut={(e) => handleRemovePopup(e, item.id)}
        >
            <div className="posterBlock">
                <Img src={posterUrl} />
                <CircleRating rating={item.vote_average.toFixed(1)} />
                <Genres data={item.genre_ids.slice(0, 2)} />
            </div>
            <div className="textBlock">
                <span className="title">
                    {item.title || item.name}
                </span>
                {/* <span className="date">
            {dayjs(item.release_Date).format("MMM D, YYYY")}
        </span> */}
            </div>
        </div>
    )
}

export default CarouselCard