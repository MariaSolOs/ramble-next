import React from 'react';
import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';

type Page<P = {}> = NextPage<P> & {
    layout: React.FC;
}

export type AppProps = NextAppProps & {
    Component: Page;
}