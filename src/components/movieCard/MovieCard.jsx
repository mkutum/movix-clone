import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.scss";
import Img from '../laziLoadingImage/Img';
import { useSelector } from 'react-redux';
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import dayjs from 'dayjs';

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;

    return (
        <div
            className='movieCard'
            onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
        >
            <div className="posterBlock">
                <Img className="posterimg" src={posterUrl} />
                {
                    !fromSearch && (
                        <>
                            <CircleRating rating={data.vote_average.toFixed(1)} />
                            <Genres data={data.genre_ids.slice(0, 2)} />
                        </>
                    )
                }
            </div>
            <div className="textBlock">
                <span className="title">
                    {data.title || data.name}
                </span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    )
}

export default MovieCard