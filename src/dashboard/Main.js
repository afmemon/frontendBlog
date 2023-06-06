import React from "react";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useEffect } from "react";
import BlogPost from "../sections/maincomponents/BlogPost";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Search from "../sections/maincomponents/Search";
import { enqueueSnackbar } from "notistack";
import Filters from "../sections/maincomponents/Filters";

export default function Main() {
  const [blogData, setBlogData] = useState([]);
  const [searchquery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("2023-06-03");
  const [category, setCategory] = useState("");
  const [sources, setSources] = useState("");

  useEffect(() => {
    getAllRecords();
  }, []);

  const getAllRecords = async () => {
    try {
      setBlogData([]);
      const result = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&from=${searchDate}&apiKey=0196b02b96f24b0b8eaf88a7b9d5b980`
      );

      setBlogData(result.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  const searchByKeyword = async () => {
    try {
      if (!searchquery.length)
        return enqueueSnackbar("Write something to search !");

      setBlogData([]);
      setSearchQuery("");
      const result = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchquery}&from=${searchDate}&apiKey=0196b02b96f24b0b8eaf88a7b9d5b980`
      );
      setBlogData(result.data.articles);
    } catch (e) {
      console.log(e);
    }
  };

  const applyFilters = async () => {
    try {
      setBlogData([]);
      let arr = [
        { from: searchDate },
        { category: category },
        { sources: sources },
      ];
      let query = "";

      for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        const key = Object.keys(v)[0];
        if (v[key] !== "") query += `${key}=${v[key]}` + "&";
      }

      const result = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=tesla&${query}apiKey=0196b02b96f24b0b8eaf88a7b9d5b980`
      );

      if (!result?.data?.articles.length) {
        return enqueueSnackbar("News not found", { variant: "error" });
      }

      console.log(result.data.articles);

      setBlogData(result.data.articles);
      setCategory("");
      setSources("");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Layout>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 15 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Search
                searchquery={searchquery}
                setSearchQuery={setSearchQuery}
                searchByKeyword={searchByKeyword}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Filters
                applyFilters={applyFilters}
                searchDate={searchDate}
                setSearchDate={setSearchDate}
                category={category}
                setCategory={setCategory}
                sources={sources}
                setSources={setSources}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              {!!blogData?.length ? (
                blogData.map((v, i) => <BlogPost item={v} key={i} />)
              ) : (
                <CircularIndeterminate />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

function CircularIndeterminate() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
}
