import React from 'react';
import { useRouter } from 'next/router';

import type { RambleHeadProps } from './index';

import Head from 'next/head';

const RambleHead = (props: RambleHeadProps) => {
    const { pathname } = useRouter();

    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <meta name="og:title" property="og:title" content={props.title} />
            <meta name="og:description" property="og:description" content={props.description} />
            <meta property="og:site_name" content="Ramble" />
            <meta property="og:url" content={`${process.env.RAMBLE_URL}${pathname}`} />  
        </Head>
    );
}

export default React.memo(RambleHead);