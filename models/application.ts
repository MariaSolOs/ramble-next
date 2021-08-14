import React from 'react';
import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';

// Extend Component definition to allow page layouts
type Page<P = {}> = NextPage<P> & {
    layout: React.FC;
}

export type AppProps = NextAppProps & {
    Component: Page;
}

export interface CompletableSlide {
    onSlideComplete: (canContinue: boolean) => void;
}