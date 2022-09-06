import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles(theme =>
  createStyles({
    footer: {
      backgroundColor: "#0b1621",
      padding: "2rem 0 3rem",
      height: "16rem"
    },
  }),
);

function Footer(props) {
  const classes = useStyles();

  return (
    <div id="footer" className={clsx(classes.footer, "flex flex-col items-center")}>
      <a className="mb-8 flex items-center cursor-pointer" href="/">
        <img src="favicon.ico" alt="" width="50px"></img>
        <p className="text-2xl font-bold" style={{ color: "white" }}>ApeInsight</p>
      </a>
      <div className="flex mb-8 items-center">
        <TwitterIcon></TwitterIcon>
        <a className='text-c-7 sm:text-10' href="https://twitter.com">Follow us on Twitter</a>
        <p className="mx-2">-</p>
        <TelegramIcon></TelegramIcon>
        <a className='text-c-7 sm:text-10' href="https://telegram.com">Join our Telegram Group</a>
      </div>

      <div className="flex mb-8">
        <a className='text-c-7 sm:text-10' href="/home?type=top%20ranked">All Time Rankings</a>
        <p className="mx-2">-</p>
        <a className='text-c-7 sm:text-10' href="/home?type=new">New Listings</a>
        <p className="mx-2">-</p>
        <a className='text-c-7 sm:text-10' href="/submit">Submit Coin</a>
      </div>

      <div className="flex mb-8">
        <a className='text-c-7 sm:text-10' href="/term-and-condition">Terms & Conditions</a>
        <p className="mx-2">-</p>
        <a className='text-c-7 sm:text-10' href="/privacy">Privacy Policy</a>
        <p className="mx-2">-</p>
        <a className='text-c-7 sm:text-10' href="/contact">Contact Us</a>
      </div>

      <div className="flex items-center">
        <CopyrightIcon></CopyrightIcon>
        <p style={{ color: "white" }}> 2021 www.apeinsight.com</p>
      </div>
    </div>
  );
}

export default React.memo(Footer);
