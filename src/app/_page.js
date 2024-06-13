import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import connectDB from "@/db/connectDB";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  await connectDB(); // Connect to the database
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
