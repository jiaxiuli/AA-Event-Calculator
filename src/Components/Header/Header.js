/*
 * @Author: Leo
 * @Date: 2023-07-04 12:10:33
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 12:15:15
 * @FilePath: \event-calculator\src\Components\Header\Header.js
 * @Description:
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import './Header.scss';

const Header = () => {
    return (
        <Typography variant="h5" className="header-main">
            下等马活动计算器
        </Typography>
    );
};

export default Header;