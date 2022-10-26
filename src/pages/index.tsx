import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import Features from "@/components/Sections/Features";
import { Hero } from "@/components/Sections/Hero";
import { NextPage } from "next";

const HomePage: NextPage = () => (
  <>
    <Meta title="Home" />

    <Layout>
      <div>
        <Hero />
        <Features />
      </div>
    </Layout>
  </>
);

export default HomePage;
