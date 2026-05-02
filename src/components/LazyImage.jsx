// For Lazy loading image 
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function LazyImage({src, alt, className, style}) {

    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [inView, setInView] = useState(false);

    // Using IntersectionObserver to detect when image is in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
            );
        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <img ref={imgRef} src={inView ? src : undefined} alt={alt} className={`lazy ${loaded ? 'loaded' : ''} ${className || ''}`} style={style} onLoad={() => setLoaded(true)}/>
    );
};

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default LazyImage;
