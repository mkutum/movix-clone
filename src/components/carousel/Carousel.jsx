import React, { useRef, useState } from 'react'
import "./style.scss";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from "../laziLoadingImage/Img";
import CircleRating from '../circleRating/CircleRating';
import PosterFallback from "../../assets/no-poster.png";
import Genres from '../genres/Genres';
import CarouselCard from './CarouselCard';





const Carousel = ({ title, data, loading, endpoint }) => {
    // const [mouseHover, setMouseHover] = useState(false);
    const carouselContainer = useRef();
    // const carouselItemPositon = useRef();
    const { url } = useSelector((state) => state.home);
    // const navigate = useNavigate();
    // console.log(data);

    // const handleCarouselPopUp = (e, item) => {
    // console.log("item id", item);
    // const x = carouselItemPositon.current?.offsetLeft;
    // const y = carouselItemPositon.current?.offsetTop;
    // console.log(x, y);
    // console.log(e);

    // }


    const navigation = (direction) => {
        const container = carouselContainer.current;
        // console.log(container.scrollLeft, container.offsetWidth)
        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });

    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    {/* <div className="date skeleton"></div> */}
                </div>
            </div>
        )
    }
    return (
        <div className='carousel'>
            <ContentWrapper>
                {title && <div className='carouselTitle'>{title}</div>}
                <BsFillArrowLeftCircleFill
                    className='carouselLeftNav arrow'
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className='carouselRightNav arrow'
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item, i) => {
                            const posterUrl = item.poster_path ?
                                url.poster + item.poster_path : PosterFallback;
                            return (
                                <CarouselCard key={i} item={item} posterUrl={posterUrl} />
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}

                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel;