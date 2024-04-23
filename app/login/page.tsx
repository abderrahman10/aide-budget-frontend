import React from 'react'
import logo from "@/assets/logo.png";
import google from "@/assets/google-icon.png";
import Link from 'next/link';

import styles from './page.module.css'
import Image from 'next/image';
function page() {
  return (
    <>
    <div className={styles.body}>
      <div className={styles.loginContainer}>
        <div className={styles.row}>
          <div className={styles.col7}>
            <div className={styles.imageContainer}>
              <Image
                src={logo}
                alt="Login Image"
              
                className={styles.loginImage}
              />
            </div>
          </div>
          <div className={styles.col5}>
            <h1  className={styles.h1}>Aide Budget.</h1>
            <div className={styles.buttonRow}>
             <Link href="http://localhost:8081/oauth2/authorization/google">
              <button className={styles.loginButton } >
          
                <Image
                  src={google}
                  width={25}
                  height={25}
                  alt="Google Icon"
                  className={styles.socialIcon}
                />
                <span>Sign up with Google</span>
              </button>
             </Link>
            </div> 
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default page