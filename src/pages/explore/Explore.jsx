import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';
import "./style.scss"
import useFetch from '../../hooks/useFetch';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';


let filters = {};
const sortByData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_Date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];
const Explore = () => {
    const { mediaType } = useParams();
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(null);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
    // console.log(genresData)

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then(res => {
            setData(res);
            // console.log(res);
            setPageNum(prev => prev + 1);
            setLoading(false);
        });
    };
    // console.log(data);
    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`, filters
        ).then(res => {
            if (data?.results) {
                setData(
                    {
                        ...data,
                        results: [...data?.results, ...res.results],
                    }
                );
            } else {
                setData(res);
            }
            setPageNum(prev => prev + 1);
        });
    };
    // console.log(pageNum);
    const onChange = (selectedItems, action) => {
        // console.log("first", selectedItems, "second", action);
        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map(g => g.id);
                // console.log(genreId)
                genreId = JSON.stringify(genreId).slice(1, -1)
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }

        }
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }
        setPageNum(1);
        fetchInitialData();
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData()
    }, [mediaType]);

    return (
        <div className='explorePage'>
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name='genres'
                            value={genre}
                            closeMenuOnScroll={false}
                            options={genresData?.genres}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className='react-select-container genresDD'
                            classNamePrefix="react-select"
                        />
                        <Select
                            name='sortby'
                            value={sortby}
                            options={sortByData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className='react-select-container sortbyDD'
                            classNamePrefix="react-select"
                        />

                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {
                            data?.results?.length > 0 ? (
                                <InfiniteScroll
                                    className='content'
                                    dataLength={data?.results?.length || []}
                                    next={fetchNextPageData}
                                    hasMore={pageNum <= data?.total_pages}
                                    loader={<Spinner initial={true} />}
                                >
                                    {data?.results?.map((item, index) => {
                                        if (item.media_type === "person") return;
                                        return (
                                            <MovieCard
                                                key={index}
                                                data={item}
                                                mediaType={mediaType}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            ) : (
                                <span className='resultNotFound'>
                                    Sorry!
                                </span>
                            )
                        }
                    </>
                )}
            </ContentWrapper>

        </div>
    )
}

export default Explore