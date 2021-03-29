import Toolbar from "@material-ui/core/Toolbar";

import React, { Fragment, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

import Hero from "../components/home/hero";
import ListSurah from "../components/home/listSurah/";
const title = "Home | MTs TechnoNatura";
const description =
  "Website resmi Remaja Madrasah Tsanawiyah TechnoNatura Depok. Website buatan para programmer MTs.";
import {
  fetchChapters,
  chapters,
  surahInfoType,
  surahListDialog
} from "@/ts/interfaces";
import useSWR from "swr";
import axios from "axios";

// Fetcher for the SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const chapters = [];

  // Fetch chapter list
  const dataFetchChapters: fetchChapters = useSWR<chapters, any>(
    "https://api.quran.com/api/v4/chapters?language=en",
    fetcher
  );

  console.log(dataFetchChapters);
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <NextSeo
        title="QuranKu Website - Read Quran and Meditate with Quran online."
        description="QuranKu Website is a place where you can read quran online and meditate with it!"
        canonical={process.env.PUBLIC_URL}
        openGraph={{
          url: process.env.PUBLIC_URL,
          title: "QuranKu Website Read Quran For Free",
          description:
            "QuranKu Website - Read Quran and Meditate with Quran online"
        }}
      />
      <Toolbar />
      <Hero />
      <ListSurah {...dataFetchChapters} />
    </Fragment>
  );
}
