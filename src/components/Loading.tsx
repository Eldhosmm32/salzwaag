'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';


const Loading = () => {

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <h2 className="font-(family-name:--font-rubik) text-3xl font-normal text-white ">Welcome to</h2>
            <Image
                src={'/wzs-logo-w.png'}
                alt="Logo"
                width={400}
                height={400}
            />
            <h2 className="font-(family-name:--font-rubik) text-xl font-normal text-white text-center ">Explore our unique dining experiences across the city</h2>
        </div>
    );
};

export default Loading;