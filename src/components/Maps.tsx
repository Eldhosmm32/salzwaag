
'use client';

import { useEffect, useState } from 'react';

function getMapConfig(id: number, width: number) {
    switch (id) {
        case 0:
            return (
                <>
                    <iframe width={width ? width : "400"} height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Wirtschaft%20zur%20Salzwaag%20Allenbergstrasse%2047,%208712%20St%C3%A4fa%20Allenbergstrasse%20+(Wirtschaft%20zur%20Salzwaag)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=3daa432b640b69b3ae04c4b0a528da51c2645af3'></script>
                </>
            );
        case 1:
            return (
                <>
                    <iframe width={width ? width : "400"} height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Strandbad%20Uetikon,%20Seestrasse%20144,%208707%20Uetikon%20am%20See%20Uetikon%20am%20See+(Strandbad%20Uetikon)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=72c9bfb1e052c13abe687e2386b9b5f372b95d11'></script>
                </>
            );
        case 2:
            return (
                <>
                    <iframe width={width ? width : "400"} height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Schiffsteg%20Bistro,%20Seestrasse%20St%C3%A4fa+(Bistro%20Schiffsteg)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=07d88cf37b9384bd31fb0525f3f1451107115173'></script>
                </>
            );
        default:
            return (
                <>
                    <iframe width={width ? width : "400"} height="400" scrolling="no" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Wirtschaft%20zur%20Salzwaag%20Allenbergstrasse%2047,%208712%20St%C3%A4fa%20Allenbergstrasse%20+(Wirtschaft%20zur%20Salzwaag)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/auslandsversicherung-rechner/'>Ausland Kranken/Unfall-Versicherung</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=3daa432b640b69b3ae04c4b0a528da51c2645af3'></script>
                </>
            );
    }
}

function getMapMob(id: number) {
    switch (id) {
        case 0:
            return '043 477 05 04';
        case 1:
            return '044 920 22 33';

        case 2:
            return '043 818 05 00';

        default:
            return '043 477 05 04';
    }
}

const Maps = ({ Id, Width }: { Id: number, Width?: any }) => {
    const [isMounted, setIsMounted] = useState(false);
    const config = getMapConfig(Id, Width);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                config
            )}
            <div className="absolute bottom-0 left-0 w-full h-auto">
                <div className="bg-black/15 carousel-text-section px-4 py-2">
                    <h3 className="text-white text-lg font-bold">Call: {getMapMob(Id)}</h3>
                </div>
            </div>
        </>
    );
};

export default Maps;