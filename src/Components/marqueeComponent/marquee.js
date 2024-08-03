// MarqueeComponent.js
import React, { useEffect, useState } from 'react';
import './marquee.css';
import Marquee from 'react-fast-marquee';
import { useSelector, useDispatch } from 'react-redux';
import { setMarqueeItems } from '../../ReduxStore/actions/marqueeAction';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import Skeleton from 'react-loading-skeleton';

const MarqueeComponent = () => {
    const dispatch = useDispatch();
    const requestInstance = createAuthenticatedRequest();
    const coverPhotosMarquee = useSelector(state => state.marqueeData.items);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (coverPhotosMarquee.length === 0) {
            requestInstance.get(`${constants.BASE_URL}get-photos-for-marquee`)
                .then(response => {
                    console.log('marquee data', response.data);
                    dispatch(setMarqueeItems(response.data));
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching marquee items:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [dispatch, coverPhotosMarquee.length, requestInstance]);

    return (
        <div className="marquee-container">
            {/* Marquee for images */}
            <Marquee speed={50} pauseOnHover>
                {loading ? (
                    Array(10).fill().map((_, index) => (
                        <div key={index} className="marquee-item">
                            <Skeleton height={50} width={100} />
                        </div>
                    ))
                ) : (
                    coverPhotosMarquee.map((item, index) => (
                        <div key={index} className="marquee-item">
                            <img
                                src={item.cover_photo}
                                alt={`Brand ${index + 1}`}
                                className="marquee-image"
                            />
                        </div>
                    ))
                )}
            </Marquee>

            {/* Marquee for names moving in the opposite direction */}
            <Marquee speed={50} pauseOnHover direction="right" className="name-marquee">
                {loading ? (
                    Array(10).fill().map((_, index) => (
                        <div key={index} className="marquee-item">
                            <Skeleton height={20} width={100} />
                        </div>
                    ))
                ) : (
                    coverPhotosMarquee.map((item, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-name">{item.name}</span>
                        </div>
                    ))
                )}
            </Marquee>
        </div>
    );
};

export default MarqueeComponent;
