import React from "react";
import Style from "./Loader.module.css"
import loader from "../../../assets/loader.svg"

export default () => <img src={loader} className={Style.loader} alt="loader"/>
